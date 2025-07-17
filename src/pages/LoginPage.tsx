// src/pages/LoginPage.tsx

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

const loginSchema = z.object({
  email: z.string().email("Email inválido."),
  password: z.string().min(1, "A senha é obrigatória."),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const methods = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register: registerField, // Renamed to avoid conflict with auth store's register
    handleSubmit,
    formState: { errors },
  } = methods;

  const { login, user, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      console.error("Login submission error:", err);
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
            FAZER LOGIN
          </h1>
          <p className="text-text-secondary mt-2">Bem-vindo de volta</p>
        </div>

        <FormProvider {...methods}>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Campo Email */}
            <FormInput<LoginFormInputs>
              label="Email"
              id="email"
              type="email"
              placeholder="seu-email@dominio.com"
              register={registerField}
              error={errors.email}
            />

            {/* Campo Senha */}
            <FormInput<LoginFormInputs>
              label="Senha"
              id="password"
              type="password"
              placeholder="••••••••"
              register={registerField}
              error={errors.password}
            />

            {/* Botão de Login */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full hover:bg-accent-primary flex justify-center items-center gap-3 bg-surface-3 text-text-primary text-2xl font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition-all border-b-3 border-text-primary iceberg-regular"
                disabled={isLoading}
              >
                {isLoading ? "ENTRANDO..." : "ENTRAR"}
              </button>
            </div>
            {error && (
              <p className="text-feedback-negative text-center text-sm mt-4">
                {error}
              </p>
            )}
          </form>
        </FormProvider>

        {/* Link para Registro */}
        <p className="text-center text-sm text-text-secondary mt-8">
          Não tem uma conta?{" "}
          <MotionLink
            to="/register"
            className="font-semibold text-accent-secondary hover:underline"
          >
            Crie uma conta
          </MotionLink>
        </p>
      </motion.div>
    </div>
  );
}
