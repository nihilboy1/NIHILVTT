/**
 * Calcula o novo valor de HP com base na entrada do usuário, HP atual e HP máximo.
 *
 * @param inputValue A string de entrada do usuário (pode ser um número, ou um modificador como "+5" ou "-3").
 * @param currentHP O valor atual de HP.
 * @param maxHP O valor máximo de HP.
 * @returns O novo valor de HP calculado e validado (entre 0 e maxHP), ou null se a entrada for inválida.
 */
export const calculateNewHP = (
  inputValue: string,
  currentHP: number,
  maxHP: number
): number | null => {
  const trimmedInput = inputValue.trim();

  // Adicionar verificação explícita para string vazia ou apenas espaços
  if (trimmedInput === '') {
    return null;
  }

  let newCalculatedHP: number;

  if (trimmedInput.startsWith('+') || trimmedInput.startsWith('-')) {
    const isPositive = trimmedInput.startsWith('+');
    const valueStr = trimmedInput.substring(1);
    
    // Adicionar verificação para string vazia após o sinal
    if (valueStr === '') {
      return null; // Ex: "+", "-"
    }

    const value = Number(valueStr); // Use Number()

    if (!isNaN(value) && Number.isInteger(value) && value >= 0) { // Check for integer
      newCalculatedHP = isPositive ? currentHP + value : currentHP - value;
    } else {
      return null; // Entrada inválida (ex: "+abc", "+5.5") ou decimal
    }
  } else {
    const value = Number(trimmedInput); // Use Number()
    if (!isNaN(value) && Number.isInteger(value)) { // Check for integer
      newCalculatedHP = value;
    } else {
      return null; // Entrada inválida (ex: "abc") ou decimal
    }
  }

  // Garante que o HP não seja menor que 0 nem maior que maxHP
  return Math.max(0, Math.min(newCalculatedHP, maxHP));
};
