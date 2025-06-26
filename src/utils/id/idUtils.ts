import { v4 as uuidv4 } from 'uuid';

/**
 * Gera um ID único usando a biblioteca UUID v4.
 * @returns {string} Um ID único.
 */
export const generateUniqueId = (): string => {
  return uuidv4();
};
