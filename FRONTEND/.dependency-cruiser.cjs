/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "shared-cannot-depend-on-other-layers",
      comment:
        "A camada 'shared' é a base e não pode depender de nenhuma outra camada superior.",
      severity: "error",
      from: { path: "^src/shared" },
      to: {
        path: [
          "^src/entities",
          "^src/features",
          "^src/widgets",
          "^src/pages",
          "^src/app",
        ],
      },
    },
    {
      name: "entities-cannot-depend-on-higher-layers",
      comment:
        "Entidades devem ser autocontidas e não podem depender de features, widgets, pages ou app.",
      severity: "error",
      from: { path: "^src/entities" },
      to: {
        path: ["^src/features", "^src/widgets", "^src/pages", "^src/app"],
      },
    },
    {
      name: "features-cannot-depend-on-higher-layers",
      comment: "Features não podem depender de widgets, pages ou app.",
      severity: "error",
      from: { path: "^src/features" },
      to: {
        path: ["^src/widgets", "^src/pages", "^src/app"],
      },
    },
    {
      name: "widgets-cannot-depend-on-higher-layers",
      comment: "Widgets não podem depender de pages ou app.",
      severity: "error",
      from: { path: "^src/widgets" },
      to: {
        path: ["^src/pages", "^src/app"],
      },
    },
    {
      name: "pages-cannot-depend-on-app",
      comment: "Pages não podem depender da camada app.",
      severity: "error",
      from: { path: "^src/pages" },
      to: {
        path: ["^src/app"],
      },
    },
    {
      name: "no-circular",
      severity: "error",
      comment:
        "Dependências circulares são proibidas pois tornam o código frágil e imprevisível.",
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: "no-orphans",
      severity: "warn", // 'warn' é uma boa opção para não quebrar o build durante uma refatoração
      comment:
        "Módulos órfãos (não utilizados) devem ser removidos para manter a base de código limpa.",
      from: {
        orphan: true,
        pathNot: [
          "\\.d\\.ts$", // Arquivos de declaração de tipos
          "\\.stories\\.tsx$", // Arquivos do Storybook (se usar)
          "vite.config.ts", // Arquivos de configuração que não são importados
          "tailwind.config.ts",
          "jest.config.ts",
          ".dependency-cruiser.cjs",
          "eslint.config.js",
          "src/features/modalManager/model/baseModalConfig\\.ts$",
        ],
      },
      to: {},
    },
    {
      name: "not-to-dev-dep",
      severity: "error",
      comment:
        "Não importe pacotes de desenvolvimento (devDependencies) no código fonte da aplicação (src).",
      from: {
        path: "^src",
        // ADICIONE ESTA LINHA:
        pathNot: "\\.test\\.(ts|tsx|js|jsx)$",
      },
      to: {
        dependencyTypes: ["npm-dev"],
      },
    },
    {
      name: "no-deprecated",
      severity: "warn",
      comment: "Evite usar dependências marcadas como deprecadas.",
      from: {},
      to: {
        dependencyTypes: ["deprecated"],
      },
    },
    {
      name: "not-to-spec",
      severity: "error",
      comment: "O código fonte não deve importar módulos de teste.",
      from: {
        path: "^src",
        pathNot: "\\.test\\.(ts|tsx|js|jsx)$", // O próprio arquivo de teste pode importar outros helpers
      },
      to: {
        path: "\\.test\\.(ts|tsx|js|jsx)$", // Mas não pode importar um outro arquivo de teste
      },
    },
  ],

  options: {
    doNotFollow: {
      path: "node_modules",
    },

    tsConfig: {
      fileName: "tsconfig.app.json",
    },
    metrics: true,
  },
};
