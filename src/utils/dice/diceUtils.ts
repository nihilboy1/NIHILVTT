import { type DiceRollDetails } from '../../types/index'; // Ajustar o caminho do tipo

export const rollDiceInternal = (notation: string): DiceRollDetails | { error: string } => {
  // Adicionado ^ e $ para garantir que a string inteira corresponda ao padrão
  const match = notation.toLowerCase().match(/^(\d{1,3})d(\d{1,3})(?:([+-])(\d+))?$/);
  if (!match) return { error: `Notação de dados inválida: ${notation}` };

  const numDice = parseInt(match[1]);
  const diceSides = parseInt(match[2]);
  const modifierOperator = match[3] as '+' | '-' | undefined;
  const modifierValue = match[4] ? parseInt(match[4]) : undefined;

  if (numDice <= 0 || diceSides <= 0 || numDice > 100 || diceSides > 100) {
    return { error: `Parâmetros de dados inválidos (1-100 permitidos para X e Y): ${notation}` };
  }

  let currentTotal = 0;
  const individualRolls: number[] = [];
  for (let i = 0; i < numDice; i++) {
    const roll = Math.floor(Math.random() * diceSides) + 1;
    individualRolls.push(roll);
    currentTotal += roll;
  }

  let finalResultValue = currentTotal;
  if (modifierOperator && modifierValue !== undefined) {
    if (modifierOperator === '+') finalResultValue += modifierValue;
    else if (modifierOperator === '-') finalResultValue -= modifierValue;
  }

  return {
    notation,
    rolls: individualRolls,
    modifierOperator,
    modifierValue,
    finalResult: finalResultValue,
  };
};
