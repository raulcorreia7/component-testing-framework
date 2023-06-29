import { fromIni } from "@aws-sdk/credential-providers"; // ES6 import
import { AwsCredentialIdentity } from "@aws-sdk/types";
import * as denvflow from "dotenv-flow";
import * as readline from "readline";

denvflow.config();

console.log(process.env.AWS_PROFILE);

// // Helper function for node-js
// function prompt(query: string): Promise<string> {
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });

//   return new Promise((resolve) =>
//     rl.question(query, (ans) => {
//       rl.close();
//       resolve(ans);
//     })
//   );
// }

// function getCredentials(): Promise<AwsCredentialIdentity> {
//   // This assumes that you've set-up your ~/.aws/config and credentials!
//   const provider = fromIni({
//     mfaCodeProvider: async (serial) =>
//       await prompt(`Type the mfa token for the following account: ${serial}\n`),
//   });
//   return provider();
// }

// const mfaCredentials = await getCredentials();

// export const credentials = mfaCredentials;
