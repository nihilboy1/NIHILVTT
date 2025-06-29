import { useEffect, type RefObject } from 'react';

/**
 * Um custom hook para lidar com o fechamento de um elemento (como um modal ou popover)
 * quando o usuário clica fora dele ou pressiona a tecla Escape.
 *
 * @param ref Ref para o elemento que, se clicado fora, deve acionar o onClose.
 * @param isOpen Booleano indicando se o elemento está atualmente aberto/visível.
 * @param onClose Callback a ser chamada quando o elemento deve ser fechado.
 * @param ignoredClass (Opcional) Uma classe CSS. Cliques em elementos com esta classe não acionarão onClose.
 */
const useDismissable = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  isOpen: boolean,
  onClose: () => void,
  ignoredClass?: string
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (ignoredClass) {
          const targetElement = event.target as HTMLElement;
          if (targetElement.closest(`.${ignoredClass}`)) {
            return;
          }
        }
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [ref, isOpen, onClose, ignoredClass]);
};

export default useDismissable;
