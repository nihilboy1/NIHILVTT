import { ReactNode, forwardRef } from 'react';

import './styles/custom-scrollbar.css';

interface CustomScrollbarProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

/**
 * Componente wrapper que adiciona uma scrollbar estilizada
 * Não usa a classe hide-scrollbar e permite que a scrollbar seja mostrada
 */
export const CustomScrollbar = forwardRef<HTMLDivElement, CustomScrollbarProps>(
  ({ children, className = '', style = {}, id }, ref) => {
    return (
      <div
        ref={ref}
        className={`custom-scrollbar ${className}`}
        id={id}
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
  },
);

// Adiciona o displayName
CustomScrollbar.displayName = 'CustomScrollbar';
