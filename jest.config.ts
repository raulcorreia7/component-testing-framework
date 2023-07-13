import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "js"],
  preset: "ts-jest",
  testEnvironment: "node",
  bail: 1,
  verbose: true,
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  roots: ["test/"],
  testTimeout: 15000
};

export default config;
