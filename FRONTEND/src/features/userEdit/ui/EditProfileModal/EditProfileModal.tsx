import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, UseFormRegister, FieldErrors } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useAuthStore } from '@/features/auth/model/authStore';
import { AppButton } from '@/shared/ui/AppButton';
import { FormInput } from '@/shared/ui/FormInput';
import { Modal } from '@/shared/ui/Modal';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  zIndex?: number;
}

type EditOption = 'name' | 'password' | null;

function EditProfileModal({ isOpen, onClose, zIndex }: EditProfileModalProps) {
  const { authError, clearAuthError, updateProfile } = useAuthStore();
  const [editOption, setEditOption] = useState<EditOption>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const baseSchema = z.object({
    currentPassword: z.string().min(1, 'A senha atual é obrigatória.'),
  });

  const nameSchema = baseSchema.extend({
    newName: z.string().min(3, 'O novo nome deve ter pelo menos 3 caracteres.'),
  });

  const passwordSchema = baseSchema
    .extend({
      newPassword: z.string().min(6, 'A nova senha deve ter pelo menos 6 caracteres.'),
      confirmNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: 'As novas senhas não coincidem.',
      path: ['confirmNewPassword'],
    });

  const schema = z.union([nameSchema, passwordSchema]);

  type EditProfileFormInputs = z.infer<typeof schema>;

  const methods = useForm<EditProfileFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: '',
      newName: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setError,
    clearErrors,
  } = methods;

  useEffect(() => {
    if (isOpen) {
      reset();
      setEditOption(null);
      setLocalError(null);
      clearErrors();
      clearAuthError();
    }
  }, [isOpen, reset, clearErrors, clearAuthError]);

  const onSubmit = async (data: EditProfileFormInputs) => {
    setLocalError(null);
    setIsSubmitting(true);

    try {
      let successMessage = '';

      if (editOption === 'name' && 'newName' in data) {
        await updateProfile({
          name: data.newName,
          currentPassword: data.currentPassword,
        });
        successMessage = 'Nome alterado com sucesso!';
      } else if (editOption === 'password' && 'newPassword' in data) {
        await updateProfile({
          password: data.newPassword,
          currentPassword: data.currentPassword,
        });
        successMessage = 'Senha alterada com sucesso!';
      } else {
        throw new Error('Opção de edição inválida.');
      }

      toast.success(successMessage);
      onClose();
      reset();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';

      if (authError?.fieldErrors.currentPassword) {
        setError('currentPassword', {
          type: 'server',
          message: authError.fieldErrors.currentPassword,
        });
      } else {
        setLocalError(authError?.formError || errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        editOption === 'name'
          ? 'Alterar Nome'
          : editOption === 'password'
            ? 'Alterar Senha'
            : 'Alterar Dados Cadastrados'
      }
      hideFooter={true}
      zIndex={zIndex}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {!editOption && (
            <div className="flex flex-col space-y-4">
              <AppButton
                type="button"
                onClick={() => setEditOption('name')}
                variant="secondary"
                fullWidth
                className="iceberg-regular border-b-3 border-text-primary px-8 py-3 text-xl font-bold shadow-lg hover:scale-105"
              >
                ALTERAR NOME
              </AppButton>
              <AppButton
                type="button"
                onClick={() => setEditOption('password')}
                variant="secondary"
                fullWidth
                className="iceberg-regular border-b-3 border-text-primary px-8 py-3 text-xl font-bold shadow-lg hover:scale-105"
              >
                ALTERAR SENHA
              </AppButton>
            </div>
          )}

          {editOption && (
            <>
              <FormInput<EditProfileFormInputs>
                label="Senha Atual"
                id="currentPassword"
                type="password"
                placeholder="••••••••"
                register={registerField}
                error={errors.currentPassword}
                disabled={isSubmitting}
              />

              {editOption === 'name' && (
                <FormInput<z.infer<typeof nameSchema>>
                  label="Novo Nome"
                  id="newName"
                  type="text"
                  placeholder="Seu novo nome de usuário"
                  register={registerField as UseFormRegister<z.infer<typeof nameSchema>>}
                  error={(errors as FieldErrors<z.infer<typeof nameSchema>>).newName}
                  disabled={isSubmitting}
                />
              )}

              {editOption === 'password' && (
                <>
                  <FormInput<z.infer<typeof passwordSchema>>
                    label="Nova Senha"
                    id="newPassword"
                    type="password"
                    placeholder="••••••••"
                    register={registerField as UseFormRegister<z.infer<typeof passwordSchema>>}
                    error={(errors as FieldErrors<z.infer<typeof passwordSchema>>).newPassword}
                    disabled={isSubmitting}
                  />
                  <FormInput<z.infer<typeof passwordSchema>>
                    label="Confirmar Nova Senha"
                    id="confirmNewPassword"
                    type="password"
                    placeholder="••••••••"
                    register={registerField as UseFormRegister<z.infer<typeof passwordSchema>>}
                    error={
                      (errors as FieldErrors<z.infer<typeof passwordSchema>>).confirmNewPassword
                    }
                    disabled={isSubmitting}
                  />
                </>
              )}

              {localError && (
                <p className="text-feedback-negative mt-4 text-center text-sm">{localError}</p>
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
                  className="text-md iceberg-regular w-[10rem] border-b-3 border-text-primary font-bold shadow-lg hover:scale-105"
                  disabled={
                    (editOption === 'name' && !watch('newName')) ||
                    (editOption === 'password' &&
                      (!watch('newPassword') || !watch('confirmNewPassword')))
                  }
                  isLoading={isSubmitting}
                  loadingText="SALVANDO..."
                >
                  SALVAR
                </AppButton>
              </div>
            </>
          )}
        </form>
      </FormProvider>
    </Modal>
  );
}

export { EditProfileModal };

