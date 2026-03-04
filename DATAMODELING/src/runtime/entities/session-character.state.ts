import { z } from "zod";
import { MonsterCharacterStateSchema } from "./monster-character.state.js";
import { PlayerCharacterStateSchema } from "./player-character.state.js";

export const SessionCharacterStateSchema = z.discriminatedUnion("type", [
  PlayerCharacterStateSchema,
  MonsterCharacterStateSchema,
]);

export type SessionCharacterStateType = z.infer<typeof SessionCharacterStateSchema>;
