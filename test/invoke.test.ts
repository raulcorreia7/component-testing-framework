import { StatusCodes } from "http-status-codes";
import {
  createInvokeCommandInput,
  createLambdaClient,
  invokeLambda,
} from "../src/lib/lambda";

import { getWorkOrder, patchWorkOrder } from "../src/events"
import { GetWorkOrderResponse, PatchWorkOrderResponse } from "../src/model";
describe("Work Orders API", () => {
  it("getWorkOrderhandler", async () => {
    const client = createLambdaClient();
    const input = createInvokeCommandInput(
      "tnm-test-work-orders-api-getWorkOrderHandler",
      getWorkOrder
    );
    const { StatusCode, Payload } = await invokeLambda(client, input);
    expect(StatusCode).toBe(StatusCodes.OK);
    expect(Payload).not.toBeNull();

    const request = GetWorkOrderResponse.parse(Payload);
    expect(request.statusCode).toBe(StatusCodes.OK);
    expect(request.body.id).toEqual(getWorkOrder.pathParameters.workOrderId);
  });

  it("patchWorkOrderHandler", async () => {
    const client = createLambdaClient();
    const input = createInvokeCommandInput(
      "tnm-test-work-orders-api-patchWorkOrderHandler",
      patchWorkOrder
    );
    const { StatusCode, Payload } = await invokeLambda(client, input);
    expect(StatusCode).toBe(StatusCodes.OK);
    expect(Payload).not.toBeNull();

    const request = PatchWorkOrderResponse.parse(Payload);
    expect(request.statusCode).toBe(StatusCodes.NO_CONTENT); // 204
    expect(request.body).toBe("");
  }, 20_000);
});
