import { useAuthModalStore } from '@/features/modalManager/model/authModalStore';
import { ModalEntry } from '@/features/modalManager/model/baseModalConfig';
import { TermsModal } from '@/shared/ui/TermsModal';

export function AuthModalManager() {
  const { modalStack, closeModal } = useAuthModalStore();

  const authModals = modalStack.filter((modal) => modal.name === 'termsOfServiceModal');

  const topModal = authModals.length > 0 ? authModals[authModals.length - 1] : null;

  return (
    <>
      <div
        className="invisible fixed inset-0 flex items-center justify-center p-4"
        role="button"
        tabIndex={0}
        onClick={() => {
          if (topModal && topModal.dismissible !== false) {
            closeModal();
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            if (topModal && topModal.dismissible !== false) {
              closeModal();
            }
          }
        }}
        style={{ zIndex: 99 }}
      />

      {authModals.map((modalEntry: ModalEntry) => {
        const { name, props } = modalEntry;

        switch (name) {
          case 'termsOfServiceModal':
            return (
              <TermsModal
                key={modalEntry.id}
                isOpen={true}
                onClose={closeModal}
                content={props.content as string}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
