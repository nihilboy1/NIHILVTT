import { ReactNode, useState } from 'react';

import { FaQuestionCircle } from 'react-icons/fa';

interface TooltipProps {
  content: ReactNode;
  icon?: ReactNode;
  iconSize?: number;
  position?: 'top' | 'bottom' | 'left' | 'right';
  width?: string;
  iconColor?: string;
}

export function Tooltip({
  content,
  icon = <FaQuestionCircle size={16} />,
  position = 'top',
  width = '200px',
  iconColor = 'var(--color-accent-primary)',
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Define posição do tooltip com base na prop position
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  };

  return (
    <div className="relative inline-flex">
      {/* Apenas o ícone aciona o evento de hover */}
      <div
        className="cursor-pointer"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        style={{ color: iconColor }}
      >
        {icon}
      </div>

      {/* Tooltip visível apenas quando houver hover no ícone */}
      {isVisible && (
        <div
          className={`absolute ${getPositionClasses()} z-50`}
          style={{
            width,
            backgroundColor: 'var(--color-surface-2)',
            color: 'var(--color-text-secondary)',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            pointerEvents: 'none', // Evita que o próprio tooltip capture eventos de mouse
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
}
