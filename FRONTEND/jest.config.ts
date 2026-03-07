export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  clearMocks: true,
  restoreMocks: true,
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^.+\\.svg\\?react$': '<rootDir>/__mocks__/svgrMock.tsx',
    '\\.(gif|ttf|eot|svg|png|jpe?g|webp|avif|wav|mp3)$': '<rootDir>/__mocks__/fileMock.js',
    '^@nihilvtt/datamodeling/data$': '<rootDir>/../DATAMODELING/src/data/index.ts',
    '^@nihilvtt/datamodeling/domain$': '<rootDir>/../DATAMODELING/src/domain/index.ts',
    '^@nihilvtt/datamodeling/shared$': '<rootDir>/../DATAMODELING/src/shared/index.ts',
    '^@nihilvtt/datamodeling/primitives$':
      '<rootDir>/../DATAMODELING/src/shared/primitives/index.ts',
    '^@nihilvtt/datamodeling/runtime$': '<rootDir>/../DATAMODELING/src/runtime/index.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.app.json',
      },
    ],
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverage: false,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: '.artifacts/coverage',
  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/src/**/*.test.tsx'],
};
