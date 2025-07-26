import { z } from 'zod';

export const simpleNameSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório.").max(35, "O nome não pode ter mais de 35 caracteres."),
});

export type SimpleNameSchema = z.infer<typeof simpleNameSchema>;
