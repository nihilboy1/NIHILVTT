// validate.mjs
import { register } from 'ts-node';
register({
  transpileOnly: false,
  esm: true,
});

import('./src/tooling/validate.ts').catch((err) => {
  console.error('Erro durante execução do validate.ts:', err);
  process.exit(1);
});