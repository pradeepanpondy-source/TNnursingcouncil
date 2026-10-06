import React from 'react';
import { Loader2 } from 'lucide-react';

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  variant = 'primary',
  isLoading = false,
  loadingText,
  disabled,
  className = '',
  children,
  ...buttonProps
}) => {
  const isDisabled = disabled || isLoading;

  const baseClasses =
    'w-full h-11 px-4 py-2.5 inline-flex items-center justify-center gap-2 text-[15px] font-semibold leading-5 rounded-[6px] transition-colors duration-150 whitespace-nowrap select-none cursor-pointer disabled:cursor-not-allowed';

  const variantClasses =
    variant === 'primary'
      ? 'bg-[#2C7A7B] text-white hover:bg-[#286A6B] active:bg-[#1F5050] disabled:bg-[#2C7A7B]/50 disabled:text-white/90 shadow-[0_1px_2px_rgba(15,23,42,0.08)]'
      : 'bg-white text-[#1E242B] border border-[#CBD5E1] hover:bg-[#F8FAFC] hover:border-[#94A3B8] active:bg-[#F1F5F9] disabled:bg-[#F8FAFC] disabled:text-[#94A3B8] disabled:border-[#E2E8F0]';

  return (
    <button
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...buttonProps}
    >
      {isLoading && (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
      )}
      <span>{isLoading && loadingText ? loadingText : children}</span>
    </button>
  );
};
