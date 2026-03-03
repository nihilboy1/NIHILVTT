import { z } from 'zod';
import { PlayerCharacterStateSchema } from '@nihilvtt/datamodeling/runtime';

export const playerCharacterRuntimeSchema = PlayerCharacterStateSchema;

export type PlayerCharacterRuntime = z.infer<typeof playerCharacterRuntimeSchema>;
