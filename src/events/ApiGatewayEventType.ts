import { mergeDeepRight } from "ramda";
import event from "./event.json";
export interface APIGatewayEventType extends Record<string, unknown> {
  body: string;
  resource: string;
  path: string;
  httpMethod: string;
  isBase64Encoded: boolean;
  pathParameters: PathParameters;
  headers: { [key: string]: string };
  multiValueHeaders: { [key: string]: string[] };
  requestContext: RequestContext;
}

export interface PathParameters extends Record<string, unknown> {
  proxy: string;
}

export interface RequestContext extends Record<string, unknown> {
  accountId: string;
  resourceId: string;
  stage: string;
  requestId: string;
  requestTime: string;
  requestTimeEpoch: number;
  identity: { [key: string]: null | string };
  path: string;
  resourcePath: string;
  httpMethod: string;
  apiId: string;
  protocol: string;
}

export const DefaultAPIGatewayEventType: APIGatewayEventType = event;

export const apiGatewayEventWith = (obj: object): APIGatewayEventType =>
  mergeDeepRight(DefaultAPIGatewayEventType, obj);
