import { DiceFormula, Roll, DiceRollDetails, RollCategory } from "@/shared/api/types";

/**
 * Parses a dice formula string (e.g., "1d20+5", "2d6-1") into its components.
 * Returns an object with dice parts and a modifier.
 */
interface ParsedDiceFormula {
  diceParts: { count: number; sides: number }[];
  modifier: number;
}

export function parseDiceFormula(formula: DiceFormula): ParsedDiceFormula {
  if (typeof formula === 'number') {
    return { diceParts: [], modifier: formula };
  }

  const diceParts: { count: number; sides: number }[] = [];
  let modifier = 0;

  // Regex para encontrar partes de dados (ex: 1d20, 2d6) e modificadores (+5, -3)
  const parts = formula.match(/(\d+d\d+)|([+-]?\d+)/g);

  if (!parts) {
    throw new Error(`Invalid dice formula: ${formula}`);
  }

  parts.forEach(part => {
    if (part.includes('d')) {
      const [countStr, sidesStr] = part.split('d');
      const count = parseInt(countStr, 10);
      const sides = parseInt(sidesStr, 10);
      if (isNaN(count) || isNaN(sides) || count <= 0 || sides <= 0) {
        throw new Error(`Invalid dice part in formula: ${part}`);
      }
      diceParts.push({ count, sides });
    } else {
      // É um modificador
      modifier += parseInt(part, 10);
    }
  });

  return { diceParts, modifier };
}

/**
 * Rolls a single die.
 * @param sides The number of sides of the die (e.g., 20 for a d20).
 * @returns The result of the roll.
 */
function rollSingleDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

/**
 * Performs a dice roll based on a DiceFormula and returns the detailed results.
 * @param formula The dice formula to roll (e.g., "1d20+5", "2d6").
 * @param rollName The name of the roll (e.g., "Ataque de Espada", "Teste de Força").
 * @param category The category of the roll (e.g., "Attack", "Attribute").
 * @returns A DiceRollDetails object.
 */
export function performDiceRoll(
  formula: DiceFormula,
  rollName: string,
  category: RollCategory
): DiceRollDetails {
  const { diceParts, modifier } = parseDiceFormula(formula);
  const rolls: Roll[] = [];
  let totalDiceResult = 0;

  diceParts.forEach(({ count, sides }) => {
    for (let i = 0; i < count; i++) {
      const result = rollSingleDie(sides);
      rolls.push({ dice: `d${sides}`, result });
      totalDiceResult += result;
    }
  });

  const finalResult = totalDiceResult + modifier;

  const parts: (Roll | number)[] = [...rolls];
  if (modifier !== 0) {
    parts.push(modifier);
  }

  return {
    rollName,
    category,
    parts,
    finalResult,
  };
}
