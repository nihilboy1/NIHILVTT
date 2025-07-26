import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido.'),
  password: z.string().min(1, 'A senha é obrigatória.'),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres.'),
    email: z.string().email('Email inválido.'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, 'Você deve aceitar os termos de serviço.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  });

export type RegisterFormInputs = z.infer<typeof registerSchema>;

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  password: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
