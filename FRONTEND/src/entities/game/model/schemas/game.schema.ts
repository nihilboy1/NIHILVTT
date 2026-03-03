import { z } from 'zod';

export const FIXED_GAME_MAX_PLAYERS = 6;
export const FIXED_GAME_SYSTEM_LABEL = 'D&D 2024';

export const gameOwnerSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
});

export const gamePlayerSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  colorHex: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  isOwner: z.boolean(),
});

export const gameSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  joinCode: z.string().min(4).max(12),
  coverImageUrl: z.string().nullable().optional(),
  maxPlayers: z.number().int().min(2).max(20),
  currentPlayers: z.number().int().min(0),
  status: z.string(),
  createdAt: z.string(),
  owner: gameOwnerSchema,
  players: z.array(gamePlayerSchema).default([]),
});

export const createGameSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Nome do jogo deve ter pelo menos 3 caracteres.')
    .max(120, 'Nome do jogo deve ter no máximo 120 caracteres.'),
  description: z
    .string()
    .trim()
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres.')
    .optional()
    .or(z.literal('')),
});

export const gameJoinRequestStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED']);

export const gameJoinRequestSchema = z.object({
  id: z.number().int().positive(),
  status: gameJoinRequestStatusSchema,
  requestedAt: z.string(),
  reviewedAt: z.string().nullable().optional(),
  reviewedByUserId: z.number().int().positive().nullable().optional(),
  game: gameSchema,
  requester: gameOwnerSchema,
});

export type Game = z.infer<typeof gameSchema>;
export type GamePlayer = z.infer<typeof gamePlayerSchema>;
export type CreateGameInput = z.infer<typeof createGameSchema>;
export type GameJoinRequest = z.infer<typeof gameJoinRequestSchema>;
export type GameJoinRequestStatus = z.infer<typeof gameJoinRequestStatusSchema>;
