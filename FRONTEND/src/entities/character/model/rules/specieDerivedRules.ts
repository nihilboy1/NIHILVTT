import { PHB2024SPECIES } from '@nihilvtt/datamodeling/data';

export function getBaseWalkSpeedFromSpecieId(
  specieId: string,
  fallback = 0,
): number {
  const specie = PHB2024SPECIES.find((entry) => entry.id === specieId);
  return specie?.speed.walk ?? fallback;
}
