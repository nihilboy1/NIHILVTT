import { DiceFormula, Roll, DiceRollDetails, RollCategory } from "@/shared/api/types";

const MAX_DICE_COUNT = 100;
const MAX_DICE_SIDES = 100;
const MAX_TOTAL_DICE_ROLLS = 500;

/**
 * Parses a dice formula string (e.g., "1d20+5", "2d6-1") into its components.
 * Returns an object with dice parts and a modifier.
 */
interface ParsedDiceFormula {
  diceParts: { count: number; sides: number; sign: 1 | -1 }[];
  modifier: number;
}

export function parseDiceFormula(formula: DiceFormula): ParsedDiceFormula {
  if (typeof formula === 'number') {
    return { diceParts: [], modifier: formula };
  }

  const normalizedFormula = formula.replace(/\s+/g, '').toLowerCase();
  if (!normalizedFormula) {
    throw new Error(`Invalid dice formula: ${formula}`);
  }

  const diceParts: { count: number; sides: number; sign: 1 | -1 }[] = [];
  let modifier = 0;
  let totalDiceRolls = 0;

  // Expressao aditiva: termos separados apenas por +/-, cada termo sendo NdM ou inteiro.
  const parts = normalizedFormula.match(/[+-]?[^+-]+/g);

  if (!parts) {
    throw new Error(`Invalid dice formula: ${formula}`);
  }
  if (parts.join('') !== normalizedFormula) {
    throw new Error(`Invalid dice formula: ${formula}`);
  }

  parts.forEach(part => {
    const sign: 1 | -1 = part.startsWith('-') ? -1 : 1;
    const unsignedPart = part.startsWith('+') || part.startsWith('-') ? part.slice(1) : part;

    if (!unsignedPart) {
      throw new Error(`Invalid dice formula: ${formula}`);
    }

    if (unsignedPart.includes('d')) {
      const dicePartPattern = /^\d+d\d+$/;
      if (!dicePartPattern.test(unsignedPart)) {
        throw new Error(`Invalid dice part in formula: ${part}`);
      }

      const [countStr, sidesStr] = unsignedPart.split('d');
      const count = parseInt(countStr, 10);
      const sides = parseInt(sidesStr, 10);
      if (
        isNaN(count) ||
        isNaN(sides) ||
        count < 1 ||
        count > MAX_DICE_COUNT ||
        sides < 1 ||
        sides > MAX_DICE_SIDES
      ) {
        throw new Error(`Invalid dice part in formula: ${part}`);
      }
      totalDiceRolls += count;
      if (totalDiceRolls > MAX_TOTAL_DICE_ROLLS) {
        throw new Error(
          `Dice formula exceeds the maximum total rolls (${MAX_TOTAL_DICE_ROLLS}): ${formula}`,
        );
      }
      diceParts.push({ count, sides, sign });
    } else {
      const modifierPattern = /^\d+$/;
      if (!modifierPattern.test(unsignedPart)) {
        throw new Error(`Invalid dice formula: ${formula}`);
      }
      modifier += sign * parseInt(unsignedPart, 10);
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
  let naturalRollResult: number | undefined;

  diceParts.forEach(({ count, sides, sign }) => {
    for (let i = 0; i < count; i++) {
      const result = rollSingleDie(sides);
      const signedResult = sign * result;
      rolls.push({ dice: `d${sides}`, result: signedResult });
      totalDiceResult += signedResult;

      // Captura o resultado natural do primeiro d20 rolado
      if (sides === 20 && naturalRollResult === undefined && sign > 0) {
        naturalRollResult = result;
      }
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
    naturalRollResult, // Inclui o resultado natural na saída
  };
}
