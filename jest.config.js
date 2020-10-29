module.exports = {
  'testEnvironment': 'node',
  'preset': 'ts-jest',
  'testMatch': [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts',
  ],
  'testPathIgnorePatterns': ['/node_modules/', '/lib/'],
};
