import {
  APIGatewayEventType,
  apiGatewayEventWith,
} from "./apiGatewayEventType";

export const patchWorkOrder: APIGatewayEventType = apiGatewayEventWith({
  body: JSON.stringify({
    resolution: "L1_ERROR_USER",
    status: "IN_PROGRESS",
  }),
  headers: {
    "Content-Type": "application/json",
  },
  httpMethod: "PATCH",
  pathParameters: {
    workOrderId: "00000955",
  },
  requestContext: {
    authorizer: {
      principalId: "0019E00001nMY1XQAW",
    },
  },
});
