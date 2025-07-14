import { z } from 'zod';

// Schema para comandos simples (tipo 1)
export const simpleCommandSchema = z.object({
  command: z.literal('clear').or(z.literal('help')), // Exemplo: /clear, /help
  type: z.literal('simpleCommand'),
});

// Schema para comandos com um único argumento de texto (tipo 2)
export const textArgumentCommandSchema = z.object({
  command: z.literal('whisper'), // Exemplo: /whisper PlayerName
  target: z.string().min(1, "O alvo da mensagem é obrigatório."),
  message: z.string().min(1, "A mensagem não pode ser vazia."),
  type: z.literal('textArgumentCommand'),
});

// União discriminada de todos os tipos de comandos
export const chatCommandSchema = z.discriminatedUnion('type', [
  simpleCommandSchema,
  textArgumentCommandSchema,
]);

export type SimpleCommand = z.infer<typeof simpleCommandSchema>;
export type TextArgumentCommand = z.infer<typeof textArgumentCommandSchema>;
export type ChatCommand = z.infer<typeof chatCommandSchema>;
