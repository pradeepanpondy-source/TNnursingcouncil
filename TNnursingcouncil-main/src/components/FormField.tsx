import React from 'react';
import { AlertCircle } from 'lucide-react';

export interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  hint?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  error,
  hint,
  disabled,
  className = '',
  ...inputProps
}) => {
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
      <label
        htmlFor={id}
        className="block text-[14px] font-medium text-[#1E242B] leading-5 mb-2"
      >
        {label}
      </label>

      <input
        id={id}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`w-full h-11 px-3.5 py-2.5 text-[16px] sm:text-[15px] leading-5 text-[#1E242B] bg-white rounded-[6px] border transition-colors duration-150 placeholder:text-[#8893A2] focus:outline-none ${
          error
            ? 'border-[#0F766E] bg-[#F0FDFA]/30 focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15'
            : 'border-[#CBD5E1] hover:border-[#94A3B8] focus:border-[#2C7A7B] focus:ring-2 focus:ring-[#2C7A7B]/15'
        } disabled:bg-[#F1F5F9] disabled:text-[#64748B] disabled:border-[#E2E8F0] disabled:cursor-not-allowed ${className}`}
        {...inputProps}
      />

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
