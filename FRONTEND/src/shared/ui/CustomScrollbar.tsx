import { ReactNode } from 'react';

import './styles/custom-scrollbar.css';

interface CustomScrollbarProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Componente wrapper que adiciona uma scrollbar estilizada
 * Não usa a classe hide-scrollbar e permite que a scrollbar seja mostrada
 */
export function CustomScrollbar({ children, className = '', style = {} }: CustomScrollbarProps) {
  // Adicionar regras CSS para estilos WebKit por uma folha de estilo
  return (
    <div
      className={`custom-scrollbar ${className}`}
      style={{
        /* Estilo base */
        overflowY: 'auto',

        /* Para Firefox */
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--color-surface-3) var(--color-surface-1)',

        ...style,
      }}
    >
      {children}
    </div>
  );
}
