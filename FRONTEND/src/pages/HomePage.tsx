import { motion } from "framer-motion";
import { FaDragon } from "react-icons/fa";
import { LuScrollText } from "react-icons/lu";
import { LuMousePointerClick } from "react-icons/lu";
import { PiMathOperationsBold } from "react-icons/pi";

import { useAuthStore } from "@/features/auth/model/authStore";
import {
  staggeredFadeInAndSlideUpContainer,
  staggeredFadeInAndSlideUpItem,
} from "@/shared/config/MotionAnimations";
import { DiceIcon } from "@/shared/ui/Icons";
import { MotionLink } from "@/shared/ui/MotionLink";
import { Squares } from "@/shared/ui/SquaresBackground";

const features = [
  {
    icon: <LuMousePointerClick />,
    title: "Combate em um Clique",
    description:
      "Clique no seu token, na sua ação e no seu alvo. É só isso. O NIHILVTT faz todo o resto por você.",
  },
  {
    icon: <PiMathOperationsBold />,
    title: "Motor de Regras Inteligente",
    description:
      "Nossa automação calcula rolagens, dano, bônus, e penalidades, e anuncia o resultado completo no chat.",
  },
  {
    icon: <LuScrollText />,
    title: "Fichas Vivas",
    description:
      "HP, espaços de magia, condições... Tudo é atualizado em tempo real na ficha dos jogadores e dos monstros. Sem anotações manuais.",
  },
  {
    icon: <FaDragon />,
    title: "Feito para D&D 5e (2024)",
    description:
      "Plataforma leve e integrada com as regras mais recentes do D&D, criada por quem joga e entende o que um mestre precisa.",
  },
];

export default function HomePage() {
  const { user } = useAuthStore();

  return (
    <div className="relative bg-surface-0 text-text-primary min-h-screen w-full flex flex-col items-center p-4 sm:p-8 overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <Squares />
      </div>

      <div className="relative w-full flex flex-col items-center pointer-events-none">
        <motion.header
          className="text-center w-full max-w-4xl pt-16 pb-20 flex flex-col items-center"
          variants={staggeredFadeInAndSlideUpContainer}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="text-6xl md:text-7xl iceberg-regular font-bold tracking-wider"
            variants={staggeredFadeInAndSlideUpItem}
          >
            NIHIL<span className="text-accent-secondary">VTT</span>
          </motion.h1>

          <motion.p
            className="text-text-secondary mt-4 text-lg max-w-2xl"
            variants={staggeredFadeInAndSlideUpItem}
          >
            Foque no jogo. Nós cuidamos das regras. <br />
            <span className="font-bold tracking-wider">
              Crie uma conta e narre suas melhores aventuras.
            </span>
          </motion.p>

          <motion.div
            className="flex flex-col items-center gap-4 mt-10"
            variants={staggeredFadeInAndSlideUpItem}
          >
            {user ? (
              <MotionLink
                to="/dashboard"
                className="hover:bg-accent-primary flex justify-items-center items-center gap-3 bg-surface-3  text-text-primary text-3xl font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-110 transition-all border-b-3 border-text-primary iceberg-regular pointer-events-auto"
              >
                <span className="mt-1">IR PARA O DASHBOARD</span>
                <DiceIcon className="w-10 h-10" />
              </MotionLink>
            ) : (
              <>
                <MotionLink
                  to="/register"
                  className="hover:bg-accent-primary flex justify-items-center items-center gap-3 bg-surface-3  text-text-primary text-3xl font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-110 transition-all border-b-3 border-text-primary iceberg-regular pointer-events-auto"
                >
                  <span className="mt-1">CRIAR CONTA</span>
                  <DiceIcon className="w-10 h-10" />
                </MotionLink>
                <MotionLink
                  to="/login"
                  className="iceberg-regular bg-text-primary text-surface-3 text-lg font-bold py-2 rounded-xs shadow-md  hover:scale-105 transition-all hover:bg-surface-3 hover:text-text-primary w-full hover:w-[110%] border-b-2 border-text-primary hover:border-accent-secondary pointer-events-auto"
                  whileTap={{ scale: 0.95 }}
                >
                  ENTRAR
                </MotionLink>
              </>
            )}
          </motion.div>
        </motion.header>

        <main id="features" className="w-full max-w-6xl py-16">
          <div className="text-center mb-12 px-4">
            <h2 className="text-4xl font-bold text-text-primary iceberg-regular">
              Recursos Criados para o Jogo
            </h2>
            <p className="text-text-secondary mt-2 text-md">
              Tudo que você precisa, sem o que você não precisa.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8"
            variants={staggeredFadeInAndSlideUpContainer}
            initial="hidden"
            animate="show"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                className="bg-surface-1/80 backdrop-blur-sm p-6 rounded-lg  flex flex-col items-center text-center cursor-pointer border-b-4 border-surface-1/80 hover:border-accent-primary pointer-events-auto"
                variants={staggeredFadeInAndSlideUpItem}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
              >
                <span className="text-5xl mb-4">{feature.icon}</span>
                <h3 className="text-xl font-bold text-accent-secondary mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </main>

        <motion.footer
          className="w-full text-center mt-auto py-8 text-text-secondary text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p>
            Desenvolvido por{" "}
            <a
              href="https://github.com/nihilboy1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-secondary hover:text-accent-secondary-hover underline pointer-events-auto"
            >
              Samuel Seve (nihilboy1)
            </a>
          </p>
          <p className="mt-1">NIHILVTT &copy; 2025</p>
        </motion.footer>
      </div>
    </div>
  );
}
