module.exports = {
  // The test environment that will be used for testing
  testEnvironment: 'node',
  
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,
  
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  
  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/tests'],
  
  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  
  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/'],
  
  // A map from regular expressions to paths to transformers
  transform: {},
  
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  
  // Setup files that will be run before each test
  setupFiles: [],
  
  // The maximum amount of time (in milliseconds) that a test can run before Jest aborts it
  testTimeout: 10000,
};