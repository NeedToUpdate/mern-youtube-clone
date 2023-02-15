const { pathsToModuleNameMapper } = require("ts-jest");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: pathsToModuleNameMapper({ "@src/*": ["src/*"] }, { prefix: "<rootDir>" }),
};
