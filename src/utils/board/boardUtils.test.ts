import { parseTokenSize, calculateInitialViewBox, calculateDistanceInMeters } from './boardUtils';
import { type PageSettings, type GridSettings, type Point } from '../../types/index';

describe('parseTokenSize', () => {
  test('deve retornar as dimensões corretas para uma string de tamanho válida', () => {
    expect(parseTokenSize('1x1')).toEqual([1, 1]);
    expect(parseTokenSize('2x3')).toEqual([2, 3]);
    expect(parseTokenSize('10x5')).toEqual([10, 5]);
  });

  test('deve retornar [1, 1] para uma string de tamanho inválida ou vazia', () => {
    expect(parseTokenSize('')).toEqual([1, 1]);
    expect(parseTokenSize(undefined)).toEqual([1, 1]);
    expect(parseTokenSize('1')).toEqual([1, 1]);
    expect(parseTokenSize('1x')).toEqual([1, 1]);
    expect(parseTokenSize('x1')).toEqual([1, 1]);
    expect(parseTokenSize('axb')).toEqual([1, 1]);
    expect(parseTokenSize('1x1x1')).toEqual([1, 1]);
    expect(parseTokenSize('0x1')).toEqual([1, 1]); // Dimensão zero
    expect(parseTokenSize('1x0')).toEqual([1, 1]); // Dimensão zero
    expect(parseTokenSize('-1x1')).toEqual([1, 1]); // Dimensão negativa
    expect(parseTokenSize('1x-1')).toEqual([1, 1]); // Dimensão negativa
  });

  test('deve lidar com espaços em branco na string de entrada', () => {
    expect(parseTokenSize(' 1x1 ')).toEqual([1, 1]);
    expect(parseTokenSize('2 x 3')).toEqual([1, 1]); // Espaços entre o número e o 'x' tornam inválido
  });
});

describe('calculateInitialViewBox', () => {
  const mockPageSettings: PageSettings = {
    widthInUnits: 10,
    heightInUnits: 10,
    backgroundColor: '#FFFFFF', // Corrigido para backgroundColor
  };

  const mockGridSettings: GridSettings = {
    visualCellSize: 50,
    lineColor: '#000000', // Corrigido para lineColor
    metersPerSquare: 1, // Corrigido para metersPerSquare
  };

  test('deve calcular o viewBox inicial corretamente para zoom 1', () => {
    const viewportPixelWidth = 800;
    const viewportPixelHeight = 600;
    const initialZoom = 1;

    const result = calculateInitialViewBox(
      mockPageSettings,
      mockGridSettings,
      viewportPixelWidth,
      viewportPixelHeight,
      initialZoom
    );

    const expectedPageActualWidth = 10 * 50; // 500
    const expectedPageActualHeight = 10 * 50; // 500
    const expectedViewBoxWidth = 800 / 1; // 800
    const expectedViewBoxHeight = 600 / 1; // 600
    const expectedX = (expectedPageActualWidth - expectedViewBoxWidth) / 2; // (500 - 800) / 2 = -150
    const expectedY = (expectedPageActualHeight - expectedViewBoxHeight) / 2; // (500 - 600) / 2 = -50

    expect(result).toEqual({
      x: expectedX,
      y: expectedY,
      width: expectedViewBoxWidth,
      height: expectedViewBoxHeight,
    });
  });

  test('deve calcular o viewBox inicial corretamente para zoom 0.5', () => {
    const viewportPixelWidth = 800;
    const viewportPixelHeight = 600;
    const initialZoom = 0.5;

    const result = calculateInitialViewBox(
      mockPageSettings,
      mockGridSettings,
      viewportPixelWidth,
      viewportPixelHeight,
      initialZoom
    );

    const expectedPageActualWidth = 10 * 50; // 500
    const expectedPageActualHeight = 10 * 50; // 500
    const expectedViewBoxWidth = 800 / 0.5; // 1600
    const expectedViewBoxHeight = 600 / 0.5; // 1200
    const expectedX = (expectedPageActualWidth - expectedViewBoxWidth) / 2; // (500 - 1600) / 2 = -550
    const expectedY = (expectedPageActualHeight - expectedViewBoxHeight) / 2; // (500 - 1200) / 2 = -350

    expect(result).toEqual({
      x: expectedX,
      y: expectedY,
      width: expectedViewBoxWidth,
      height: expectedViewBoxHeight,
    });
  });

  test('deve calcular o viewBox inicial corretamente para zoom 2', () => {
    const viewportPixelWidth = 800;
    const viewportPixelHeight = 600;
    const initialZoom = 2;

    const result = calculateInitialViewBox(
      mockPageSettings,
      mockGridSettings,
      viewportPixelWidth,
      viewportPixelHeight,
      initialZoom
    );

    const expectedPageActualWidth = 10 * 50; // 500
    const expectedPageActualHeight = 10 * 50; // 500
    const expectedViewBoxWidth = 800 / 2; // 400
    const expectedViewBoxHeight = 600 / 2; // 300
    const expectedX = (expectedPageActualWidth - expectedViewBoxWidth) / 2; // (500 - 400) / 2 = 50
    const expectedY = (expectedPageActualHeight - expectedViewBoxHeight) / 2; // (500 - 300) / 2 = 100

    expect(result).toEqual({
      x: expectedX,
      y: expectedY,
      width: expectedViewBoxWidth,
      height: expectedViewBoxHeight,
    });
  });
});

describe('calculateDistanceInMeters', () => {
  const cellSize = 50; // pixels por célula
  const metersPerCell = 1.5; // metros por célula

  test('deve calcular a distância corretamente para pontos na mesma linha horizontal', () => {
    const p1: Point = { x: 0, y: 0 };
    const p2: Point = { x: 100, y: 0 }; // 2 células de distância
    expect(calculateDistanceInMeters(p1, p2, cellSize, metersPerCell)).toBeCloseTo(3); // 2 * 1.5 = 3
  });

  test('deve calcular a distância corretamente para pontos na mesma linha vertical', () => {
    const p1: Point = { x: 0, y: 0 };
    const p2: Point = { x: 0, y: 150 }; // 3 células de distância
    expect(calculateDistanceInMeters(p1, p2, cellSize, metersPerCell)).toBeCloseTo(4.5); // 3 * 1.5 = 4.5
  });

  test('deve calcular a distância corretamente para pontos diagonais', () => {
    const p1: Point = { x: 0, y: 0 };
    const p2: Point = { x: 50, y: 50 }; // 1 célula diagonal
    const expectedDistance = Math.sqrt(1 * 1 + 1 * 1) * metersPerCell; // sqrt(2) * 1.5
    expect(calculateDistanceInMeters(p1, p2, cellSize, metersPerCell)).toBeCloseTo(expectedDistance);
  });

  test('deve retornar 0 para pontos idênticos', () => {
    const p1: Point = { x: 10, y: 20 };
    const p2: Point = { x: 10, y: 20 };
    expect(calculateDistanceInMeters(p1, p2, cellSize, metersPerCell)).toBe(0);
  });

  test('deve lidar com valores de cellSize e metersPerCell diferentes', () => {
    const customCellSize = 25;
    const customMetersPerCell = 2;
    const p1: Point = { x: 0, y: 0 };
    const p2: Point = { x: 50, y: 75 }; // 2 células x, 3 células y
    const worldDistance = Math.sqrt(50 * 50 + 75 * 75);
    const cellDistance = worldDistance / customCellSize;
    const expectedDistance = cellDistance * customMetersPerCell;
    expect(calculateDistanceInMeters(p1, p2, customCellSize, customMetersPerCell)).toBeCloseTo(expectedDistance);
  });
});
