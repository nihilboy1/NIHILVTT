import { z } from 'zod';
import { EffectSchema } from './effect.schema';

const FighterLevelSchema = z.object({
  level: z.number().int().min(1).max(20),
  features: z.array(EffectSchema),
  secondWind: z.number().int(),
});

const FighterProgressionSchema = z.array(FighterLevelSchema).length(20);


const FighterSchema = z.object({
  class: z.literal('fighter'),
  progression: FighterProgressionSchema,
});

export const ClassProgressionSchema = z.discriminatedUnion('class', [
  FighterSchema,
]);

export type ClassProgressionType = z.infer<typeof ClassProgressionSchema>;