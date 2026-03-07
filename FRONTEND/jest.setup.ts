import '@testing-library/jest-dom';

const THEME_VARS: Record<string, string> = {
  '--color-accent-primary': '#522678',
  '--color-accent-secondary': '#875cad',
  '--color-surface-0': '#111111',
  '--color-surface-0-transparent': 'rgba(17, 17, 17, 0)',
  '--color-surface-1': '#181818',
  '--color-surface-2': '#4e4e50',
  '--color-text-primary': '#e4e8e8',
  '--color-text-secondary': '#a9a9a9',
  '--color-feedback-positive': '#50fa7b',
  '--color-feedback-negative': '#942222',
  '--color-feedback-warning': '#f59e0b',
  '--color-hp-bar-fill': '#5f9a72',
  '--color-hp-tick': '#111111',
  '--color-board-bg': '#f3f4f6',
  '--color-board-grid': '#c3cad6',
  '--color-board-page-background-default': '#ffffff',
  '--color-board-grid-line-default': '#788475',
  '--color-info': '#60a5fa',
  '--color-shadow': '#020617',
};

Object.entries(THEME_VARS).forEach(([key, value]) => {
  document.documentElement.style.setProperty(key, value);
});
