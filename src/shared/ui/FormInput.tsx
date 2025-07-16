import {
  UseFormRegister,
  FieldValues,
  FieldError,
  Path,
} from "react-hook-form";

interface FormInputProps<TFieldValues extends FieldValues> {
  label: string;
  id: Path<TFieldValues>;
  type: string;
  placeholder: string;
  register: UseFormRegister<TFieldValues>;
  error?: FieldError;
}

export const FormInput = <TFieldValues extends FieldValues>({
  label,
  id,
  type,
  placeholder,
  register,
  error,
}: FormInputProps<TFieldValues>) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-text-secondary mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id)}
        className="w-full bg-surface-2 p-2 rounded-sm border border-surface-3 focus:outline-none focus:ring-2 focus:ring-accent-secondary transition-all"
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};
