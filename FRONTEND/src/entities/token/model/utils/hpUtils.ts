
export const calculateNewHP = (
  inputValue: string,
  currentHP: number,
  maxHP: number,
): number | null => {
  const trimmedInput = inputValue.trim();

  if (trimmedInput === '') {
    return null;
  }

  let newCalculatedHP: number;

  if (trimmedInput.startsWith('+') || trimmedInput.startsWith('-')) {
    const isPositive = trimmedInput.startsWith('+');
    const valueStr = trimmedInput.substring(1);

    if (valueStr === '') {
      return null;
    }

    const value = Number(valueStr);

    if (!isNaN(value) && Number.isInteger(value) && value >= 0) {
      newCalculatedHP = isPositive ? currentHP + value : currentHP - value;
    } else {
      return null;
    }
  } else {
    const value = Number(trimmedInput);
    if (!isNaN(value) && Number.isInteger(value)) {
      newCalculatedHP = value;
    } else {
      return null;
    }
  }

  return Math.max(0, Math.min(newCalculatedHP, maxHP));
};
