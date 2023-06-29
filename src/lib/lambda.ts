import {
  InvokeCommand,
  InvokeCommandInput,
  LambdaClient,
} from "@aws-sdk/client-lambda";
import { makeGetCredentials } from "./credentials";

export function createLambda() {
  return new LambdaClient({
    region: "eu-west-1",
    credentials: makeGetCredentials(),
  });
}

export function createInvokeCommandInput<T>(
  functionName: string,
  input: T
): InvokeCommandInput {
  return {
    FunctionName: functionName,
    InvocationType: "RequestResponse",
    Payload: Buffer.from(JSON.stringify(input, null, 2)),
  };
}

export async function invokeLambda(lambda: LambdaClient, input: InvokeCommandInput) {
    const command = new InvokeCommand(input);
    const response = await lambda.send(command);
    return response
}