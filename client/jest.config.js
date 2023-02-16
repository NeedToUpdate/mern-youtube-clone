module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    //jest has issues parsing css files
    "\\.(css|less)$": "<rootDir>/jest/__mocks__/styleMock.js",
  },
};
