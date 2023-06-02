import { fromIni, fromProcess } from "@aws-sdk/credential-providers"; // ES6 import
import * as dotenv from "dotenv";

dotenv.config();

export const credentialProvider = () =>
  fromIni({
    profile: process.env.AWS_PROFILE,
  });
