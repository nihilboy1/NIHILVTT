import { ReactNode } from 'react';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  variants: Variants;
};

export function FeatureCard({ icon, title, description, variants }: FeatureCardProps) {
  return (
    <motion.div
      className="pointer-events-auto flex cursor-pointer flex-col items-center rounded-lg border-b-4 border-surface-1/80 bg-surface-1/80 p-6 text-center backdrop-blur-sm hover:border-accent-primary"
      variants={variants}
      whileHover={{
        y: -8,
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
    >
      <span className="mb-4 text-5xl">{icon}</span>
      <h3 className="mb-2 text-xl font-bold text-accent-secondary">{title}</h3>
      <p className="text-sm text-text-secondary">{description}</p>
    </motion.div>
  );
}
