// src/pages/RegisterPage.tsx

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  RegisterFormInputs,
  registerSchema,
} from "@/features/auth/model/authSchemas";
import { useAuthStore } from "@/features/auth/model/authStore";
import { useAuthModalStore } from "@/features/modalManager/model/authModalStore";
import { fadeInAndSlideUp } from "@/shared/config/MotionAnimations";
import { FormInput } from "@/shared/ui/FormInput";
import { MotionLink } from "@/shared/ui/MotionLink";
import { Squares } from "@/shared/ui/SquaresBackground";
import { AuthModalManager } from "@/widgets/authModalManager/ui/AuthModalManager";

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
  const { openModal } = useAuthModalStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onSubmit = async (data: RegisterFormInputs) => {
    await register(data);
  };

  return (
    <div className="relative bg-surface-0 text-text-primary min-h-screen w-full flex flex-col items-center p-4 sm:p-8 overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full ">
        <Squares direction="right" />
      </div>

      <motion.div
        className=" bg-surface-1/80 backdrop-blur-md p-8 rounded-lg shadow-xl w-full max-w-md pointer-events-auto"
        variants={fadeInAndSlideUp}
        initial="hidden"
        animate="show"
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
            <div className="flex-col">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  {...registerField("terms")}
                  className="h-4 w-4 rounded bg-surface-3 border-surface-3 text-accent-primary focus:ring-accent-secondary"
                />
                <label htmlFor="terms" className="text-sm text-text-secondary">
                  Eu li e aceito os{" "}
                  <motion.button
                    type="button"
                    onClick={() =>
                      openModal("termsOfServiceModal", {
                        content: "Depois haverão termos de serviço aqui",
                      })
                    }
                    className="underline text-accent-secondary hover:text-accent-secondary-hover"
                  >
                    Termos de Serviço
                  </motion.button>
                </label>
              </div>
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
      <AuthModalManager />
    </div>
  );
}
