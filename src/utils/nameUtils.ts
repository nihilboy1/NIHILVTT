/**
 * Extrai o primeiro nome de uma string de nome completo.
 * Se não houver espaços, retorna o nome completo.
 * @param name - O nome completo do personagem.
 * @returns O primeiro nome do personagem.
 */
export const getFirstName = (name: string): string => {
  if (!name) {
    return "";
  }
  const частей = name.split(" ");
  return частей[0];
};
