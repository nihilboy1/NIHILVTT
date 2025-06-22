export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Removido ou comentado
  moduleNameMapper: {
    // Handle CSS imports (if you have them)
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Handle image imports
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
    // Alias para caminhos de importação (ajuste conforme sua configuração no tsconfig.json)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.app.json', // Aponta para o tsconfig.app.json para garantir que o JSX seja reconhecido
    }],
  },
  // Ignora a pasta node_modules e a pasta de build (dist, build, etc.)
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coverageDirectory: 'coverage',
  // Se você quiser que os testes falhem se a cobertura não atingir um certo percentual
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10,
  //   },
  // },
};
