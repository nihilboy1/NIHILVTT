import { parseCreatureSizeToGrid } from '@/shared/lib/geometry/creatureSize';

export const parseTokenSize = (sizeString?: string): [number, number] => {
  return parseCreatureSizeToGrid(sizeString);
};
