import convict from "convict";
import dotenvflow from "dotenv-flow";

dotenvflow.config();

const schema = {
  aws: {
    profile: {
      doc: "Which AWS Profile to run the application in",
      format: String,
      default: "srs-default",
      env: "AWS_PROFILE",
    },
    region: {
      doc: "Which AWS Region to run the application in",
      format: String,
      default: "eu-west-1",
      env: "AWS_REGION",
    },
  },
};

const parsedSchema = convict(schema);
export const config = parsedSchema.getProperties();
