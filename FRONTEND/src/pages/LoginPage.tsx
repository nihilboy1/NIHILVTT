import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { LoginFormInputs, loginSchema } from '@/features/auth/model/authSchemas';
import { useAuthStore } from '@/features/auth/model/authStore';
import { useAuthFormServerErrors } from '@/features/auth/model/hooks/useAuthFormServerErrors';
import { AppButton } from '@/shared/ui/AppButton';
import { FormInput } from '@/shared/ui/FormInput';
import { MotionLink } from '@/shared/ui/MotionLink';
import { StatusAlert } from '@/shared/ui/StatusAlert';
import { AuthPageLayout } from '@/widgets/authPageLayout/ui/AuthPageLayout';

export default function LoginPage() {
  const methods = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register: registerField, // Renamed to avoid conflict with auth store's register
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  const { login, user, isLoading, authError, clearAuthError } = useAuthStore();
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

  useAuthFormServerErrors<LoginFormInputs>({
    authError,
    setError,
    allowedFields: ['email', 'password'],
  });

  const onSubmit = async (data: LoginFormInputs) => {
    clearAuthError();
    clearErrors();
    await login(data);
  };

  return (
    <AuthPageLayout title="FAZER LOGIN" subtitle="Bem-vindo de volta" squareDirection="left">
      <FormProvider {...methods}>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <FormInput<LoginFormInputs>
            label="Email"
            id="email"
            type="email"
            placeholder="seu-email@dominio.com"
            register={registerField}
            error={errors.email}
          />

          <FormInput<LoginFormInputs>
            label="Senha"
            id="password"
            type="password"
            placeholder="••••••••"
            register={registerField}
            error={errors.password}
          />

          <div className="pt-4">
            <AppButton
              type="submit"
              fullWidth
              variant="primary"
              className="iceberg-regular border-b-3 border-text-primary px-8 py-3 text-2xl font-bold shadow-lg hover:scale-105"
              isLoading={isLoading}
              loadingText="ENTRANDO..."
            >
              ENTRAR
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
        Não tem uma conta?{' '}
        <MotionLink
          to="/register"
          className="font-semibold text-accent-secondary hover:underline"
        >
          Crie uma conta
        </MotionLink>
      </p>
    </AuthPageLayout>
  );
}
