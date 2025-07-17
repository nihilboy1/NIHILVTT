// src/pages/RegisterPage.tsx

import { Squares } from "@/shared/ui/SquaresBackground";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/shared/ui/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "@/features/auth/model/authStore";
import { useEffect } from "react";

const MotionLink = motion(Link);

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const registerSchema = z
  .object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
    email: z.string().email("Email inválido."),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z.string(),
    terms: z
      .boolean()
      .refine((val) => val === true, "Você deve aceitar os termos de serviço."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const methods = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const {
    register: registerField, // Renamed to avoid conflict with auth store's register
    handleSubmit,
    formState: { errors },
  } = methods;

  const { register, user, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      // Error handling is done in the store, but you can add more specific UI feedback here if needed
      console.error("Registration submission error:", err);
    }
  };

  return (
    <div className="relative bg-surface-0 text-text-primary min-h-screen w-full flex flex-col items-center p-4 sm:p-8 overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <Squares direction="left" />
      </div>

      <motion.div
        className="bg-surface-1/80 backdrop-blur-md p-8 rounded-lg shadow-xl w-full max-w-md pointer-events-auto"
        initial="hidden"
        animate="show"
        variants={itemVariants}
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl iceberg-regular text-text-primary">
            CRIAR CONTA
          </h1>
          <p className="text-text-secondary mt-2">Sua aventura começa aqui</p>
        </div>

        <FormProvider {...methods}>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FormInput<RegisterFormInputs>
              label="Nome"
              id="name"
              type="text"
              placeholder="Seu nome de usuário"
              register={registerField}
              error={errors.name}
            />

            {/* Campo Email */}
            <FormInput<RegisterFormInputs>
              label="Email"
              id="email"
              type="email"
              placeholder="seu-email@dominio.com"
              register={registerField}
              error={errors.email}
            />

            {/* Campo Senha */}
            <FormInput<RegisterFormInputs>
              label="Senha"
              id="password"
              type="password"
              placeholder="••••••••"
              register={registerField}
              error={errors.password}
            />

            {/* Campo Confirmar Senha */}
            <FormInput<RegisterFormInputs>
              label="Confirmar Senha"
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              register={registerField}
              error={errors.confirmPassword}
            />

            {/* Checkbox de Termos */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                {...registerField("terms")}
                className="h-4 w-4 rounded bg-surface-3 border-surface-3 text-accent-primary focus:ring-accent-secondary"
              />
              <label htmlFor="terms" className="text-sm text-text-secondary">
                Eu li e aceito os{" "}
                <MotionLink
                  to="/termos-de-servico"
                  className="underline text-accent-secondary hover:text-accent-secondary-hover"
                >
                  Termos de Serviço
                </MotionLink>
              </label>
              {errors.terms && (
                <p className="text-feedback-negative text-xs mt-1">
                  {errors.terms.message}
                </p>
              )}
            </div>

            {/* Botão de Registro */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full hover:bg-accent-primary flex justify-center items-center gap-3 bg-surface-3 text-text-primary text-2xl font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition-all border-b-3 border-text-primary iceberg-regular"
                disabled={isLoading}
              >
                {isLoading ? "REGISTRANDO..." : "REGISTRAR"}
              </button>
            </div>
            {error && (
              <p className="text-feedback-negative text-center text-sm mt-4">
                {error}
              </p>
            )}
          </form>
        </FormProvider>

        {/* Link para Login */}
        <p className="text-center text-sm text-text-secondary mt-8">
          Já tem uma conta?{" "}
          <MotionLink
            to="/login"
            className="font-semibold text-accent-secondary hover:underline"
          >
            Faça Login
          </MotionLink>
        </p>
      </motion.div>
    </div>
  );
}
