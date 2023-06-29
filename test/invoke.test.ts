import { getWorkOrder } from "../src/getWorkOrder";

import { PatchWorkOrderResponse, patchWorkOrder } from "../src/patchWorkOrder";
import {
  createInvokeCommandInput,
  createLambda,
  invokeLambda,
} from "../src/lib/lambda";
describe("hello", () => {
  it("getWorkOrderhandler", async () => {
    const client = createLambda();
    const input = createInvokeCommandInput(
      "tnm-test-work-orders-api-getWorkOrderHandler",
      getWorkOrder
    );
    const response = await invokeLambda(client, input);

    expect(response.StatusCode).toBe(200);
    expect(response.Payload).not.toBeNull();
    //@ts-ignore
    const buff = Buffer.from(response.Payload).toString();
    const request = JSON.parse(buff);
    
    expect(request.statusCode).toBe(200);
    expect(request.body.id).not.toBeNull();
  });

  it("patchWorkOrderHandler", async () => {
    const client = createLambda();
    const input = createInvokeCommandInput(
      "tnm-test-work-orders-api-patchWorkOrderHandler",
      patchWorkOrder
    );
    const response = await invokeLambda(client, input);
    //@ts-ignore
    const buff = Buffer.from(response.Payload).toString();
    expect(response.StatusCode).toBe(200); //assert we called
    const request: PatchWorkOrderResponse = JSON.parse(buff);

    expect(request.statusCode).toBe(204); // 204 or 200?
    expect(request.body).toBe("");
  });
});
