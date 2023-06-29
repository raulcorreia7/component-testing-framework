import type {Config} from "jest";
import {defaults} from 'jest-config';
import { makeGetCredentials } from "./src/lib/credentials";

const config: Config = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "js"],
    "preset" : "ts-jest",
    "testEnvironment" : "node",
    "bail": 1,
    "verbose": true,
    // globalSetup: "./src/config/global-setup-hook.js",
    "transform" : {
        "^.+\\.ts?$": "ts-jest"
    },
    "roots" : [
        "test/"
    ],
    "testTimeout": 10000
}

export default config;