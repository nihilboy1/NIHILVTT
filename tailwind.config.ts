import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Superfícies e Fundos
        'surface-0': 'var(--color-surface-0)',
        'surface-1': 'var(--color-surface-1)',
        'surface-2': 'var(--color-surface-2)',
        'surface-3': 'var(--color-surface-3)',

        // Texto
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',

        // Acentos
        'accent-primary': {
          DEFAULT: 'var(--color-accent-primary)',
          hover: 'var(--color-accent-primary-hover)',
          text: 'var(--color-accent-primary-text)',
        },
        'accent-secondary': {
          DEFAULT: 'var(--color-accent-secondary)',
          hover: 'var(--color-accent-secondary-hover)',
          text: 'var(--color-accent-secondary-text)',
        },
        
        // Feedback (Positivo/Negativo)
        'feedback-positive': {
          DEFAULT: 'var(--color-feedback-positive)',
          hover: 'var(--color-feedback-positive-hover)',
          text: 'var(--color-feedback-positive-text)',
        },
        'feedback-negative': {
          DEFAULT: 'var(--color-feedback-negative)',
          hover: 'var(--color-feedback-negative-hover)',
          text: 'var(--color-feedback-negative-text)',
        },
        
        // Bordas
        'border-base': 'var(--color-border-base)',
        'border-strong': 'var(--color-border-strong)',

        // Específicos da UI (manter nomes descritivos para elementos muito específicos)
        'grid-line': 'var(--color-grid-line)',
        'ruler-line': 'var(--color-ruler-line)',
        'ruler-text-background': 'var(--color-ruler-text-background)',
        'health-bar-background': 'var(--color-health-bar-background)',
        'health-bar-foreground': 'var(--color-health-bar-foreground)',
        'scrollbar-track': 'var(--color-scrollbar-track)',
        'scrollbar-thumb': 'var(--color-scrollbar-thumb)',
        'scrollbar-thumb-hover': 'var(--color-scrollbar-thumb-hover)',
      },
    },
  },
  plugins: [],
} satisfies Config
