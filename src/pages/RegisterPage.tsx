// src/pages/RegisterPage.tsx

import { Squares } from "@/shared/ui/SquaresBackground";
import { motion } from "framer-motion";

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

export default function RegisterPage() {
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

        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-text-secondary mb-1"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-surface-2 p-3 rounded-md border border-surface-3 focus:outline-none focus:ring-2 focus:ring-accent-secondary transition-all"
              placeholder="Seu nome de aventureiro"
            />
          </div>

          {/* Campo Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text-secondary mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-surface-2 p-3 rounded-md border border-surface-3 focus:outline-none focus:ring-2 focus:ring-accent-secondary transition-all"
              placeholder="seu-email@dominio.com"
            />
          </div>

          {/* Campo Senha */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text-secondary mb-1"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-surface-2 p-3 rounded-md border border-surface-3 focus:outline-none focus:ring-2 focus:ring-accent-secondary transition-all"
              placeholder="••••••••"
            />
          </div>

          {/* Campo Confirmar Senha */}
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-text-secondary mb-1"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              className="w-full bg-surface-2 p-3 rounded-md border border-surface-3 focus:outline-none focus:ring-2 focus:ring-accent-secondary transition-all"
              placeholder="••••••••"
            />
          </div>

          {/* Checkbox de Termos */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="h-4 w-4 rounded bg-surface-3 border-surface-3 text-accent-primary focus:ring-accent-secondary"
            />
            <label htmlFor="terms" className="text-sm text-text-secondary">
              Eu li e aceito os{" "}
              <a
                href="/termos-de-servico"
                className="underline text-accent-secondary hover:text-accent-secondary-hover"
              >
                Termos de Serviço
              </a>
            </label>
          </div>

          {/* Botão de Registro */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full hover:bg-accent-primary flex justify-center items-center gap-3 bg-surface-3 text-text-primary text-2xl font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition-all border-b-3 border-text-primary iceberg-regular"
            >
              REGISTRAR
            </button>
          </div>
        </form>

        {/* Link para Login */}
        <p className="text-center text-sm text-text-secondary mt-8">
          Já tem uma conta?{" "}
          <a
            href="/login"
            className="font-semibold text-accent-secondary hover:underline"
          >
            Faça Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}
