/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  // ADICIONADO: Regras explícitas para garantir a arquitetura em camadas.
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
  ],

  options: {
    // A única coisa que o `options` precisa é saber onde está o tsconfig e o que ignorar.
    doNotFollow: {
      path: "node_modules",
    },
    tsConfig: {
      fileName: "tsconfig.app.json",
    },
  },
};

/*



### O que foi feito:

1.  **Adição do Bloco `forbidden`**: Inseri a chave `forbidden` no nível principal do objeto de configuração. É aqui que o `dependency-cruiser` procura por regras de importação proibidas.
2.  **Criação de Regras por Camada**: Criei uma regra para cada camada da sua arquitetura (`shared`, `entities`, `features`, `widgets`, `pages`), proibindo-as de importar módulos de qualquer camada acima delas.
3.  **Clareza e Severidade**: Cada regra tem um `name` e um `comment` para explicar seu propósito e uma `severity` definida como `"error"`. Isso significa que, se uma dessas regras for violada, o `dependency-cruiser` irá falhar (o que é ideal para pipelines de CI/CD, por exemplo), forçando a correção da arquitetura.

Com este arquivo, seu projeto agora não apenas funciona corretamente, mas também possui um mecanismo automático para **manter a qualidade da arquitetura** a longo pra

*/
