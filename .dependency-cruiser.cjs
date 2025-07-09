/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  // Deixaremos as regras de fora por enquanto para garantir que a análise rode.
  // forbidden: [],
  
  options: {
    // A única coisa que o `options` precisa é saber onde está o tsconfig e o que ignorar.
    doNotFollow: {
      path: 'node_modules',
    },
    tsConfig: {
      fileName: 'tsconfig.app.json',
    },
  },
};