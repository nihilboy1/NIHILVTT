import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';

import { useAuthStore } from '@/features/auth/model/authStore';
import { FormInput } from '@/shared/ui/FormInput';
import { Modal } from '@/shared/ui/Modal';
import { Spinner } from '@/shared/ui/Spinner';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  zIndex?: number;
}

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'A senha atual é obrigatória.'),
    newPassword: z.string().min(6, 'A nova senha deve ter pelo menos 6 caracteres.'),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As novas senhas não coincidem.',
    path: ['confirmNewPassword'],
  });

type ChangePasswordFormInputs = z.infer<typeof changePasswordSchema>;

function ChangePasswordModal({ isOpen, onClose, zIndex }: ChangePasswordModalProps) {
  const { error: authError, updateProfile } = useAuthStore();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSpinnerForced, setShowSpinnerForced] = useState(false);

  const methods = useForm<ChangePasswordFormInputs>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  useEffect(() => {
    if (isOpen) {
      reset();
      setSuccessMessage(null);
      setLocalError(null);
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: ChangePasswordFormInputs) => {
    setSuccessMessage(null);
    setLocalError(null);
    setIsSubmitting(true);
    setShowSpinnerForced(true);

    const startTime = Date.now();

    try {
      await updateProfile({
        password: data.newPassword,
        currentPassword: data.currentPassword,
      });
      setSuccessMessage('Senha alterada com sucesso!');
      reset();
    } catch {
      setLocalError(authError || 'Falha ao alterar senha.');
    } finally {
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;
      const remainingTime = 2000 - elapsedTime; // Ensure at least 2 seconds loading

      if (remainingTime > 0) {
        setTimeout(() => {
          setIsSubmitting(false);
          setShowSpinnerForced(false);
        }, remainingTime);
      } else {
        setIsSubmitting(false);
        setShowSpinnerForced(false);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Alterar Senha"
      hideFooter={true} // Hide default footer buttons
      zIndex={zIndex}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Campo Senha Atual */}
          <FormInput<ChangePasswordFormInputs>
            label="Senha Atual"
            id="currentPassword"
            type="password"
            placeholder="••••••••"
            register={registerField}
            error={errors.currentPassword}
          />

          {/* Campo Nova Senha */}
          <FormInput<ChangePasswordFormInputs>
            label="Nova Senha"
            id="newPassword"
            type="password"
            placeholder="••••••••"
            register={registerField}
            error={errors.newPassword}
          />

          {/* Campo Confirmar Nova Senha */}
          <FormInput<ChangePasswordFormInputs>
            label="Confirmar Nova Senha"
            id="confirmNewPassword"
            type="password"
            placeholder="••••••••"
            register={registerField}
            error={errors.confirmNewPassword}
          />

          {successMessage && (
            <p className="text-feedback-positive mt-4 text-center text-sm">{successMessage}</p>
          )}
          {(localError || authError) && (
            <p className="text-feedback-negative mt-4 text-center text-sm">
              {localError || authError}
            </p>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-surface-0 bg-surface-2 border-surface-0 focus:ring-offset-surface-1 focus:ring-accent-primary hover:border-feedback-negative-hover hover:text-text-primary hover:bg-feedback-negative-hover cursor-pointer rounded-md border px-4 py-2 font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-accent-secondary text-text-primary text-md border-text-primary iceberg-regular flex items-center justify-center gap-2 rounded-lg border-b-3 px-4 py-2 font-bold shadow-lg transition-all hover:scale-105"
              disabled={isSubmitting}
            >
              {showSpinnerForced ? (
                <>
                  <Spinner /> SALVANDO...
                </>
              ) : (
                'SALVAR SENHA'
              )}
            </button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}

export default ChangePasswordModal;
