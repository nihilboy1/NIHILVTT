import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        iceberg: ['Iceberg', 'sans-serif'],
        'work-sans': ['Work Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
