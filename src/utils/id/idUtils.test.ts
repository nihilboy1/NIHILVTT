import { generateUniqueId } from './idUtils';

describe('generateUniqueId', () => {
  test('deve gerar um ID único a cada chamada', () => {
    const id1 = generateUniqueId();
    const id2 = generateUniqueId();
    expect(id1).not.toBe(id2);
  });

  test('o ID gerado deve ser uma string', () => {
    const id = generateUniqueId();
    expect(typeof id).toBe('string');
  });

  test('o ID gerado deve ter um comprimento razoável', () => {
    const id = generateUniqueId();
    // O comprimento exato pode variar dependendo do Date.now() e do Math.random()
    // Mas deve ser maior que 0 e ter um tamanho mínimo esperado
    expect(id.length).toBeGreaterThan(10);
  });

  test('o ID deve conter caracteres alfanuméricos (base 36)', () => {
    const id = generateUniqueId();
    expect(id).toMatch(/^[a-z0-9]+$/);
  });

  test('deve ser altamente improvável que IDs gerados em rápida sucessão sejam iguais', () => {
    const ids = new Set<string>();
    const numGenerations = 1000; // Gerar um número razoável de IDs
    for (let i = 0; i < numGenerations; i++) {
      ids.add(generateUniqueId());
    }
    expect(ids.size).toBe(numGenerations); // Todos os IDs devem ser únicos
  });
});
