import {
  LambdaClient,
  InvokeCommandInput,
  InvokeCommand,
} from "@aws-sdk/client-lambda";
import { getWorkOrder } from "../src/getWorkOrder";

import { PatchWorkOrderResponse, patchWorkOrder } from "../src/patchWorkOrder";
import { credentialProvider } from "../src/credentials";
describe("hello", () => {
  it("getWorkOrderhandler", async () => {
    const client = new LambdaClient({
      region: "eu-west-1",
      credentialDefaultProvider: credentialProvider,
    });

    const input: InvokeCommandInput = {
      FunctionName: "tnm-test-work-orders-api-getWorkOrderHandler",
      InvocationType: "RequestResponse",
      Payload: Buffer.from(JSON.stringify(getWorkOrder, null, 2)),
    };

    const command = new InvokeCommand(input);
    const response = await client.send(command);

    expect(response.StatusCode).toBe(200);
  });

  it("patchWorkOrderHandler", async () => {
    const client = new LambdaClient({
      region: "eu-west-1",
      credentialDefaultProvider: credentialProvider,
    });

    const input: InvokeCommandInput = {
      FunctionName: "tnm-test-work-orders-api-patchWorkOrderHandler",
      InvocationType: "RequestResponse",
      Payload: Buffer.from(JSON.stringify(patchWorkOrder, null, 2)),
    };

    const command = new InvokeCommand(input);
    const response = await client.send(command);
    //@ts-ignore
    const buff = Buffer.from(response.Payload).toString();
    expect(response.StatusCode).toBe(200); //assert we called
    const request: PatchWorkOrderResponse = JSON.parse(buff);

    expect(request.statusCode).toBe(204);
    expect(request.body).toBe("");
  });
});
