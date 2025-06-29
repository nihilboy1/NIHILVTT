export function calculateProficiencyBonus(level: number): number {
  if (level >= 1 && level <= 4) {
    return 2;
  } else if (level >= 5 && level <= 8) {
    return 3;
  } else if (level >= 9 && level <= 12) {
    return 4;
  } else if (level >= 13 && level <= 16) {
    return 5;
  } else if (level >= 17 && level <= 20) {
    return 6;
  }
  return 0; // Retorna 0 para níveis fora do intervalo esperado
}
