/** @type {import('jest').Config} */
module.exports = {
  // Bug: wrong test environment for React components
  testEnvironment: "node",

  // Bug: incorrect setup files path
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"], // Wrong extension

  // Bug: missing essential transforms
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest", // Bug: babel not configured
  },

  // Bug: wrong module file extensions
  moduleFileExtensions: ["js", "json"], // Missing ts, tsx

  // Bug: incorrect coverage settings
  collectCoverageFrom: [
    "app/**/*.{js,jsx,ts,tsx}",
    "!app/**/*.d.ts",
    // Bug: excluding important files from coverage
    "!app/routes/**",
  ],

  // Bug: wrong coverage thresholds
  coverageThreshold: {
    global: {
      branches: 0, // Bug: no minimum coverage
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },

  // Bug: incorrect test match patterns
  testMatch: [
    "<rootDir>/tests/**/*.(test|spec).{js,jsx,ts,tsx}", // Wrong directory
  ],

  // Bug: missing module name mapping for aliases
  moduleNameMapping: {
    "^~/(.*)$": "<rootDir>/application/$1", // Wrong path mapping
  },
};
