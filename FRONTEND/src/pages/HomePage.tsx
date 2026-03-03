import { motion } from 'framer-motion';
import { FaDragon } from 'react-icons/fa';
import { LuScrollText } from 'react-icons/lu';
import { LuMousePointerClick } from 'react-icons/lu';
import { PiMathOperationsBold } from 'react-icons/pi';

import { useAuthStore } from '@/features/auth/model/authStore';
import {
  staggeredFadeInAndSlideUpContainer,
  staggeredFadeInAndSlideUpItem,
} from '@/shared/config/MotionAnimations';
import { DiceIcon } from '@/shared/ui/Icons';
import { MotionLink } from '@/shared/ui/MotionLink';
import { PageShell } from '@/shared/ui/PageShell';
import { FeatureCard } from '@/widgets/homeFeatures/ui/FeatureCard';

const features = [
  {
    icon: <LuMousePointerClick />,
    title: 'Combate em um Clique',
    description:
      'Clique no seu token, na sua ação e no seu alvo. É só isso. O NIHILVTT faz todo o resto por você.',
  },
  {
    icon: <PiMathOperationsBold />,
    title: 'Motor de Regras Inteligente',
    description:
      'Nossa automação calcula rolagens, dano, bônus, e penalidades, e anuncia o resultado completo no chat.',
  },
  {
    icon: <LuScrollText />,
    title: 'Fichas Vivas',
    description:
      'HP, espaços de magia, condições... Tudo é atualizado em tempo real na ficha dos jogadores e dos monstros. Sem anotações manuais.',
  },
  {
    icon: <FaDragon />,
    title: 'Feito para D&D 5e (2024)',
    description:
      'Plataforma leve e integrada com as regras mais recentes do D&D, criada por quem joga e entende o que um mestre precisa.',
  },
];

export default function HomePage() {
  const { user } = useAuthStore();

  return (
    <PageShell
      className="text-text-primary flex flex-col items-center p-4 sm:p-8"
      contentClassName="w-full flex flex-col items-center pointer-events-none"
    >
      <motion.header
        className="flex w-full max-w-4xl flex-col items-center pt-16 pb-20 text-center"
        variants={staggeredFadeInAndSlideUpContainer}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="iceberg-regular text-6xl font-bold tracking-wider md:text-7xl"
          variants={staggeredFadeInAndSlideUpItem}
        >
          NIHIL<span className="text-accent-secondary">VTT</span>
        </motion.h1>

        <motion.p
          className="text-text-secondary mt-4 max-w-2xl text-lg"
          variants={staggeredFadeInAndSlideUpItem}
        >
          Foque no jogo. Nós cuidamos das regras. <br />
          <span className="font-bold tracking-wider">
            Crie uma conta e narre suas melhores aventuras.
          </span>
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4"
          variants={staggeredFadeInAndSlideUpItem}
        >
          {user ? (
            <MotionLink
              to="/dashboard"
              className="hover:bg-accent-primary bg-surface-3 text-text-primary border-text-primary iceberg-regular pointer-events-auto flex items-center justify-items-center gap-3 rounded-lg border-b-3 px-8 py-3 text-3xl font-bold shadow-lg transition-all hover:scale-110"
            >
              <span className="mt-1">IR PARA O DASHBOARD</span>
              <DiceIcon className="h-10 w-10" />
            </MotionLink>
          ) : (
            <>
              <MotionLink
                to="/register"
                className="hover:bg-accent-primary bg-surface-3 text-text-primary border-text-primary iceberg-regular pointer-events-auto flex items-center justify-items-center gap-3 rounded-lg border-b-3 px-8 py-3 text-3xl font-bold shadow-lg transition-all hover:scale-110"
              >
                <span className="mt-1">CRIAR CONTA</span>
                <DiceIcon className="h-10 w-10" />
              </MotionLink>
              <MotionLink
                to="/login"
                className="iceberg-regular bg-text-primary text-surface-3 hover:bg-surface-3 hover:text-accent-secondary border-text-primary hover:border-accent-secondary pointer-events-auto w-full rounded-xs border-b-2 py-2 text-lg font-bold shadow-md transition-all hover:w-[110%] hover:scale-105"
                whileTap={{ scale: 0.95 }}
              >
                ENTRAR
              </MotionLink>
            </>
          )}
        </motion.div>
      </motion.header>

      <main id="features" className="w-full max-w-6xl py-16">
        <div className="mb-12 px-4 text-center">
          <h2 className="text-text-primary iceberg-regular text-4xl font-bold">
            Recursos Criados para o Jogo
          </h2>
          <p className="text-text-secondary text-md mt-2">
            Tudo que você precisa, sem o que você não precisa.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-8 px-8 md:grid-cols-2 lg:grid-cols-4"
          variants={staggeredFadeInAndSlideUpContainer}
          initial="hidden"
          animate="show"
        >
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variants={staggeredFadeInAndSlideUpItem}
            />
          ))}
        </motion.div>
      </main>

      <motion.footer
        className="text-text-secondary mt-auto w-full py-8 text-center text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p>
          Desenvolvido por{' '}
          <a
            href="https://github.com/nihilboy1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-secondary hover:text-accent-secondary-hover pointer-events-auto underline"
          >
            Samuel Seve (nihilboy1)
          </a>
        </p>
        <p className="mt-1">NIHILVTT &copy; 2025</p>
      </motion.footer>
    </PageShell>
  );
}
