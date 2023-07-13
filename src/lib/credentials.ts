import inquirer from "inquirer";
import { fromEnv, fromIni } from "@aws-sdk/credential-providers";
import type { AwsCredentialIdentity, Provider } from "@aws-sdk/types";
import { isCi } from "./utils";

let credentials: Promise<AwsCredentialIdentity> | undefined;

enum CredentialProviderType {
  MFA,
  Env
}

export function makeGetCredentials():
  | Provider<AwsCredentialIdentity>
  | undefined {
  if (isCi) return undefined;

  return () => {
    if (credentials) return credentials;

    const requestCredentials = getCredentialsProvider(
      CredentialProviderType.Env
    );

    console.log("Requesting AWS credentials");

    credentials = requestCredentials();

    return credentials;
  };
}

function getCredentialsProvider(credentialType: CredentialProviderType) {
  switch (credentialType) {
    case CredentialProviderType.Env: {
      return fromEnv();
    }
    case CredentialProviderType.MFA: {
      return fromIni({
        profile: process.env.AWS_PROFILE,
        mfaCodeProvider: getMfaToken
      });
    }
  }
}

async function getMfaToken(serial: string) {
  const result = await inquirer.prompt({
    name: "token",
    type: "input",
    default: "",
    message: `MFA token for ${serial}:`
  });

  if (typeof result.token !== "string")
    throw new Error("Could not get MFA token");

  return result.token;
}
