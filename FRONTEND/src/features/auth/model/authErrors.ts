export type AuthErrorCode =
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'CONFLICT'
  | 'NOT_IMPLEMENTED'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

export type AuthErrorState = {
  code: AuthErrorCode;
  formError: string;
  fieldErrors: Record<string, string>;
};

export class AuthError extends Error {
  code: AuthErrorCode;
  fieldErrors: Record<string, string>;

  constructor({ code, formError, fieldErrors = {} }: AuthErrorState) {
    super(formError);
    this.name = 'AuthError';
    this.code = code;
    this.fieldErrors = fieldErrors;
  }

  toState(): AuthErrorState {
    return {
      code: this.code,
      formError: this.message,
      fieldErrors: this.fieldErrors,
    };
  }
}

export const buildAuthError = (params: AuthErrorState) => new AuthError(params);

export const normalizeAuthError = (
  error: unknown,
  fallbackMessage: string,
  fallbackCode: AuthErrorCode = 'UNKNOWN_ERROR',
): AuthErrorState => {
  if (error instanceof AuthError) {
    return error.toState();
  }

  if (error instanceof Error) {
    return {
      code: fallbackCode,
      formError: error.message || fallbackMessage,
      fieldErrors: {},
    };
  }

  return {
    code: fallbackCode,
    formError: fallbackMessage,
    fieldErrors: {},
  };
};
