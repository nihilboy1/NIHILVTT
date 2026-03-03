import { Toaster } from 'sonner';

import AppRouter from './router';

export default function App() {
  return (
    <>
      <AppRouter />
      <Toaster
        position="top-right"
        closeButton
        richColors
        theme="dark"
        toastOptions={{
          style: {
            background: 'var(--color-surface-0)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-surface-2)',
          },
          className: 'text-text-primary',
          classNames: {
            closeButton:
              '!bg-surface-1 !text-text-primary !border-surface-2 hover:!bg-surface-2 hover:!text-text-primary',
          },
        }}
      />
    </>
  );
}
