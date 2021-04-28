module.exports = {
  bail: 1,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['./src/app/**/*.js'],
  coverageDirectory: './coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text', 'lcov'],
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.js?(x)'],
  transform: { '.(js|jsx|ts|tsx)': '@sucrase/jest-plugin' },
};
