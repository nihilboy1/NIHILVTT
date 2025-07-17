import React, { useEffect, useState } from "react";
import { useForm, FormProvider, UseFormRegister, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/shared/ui/FormInput";
import { Modal } from "@/shared/ui/Modal";
import { useAuthStore } from "@/features/auth/model/authStore";
import Spinner from "@/shared/ui/Spinner/Spinner";
import { toast } from "sonner";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  zIndex?: number;
}

type EditOption = "name" | "password" | null;

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  zIndex,
}) => {
  const { error: authError, updateProfile } = useAuthStore();
  const [editOption, setEditOption] = useState<EditOption>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSpinnerForced, setShowSpinnerForced] = useState(false);

  const baseSchema = z.object({
    currentPassword: z.string().min(1, "A senha atual é obrigatória."),
  });

  const nameSchema = baseSchema.extend({
    newName: z.string().min(3, "O novo nome deve ter pelo menos 3 caracteres."),
  });

  const passwordSchema = baseSchema.extend({
    newPassword: z
      .string()
      .min(6, "A nova senha deve ter pelo menos 6 caracteres."),
    confirmNewPassword: z.string(),
  }).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As novas senhas não coincidem.",
    path: ["confirmNewPassword"],
  });

  const schema = z.union([nameSchema, passwordSchema]);

  type EditProfileFormInputs = z.infer<typeof schema>;

  const methods = useForm<EditProfileFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: "",
      newName: "",
      newPassword: "",
      confirmNewPassword: "",
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
      clearErrors(); // Clear all errors on modal open
    }
  }, [isOpen, reset, clearErrors]);

  const onSubmit = async (data: EditProfileFormInputs) => {
    setLocalError(null);
    setIsSubmitting(true);
    setShowSpinnerForced(true);

    const startTime = Date.now();

      try {
        if (editOption === "name") {
          const nameData = data as z.infer<typeof nameSchema>;
          await updateProfile({ name: nameData.newName, currentPassword: nameData.currentPassword });
          toast.success("Nome alterado com sucesso!");
        } else if (editOption === "password") {
          const passwordData = data as z.infer<typeof passwordSchema>;
          await updateProfile({
            password: passwordData.newPassword,
            currentPassword: passwordData.currentPassword,
          });
          toast.success("Senha alterada com sucesso!");
        }
        onClose();
        reset();
      } catch (err) {
        // Catch specific error from authSlice for incorrect current password
        if (authError && authError.includes("Senha atual inválida.")) {
          setError("currentPassword", {
            type: "manual",
            message: "Senha atual incorreta.",
          });
          setLocalError("Senha atual incorreta.");
        } else if (authError && authError.includes("A senha atual é obrigatória para alterar a senha.")) {
          setError("currentPassword", {
            type: "manual",
            message: "A senha atual é obrigatória.",
          });
          setLocalError("A senha atual é obrigatória.");
        } else {
          setLocalError(authError || "Falha ao atualizar dados.");
        }
      } finally {
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        const remainingTime = 2000 - elapsedTime;

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
      title={
        editOption === "name"
          ? "Alterar Nome"
          : editOption === "password"
          ? "Alterar Senha"
          : "Alterar Dados Cadastrados"
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
                onClick={() => setEditOption("name")}
                className="w-full bg-surface-3 text-text-primary text-xl font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition-all border-b-3 border-text-primary iceberg-regular"
              >
                ALTERAR NOME
              </button>
              <button
                type="button"
                onClick={() => setEditOption("password")}
                className="w-full bg-surface-3 text-text-primary text-xl font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-105 transition-all border-b-3 border-text-primary iceberg-regular"
              >
                ALTERAR SENHA
              </button>
            </div>
          )}

          {editOption && (
            <>
              {/* Campo Senha Atual */}
              <FormInput<EditProfileFormInputs>
                label="Senha Atual"
                id="currentPassword"
                type="password"
                placeholder="••••••••"
                register={registerField}
                error={errors.currentPassword}
                disabled={isSubmitting}
              />

              {editOption === "name" && (
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

              {editOption === "password" && (
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
                    error={(errors as FieldErrors<z.infer<typeof passwordSchema>>).confirmNewPassword}
                    disabled={isSubmitting}
                  />
                </>
              )}

              {localError && (
                <p className="text-feedback-negative text-center text-sm mt-4">
                  {localError}
                </p>
              )}

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-surface-0 cursor-pointer bg-surface-2 border border-surface-0 px-4 py-2 rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-1 focus:ring-accent-primary hover:border-feedback-negative-hover hover:text-text-primary hover:bg-feedback-negative-hover"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-accent-secondary text-text-primary text-md font-bold py-2 px-4 rounded-lg shadow-lg hover:scale-105 transition-all border-b-3 border-text-primary iceberg-regular flex items-center justify-center gap-2"
                  disabled={isSubmitting || (editOption === "name" && !watch("newName")) || (editOption === "password" && (!watch("newPassword") || !watch("confirmNewPassword")))}
                >
                  {showSpinnerForced ? (
                    <>
                      <Spinner /> SALVANDO...
                    </>
                  ) : (
                    "SALVAR"
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </FormProvider>
    </Modal>
  );
};

export { EditProfileModal };
