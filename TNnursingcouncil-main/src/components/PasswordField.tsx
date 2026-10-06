import React, { useState } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

export interface PasswordFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  onForgotPassword?: () => void;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  id,
  label,
  error,
  hint,
  disabled,
  onForgotPassword,
  className = '',
  ...inputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const describedBy = [
    error ? errorId : null,
    !error && hint ? hintId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 mb-2">
        <label
          htmlFor={id}
          className="block text-[14px] font-medium text-[#1E242B] leading-5"
        >
          {label}
        </label>

        {onForgotPassword && (
          <button
            type="button"
            onClick={onForgotPassword}
            disabled={disabled}
            className="text-[13px] font-medium text-[#2C7A7B] hover:text-[#235F5F] hover:underline underline-offset-4 transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none rounded-sm py-0.5 px-1 -mr-1 whitespace-nowrap"
          >
            Forgot Password?
          </button>
        )}
      </div>

      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`w-full h-11 pl-3.5 pr-20 py-2.5 text-[16px] sm:text-[15px] leading-5 text-[#1E242B] bg-white rounded-[6px] border transition-colors duration-150 placeholder:text-[#8893A2] focus:outline-none ${
            error
              ? 'border-[#0F766E] bg-[#F0FDFA]/30 focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15'
              : 'border-[#CBD5E1] hover:border-[#94A3B8] focus:border-[#2C7A7B] focus:ring-2 focus:ring-[#2C7A7B]/15'
          } disabled:bg-[#F1F5F9] disabled:text-[#64748B] disabled:border-[#E2E8F0] disabled:cursor-not-allowed ${className}`}
          {...inputProps}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          aria-pressed={showPassword}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 px-2.5 inline-flex items-center gap-1.5 text-[12px] font-medium text-[#475569] hover:text-[#1E242B] hover:bg-[#F1F5F9] active:bg-[#E2E8F0] rounded-[4px] transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap"
        >
          {showPassword ? (
            <>
              <EyeOff className="w-3.5 h-3.5 text-[#5A6573]" aria-hidden="true" />
              <span>Hide</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5 text-[#5A6573]" aria-hidden="true" />
              <span>Show</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div
          id={errorId}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-[13px] leading-4 text-[#0F766E]"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      {!error && hint && (
        <p id={hintId} className="mt-1.5 text-[13px] leading-4 text-[#5A6573]">
          {hint}
        </p>
      )}
    </div>
  );
};
