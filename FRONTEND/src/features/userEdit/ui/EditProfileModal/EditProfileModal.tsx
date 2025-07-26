import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, UseFormRegister, FieldErrors } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useAuthStore } from '@/features/auth/model/authStore';
import { FormInput } from '@/shared/ui/FormInput';
import { Modal } from '@/shared/ui/Modal';
import { Spinner } from '@/shared/ui/Spinner';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  zIndex?: number;
}

type EditOption = 'name' | 'password' | null;

function EditProfileModal({ isOpen, onClose, zIndex }: EditProfileModalProps) {
  const { updateProfile } = useAuthStore();
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
    }
  }, [isOpen, reset, clearErrors]);

  const onSubmit = async (data: EditProfileFormInputs) => {
    setLocalError(null);
    setIsSubmitting(true);

    try {
      setIsSubmitting(true);
      setLocalError(null);

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

      if (errorMessage.includes('Senha atual inválida')) {
        setError('currentPassword', {
          type: 'manual',
          message: 'Senha atual incorreta.',
        });
      } else {
        setLocalError(errorMessage);
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
              <button
                type="button"
                onClick={() => setEditOption('name')}
                className="bg-surface-3 text-text-primary border-text-primary iceberg-regular w-full rounded-lg border-b-3 px-8 py-3 text-xl font-bold shadow-lg transition-all hover:scale-105"
              >
                ALTERAR NOME
              </button>
              <button
                type="button"
                onClick={() => setEditOption('password')}
                className="bg-surface-3 text-text-primary border-text-primary iceberg-regular w-full rounded-lg border-b-3 px-8 py-3 text-xl font-bold shadow-lg transition-all hover:scale-105"
              >
                ALTERAR SENHA
              </button>
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
                  className="bg-accent-secondary text-text-primary text-md border-text-primary iceberg-regular flex w-[10rem] items-center justify-center gap-2 rounded-lg border-b-3 px-4 py-2 font-bold shadow-lg transition-all hover:scale-105"
                  disabled={
                    isSubmitting ||
                    (editOption === 'name' && !watch('newName')) ||
                    (editOption === 'password' &&
                      (!watch('newPassword') || !watch('confirmNewPassword')))
                  }
                >
                  {isSubmitting ? (
                    <>
                      <Spinner variant="mini" /> SALVANDO...
                    </>
                  ) : (
                    'SALVAR'
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </FormProvider>
    </Modal>
  );
}

export { EditProfileModal };
