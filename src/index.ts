import { writeFileSync } from "node:fs";

import { getWorkOrder } from "./getWorkOrder";
import { patchWorkOrder } from "./patchWorkOrder";

const formattedJson = (obj:unknown) => JSON.stringify(obj, null, 2);
try {
  writeFileSync("getWorkOrderHandler.json", formattedJson(getWorkOrder));
  writeFileSync(
    "patchWorkOrderHandler.json",
    formattedJson(patchWorkOrder)
  );
} catch (error) {
  console.error(error);
}
