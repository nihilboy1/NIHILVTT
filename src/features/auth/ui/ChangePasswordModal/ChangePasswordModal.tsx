import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/shared/ui/FormInput";
import { Modal } from "@/shared/ui/Modal";
import { useAuthStore } from "@/features/auth/model/authStore";
import Spinner from "@/shared/ui/Spinner/Spinner";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  zIndex?: number;
}

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "A senha atual é obrigatória."),
  newPassword: z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres."),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "As novas senhas não coincidem.",
  path: ["confirmNewPassword"],
});

type ChangePasswordFormInputs = z.infer<typeof changePasswordSchema>;

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose, zIndex }) => {
  const { error: authError, updateProfile } = useAuthStore();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSpinnerForced, setShowSpinnerForced] = useState(false);

  const methods = useForm<ChangePasswordFormInputs>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
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
      setSuccessMessage("Senha alterada com sucesso!");
      reset();
    } catch (err) {
      setLocalError(authError || "Falha ao alterar senha.");
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
            <p className="text-feedback-positive text-center text-sm mt-4">
              {successMessage}
            </p>
          )}
          {(localError || authError) && (
            <p className="text-feedback-negative text-center text-sm mt-4">
              {localError || authError}
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
              disabled={isSubmitting}
            >
              {showSpinnerForced ? (
                <>
                  <Spinner /> SALVANDO...
                </>
              ) : (
                "SALVAR SENHA"
              )}
            </button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default ChangePasswordModal;
