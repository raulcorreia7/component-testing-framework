import {
  APIGatewayEventType,
  apiGatewayEventWith
} from "./ApiGatewayEventType";
export const getWorkOrder: APIGatewayEventType = apiGatewayEventWith({
  httpMethod: "POST",
  pathParameters: {
    workOrderId: "00000955"
  },
  requestContext: {
    authorizer: {
      principalId: "0019E00001nMY1XQAW"
    }
  }
});
