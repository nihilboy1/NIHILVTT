import { ReactNode } from 'react';

import { motion } from 'framer-motion';

import { fadeInAndSlideUp } from '@/shared/config/MotionAnimations';
import { PageShell } from '@/shared/ui/PageShell';

type AuthPageLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  squareDirection: 'left' | 'right';
};

export function AuthPageLayout({
  title,
  subtitle,
  children,
  squareDirection,
}: AuthPageLayoutProps) {
  return (
    <PageShell
      className="flex flex-col items-center p-4 text-text-primary sm:p-8"
      squareDirection={squareDirection}
      squareInteractive
    >
      <motion.div
        className="pointer-events-auto w-full max-w-lg rounded-lg bg-surface-1/80 p-8 shadow-xl backdrop-blur-md sm:min-w-[480px]"
        variants={fadeInAndSlideUp}
        initial="hidden"
        animate="show"
      >
        <div className="mb-8 text-center">
          <h1 className="iceberg-regular text-5xl text-text-primary">{title}</h1>
          <p className="mt-2 text-text-secondary">{subtitle}</p>
        </div>

        {children}
      </motion.div>
    </PageShell>
  );
}
