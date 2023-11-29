// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
module.exports = {
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  testEnvironment: "node",
  transform: {
    ".(js|ts)": "ts-jest"
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx|json)$",
    "package.json"
  ],
};

