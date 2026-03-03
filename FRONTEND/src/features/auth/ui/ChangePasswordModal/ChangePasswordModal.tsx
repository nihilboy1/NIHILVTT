import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';

import { useAuthStore } from '@/features/auth/model/authStore';
import { AppButton } from '@/shared/ui/AppButton';
import { FormInput } from '@/shared/ui/FormInput';
import { Modal } from '@/shared/ui/Modal';

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
  const { authError, clearAuthError, updateProfile } = useAuthStore();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setError,
    formState: { errors },
    reset,
  } = methods;

  useEffect(() => {
    if (isOpen) {
      reset();
      setSuccessMessage(null);
      setLocalError(null);
      clearAuthError();
    }
  }, [isOpen, reset, clearAuthError]);

  const onSubmit = async (data: ChangePasswordFormInputs) => {
    setSuccessMessage(null);
    setLocalError(null);
    setIsSubmitting(true);

    try {
      await updateProfile({
        password: data.newPassword,
        currentPassword: data.currentPassword,
      });
      setSuccessMessage('Senha alterada com sucesso!');
      reset();
    } catch (err) {
      const serverMessage = err instanceof Error ? err.message : 'Falha ao alterar senha.';
      if (authError?.fieldErrors.currentPassword) {
        setError('currentPassword', {
          type: 'server',
          message: authError.fieldErrors.currentPassword,
        });
      } else {
        setLocalError(authError?.formError || serverMessage);
      }
    } finally {
      setIsSubmitting(false);
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
          {(localError || authError?.formError) && (
            <p className="text-feedback-negative mt-4 text-center text-sm">
              {localError || authError?.formError}
            </p>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <AppButton
              type="button"
              onClick={onClose}
              variant="secondary"
              disabled={isSubmitting}
            >
              Cancelar
            </AppButton>
            <AppButton
              type="submit"
              variant="primary"
              className="text-md iceberg-regular border-b-3 border-text-primary font-bold shadow-lg hover:scale-105"
              isLoading={isSubmitting}
              loadingText="SALVANDO..."
            >
              SALVAR SENHA
            </AppButton>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}

export default ChangePasswordModal;
