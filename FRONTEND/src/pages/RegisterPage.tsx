// src/pages/RegisterPage.tsx

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { RegisterFormInputs, registerSchema } from '@/features/auth/model/authSchemas';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useAuthFormServerErrors } from '@/features/auth/model/hooks/useAuthFormServerErrors';
import { useAuthModalStore } from '@/features/modalManager/model/authModalStore';
import { AppButton } from '@/shared/ui/AppButton';
import { FormInput } from '@/shared/ui/FormInput';
import { MotionLink } from '@/shared/ui/MotionLink';
import { StatusAlert } from '@/shared/ui/StatusAlert';
import { AuthModalManager } from '@/widgets/authModalManager/ui/AuthModalManager';
import { AuthPageLayout } from '@/widgets/authPageLayout/ui/AuthPageLayout';

export default function RegisterPage() {
  const methods = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const {
    register: registerField, // Renamed to avoid conflict with auth store's register
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  const { register, user, isLoading, authError, clearAuthError } = useAuthStore();
  const { openModal } = useAuthModalStore();
  const navigate = useNavigate();

  useEffect(() => {
    clearAuthError();
    clearErrors();
  }, [clearAuthError, clearErrors]);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useAuthFormServerErrors<RegisterFormInputs>({
    authError,
    setError,
    allowedFields: ['name', 'email', 'password'],
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    clearAuthError();
    clearErrors();
    await register(data);
  };

  return (
    <AuthPageLayout title="CRIAR CONTA" subtitle="Sua aventura começa aqui" squareDirection="right">
      <FormProvider {...methods}>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <FormInput<RegisterFormInputs>
            label="Nome"
            id="name"
            type="text"
            placeholder="Seu nome de usuário"
            register={registerField}
            error={errors.name}
          />

          <FormInput<RegisterFormInputs>
            label="Email"
            id="email"
            type="email"
            placeholder="seu-email@dominio.com"
            register={registerField}
            error={errors.email}
          />

          <FormInput<RegisterFormInputs>
            label="Senha"
            id="password"
            type="password"
            placeholder="••••••••"
            register={registerField}
            error={errors.password}
          />

          <FormInput<RegisterFormInputs>
            label="Confirmar Senha"
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            register={registerField}
            error={errors.confirmPassword}
          />

          <div className="flex-col">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                {...registerField('terms')}
                className="h-4 w-4 rounded border-surface-3 bg-surface-3 text-accent-primary focus:ring-accent-secondary"
              />
              <label htmlFor="terms" className="text-sm text-text-secondary">
                Eu li e aceito os{' '}
                <motion.button
                  type="button"
                  onClick={() =>
                    openModal('termsOfServiceModal', {
                      content: 'Depois haverão termos de serviço aqui',
                    })
                  }
                  className="text-accent-secondary underline hover:text-accent-secondary-hover"
                >
                  Termos de Serviço
                </motion.button>
              </label>
            </div>
            {errors.terms && (
              <p className="mt-1 text-xs text-feedback-negative">
                {errors.terms.message}
              </p>
            )}
          </div>

          <div className="pt-4">
            <AppButton
              type="submit"
              fullWidth
              variant="primary"
              className="iceberg-regular border-b-3 border-text-primary px-8 py-3 text-2xl font-bold shadow-lg hover:scale-105"
              isLoading={isLoading}
              loadingText="REGISTRANDO..."
            >
              REGISTRAR
            </AppButton>
          </div>
          {authError?.formError && (
            <StatusAlert tone="error" className="mt-4 text-center">
              {authError.formError}
            </StatusAlert>
          )}
        </form>
      </FormProvider>

      <p className="mt-8 text-center text-sm text-text-secondary">
        Já tem uma conta?{' '}
        <MotionLink
          to="/login"
          className="font-semibold text-accent-secondary hover:underline"
        >
          Faça Login
        </MotionLink>
      </p>
      <AuthModalManager />
    </AuthPageLayout>
  );
}
