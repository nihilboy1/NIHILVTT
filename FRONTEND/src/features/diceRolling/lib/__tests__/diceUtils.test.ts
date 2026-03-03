import { performDiceRoll } from '../diceUtils';

describe('performDiceRoll', () => {
  const mockMathRandom = (values: number[]) => {
    let i = 0;
    return () => values[i++ % values.length];
  };

  beforeEach(() => {
    jest.spyOn(Math, 'random').mockRestore();
  });

  test('deve rolar um dado simples (ex: "1d6")', () => {
    jest.spyOn(Math, 'random').mockImplementation(mockMathRandom([0.5]));
    const result = performDiceRoll('1d6', 'Teste', 'Attack');
    expect(result).toEqual({
      rollName: 'Teste',
      category: 'Attack',
      parts: [{ dice: 'd6', result: 4 }],
      finalResult: 4,
    });
  });

  test('deve rolar formula composta com soma de dados (ex: "2d6+1d4")', () => {
    jest.spyOn(Math, 'random').mockImplementation(mockMathRandom([0.0, 0.5, 0.75]));
    const result = performDiceRoll('2d6+1d4', 'Teste', 'Attack');
    expect(result).toEqual({
      rollName: 'Teste',
      category: 'Attack',
      parts: [
        { dice: 'd6', result: 1 },
        { dice: 'd6', result: 4 },
        { dice: 'd4', result: 4 },
      ],
      finalResult: 9,
    });
  });

  test('deve rolar formula composta com subtracao de dados e modificador', () => {
    jest.spyOn(Math, 'random').mockImplementation(mockMathRandom([0.5, 0.25, 0.75]));
    const result = performDiceRoll('2d6-1d4+3', 'Teste', 'Attack');
    expect(result).toEqual({
      rollName: 'Teste',
      category: 'Attack',
      parts: [
        { dice: 'd6', result: 4 },
        { dice: 'd6', result: 2 },
        { dice: 'd4', result: -4 },
        3,
      ],
      finalResult: 5,
    });
  });

  test('deve aceitar espacos e D maiusculo na formula', () => {
    jest.spyOn(Math, 'random').mockImplementation(mockMathRandom([0.5, 0.0]));
    const result = performDiceRoll(' 1D6 + 1d4 ', 'Teste', 'Attack');
    expect(result).toEqual({
      rollName: 'Teste',
      category: 'Attack',
      parts: [
        { dice: 'd6', result: 4 },
        { dice: 'd4', result: 1 },
      ],
      finalResult: 5,
    });
  });

  test('deve retornar erro para notacao invalida', () => {
    expect(() => performDiceRoll('abc', 'Teste', 'Attack')).toThrow('Invalid dice formula: abc');
    expect(() => performDiceRoll('1d6x', 'Teste', 'Attack')).toThrow('Invalid dice part in formula: 1d6x');
    expect(() => performDiceRoll('1d6+', 'Teste', 'Attack')).toThrow('Invalid dice formula: 1d6+');
    expect(() => performDiceRoll('2d6*2', 'Teste', 'Attack')).toThrow('Invalid dice part in formula: 2d6*2');
  });

  test('deve retornar erro para dados invalidos', () => {
    expect(() => performDiceRoll('0d6', 'Teste', 'Attack')).toThrow('Invalid dice part in formula: 0d6');
    expect(() => performDiceRoll('1d0', 'Teste', 'Attack')).toThrow('Invalid dice part in formula: 1d0');
    expect(() => performDiceRoll('101d6', 'Teste', 'Attack')).toThrow(
      'Invalid dice part in formula: 101d6',
    );
    expect(() => performDiceRoll('1d101', 'Teste', 'Attack')).toThrow(
      'Invalid dice part in formula: 1d101',
    );
  });

  test('deve limitar o total de rolagens na expressao', () => {
    expect(() => performDiceRoll('100d6+100d6+100d6+100d6+100d6+100d6', 'Teste', 'Attack')).toThrow(
      'Dice formula exceeds the maximum total rolls (500): 100d6+100d6+100d6+100d6+100d6+100d6',
    );
  });
});
