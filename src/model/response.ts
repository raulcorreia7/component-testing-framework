import { z } from "zod";
import { toUtf8 } from "@aws-sdk/util-utf8";

export const BaseResponseSchema = z.object({
  statusCode: z.number(),
  headers: z.record(z.string()).optional(),
});

export const fromU8ToJson = z
  .instanceof(Uint8Array)
  .transform((x) => JSON.parse(toUtf8(x)));
export const fromStringToJson = z
  .string()
  .transform((x) => (x.length > 0 ? JSON.parse(x) : ""));

export const GetWorkOrderResponseBaseSchema = z.object({
  id: z.string(),
  type: z.string(),
  subtype: z.string(),
  subject: z.string(),
  priority: z.string(),
  errorCode: z.string(),
  status: z.string(),
  resolution: z.string(),
  description: z.string(),
  chargePoint: z.object({
    serialNumber: z.string(),
    effectivePorts: z.number(),
    rawPorts: z.number(),
    hardwareManufacturer: z.string(),
    hardwareModel: z.string(),
  }),
  location: z.object({ id: z.string(), name: z.string() }),
});

export const PatchWorkOrderResponseBaseSchema = BaseResponseSchema.extend({
  body: z.string(),
});

export const GetWorkOrderResponse = fromU8ToJson.pipe(
  BaseResponseSchema.extend({
    body: fromStringToJson.pipe(GetWorkOrderResponseBaseSchema),
  })
);
export const PatchWorkOrderResponse = fromU8ToJson.pipe(
  PatchWorkOrderResponseBaseSchema
);
