import { useEffect, type RefObject } from 'react';

import { type ReferenceType } from '@floating-ui/react';

export const useDismissable = <T extends ReferenceType = ReferenceType>(
  refs: RefObject<T | null> | RefObject<T | null>[],
  isOpen: boolean,
  onClose: () => void,
  ignoredClass?: string,
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const refsArray = Array.isArray(refs) ? refs : [refs];

      const clickedOutsideAllRefs = refsArray.every((ref) => {
        if (ref.current instanceof HTMLElement) {
          return !ref.current.contains(event.target as Node);
        }
        // If it's a VirtualElement or null, it's considered "outside" for dismissal purposes
        return true;
      });

      if (clickedOutsideAllRefs) {
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
  }, [refs, isOpen, onClose, ignoredClass]);
};
