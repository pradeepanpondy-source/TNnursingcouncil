import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { FormField } from './FormField';
import { PrimaryButton } from './PrimaryButton';
import { DemoPresetState, validateIdentifier } from '../types/auth';

interface ForgotPasswordFormProps {
  onNavigateLogin: () => void;
  presetState?: DemoPresetState;
  onClearPreset?: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onNavigateLogin,
  presetState = 'default',
  onClearPreset,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [identifierError, setIdentifierError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Synchronize with optional UI demonstration presets
  useEffect(() => {
    setIsSubmitting(false);
    setIsSubmitted(false);

    if (presetState === 'default') {
      setIdentifier('');
      setIdentifierError(undefined);
    } else if (presetState === 'empty-errors') {
      setIdentifier('');
      setIdentifierError('This field is required.');
    } else if (presetState === 'invalid-email') {
      setIdentifier('nurse.account@invalid');
      setIdentifierError('Please enter a valid email address.');
    } else if (presetState === 'incorrect-password') {
      setIdentifier('');
      setIdentifierError('This field is required.');
    } else if (presetState === 'disabled') {
      setIdentifier('anitha.kumar@tnnmc.org.in');
      setIdentifierError(undefined);
      setIsSubmitting(true);
    } else if (presetState === 'success') {
      setIdentifier('anitha.kumar@tnnmc.org.in');
      setIdentifierError(undefined);
      setIsSubmitted(true);
    }
  }, [presetState]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClearPreset?.();

    const idErr = validateIdentifier(identifier);
    if (idErr) {
      setIdentifierError(idErr);
      return;
    }

    setIdentifierError(undefined);
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div role="status" aria-live="polite" className="py-2">
        <div className="p-4 rounded-[6px] bg-[#F0FDF4] border border-[#BBF7D0] flex items-start gap-3 mb-6">
          <CheckCircle2
            className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <h2 className="text-[15px] font-semibold text-[#14532D] leading-5">
              Password reset request recorded
            </h2>
            <p className="text-[14px] text-[#166534] leading-5 mt-1">
              If an account is associated with{' '}
              <span className="font-medium break-all">
                {identifier || 'anitha.kumar@tnnmc.org.in'}
              </span>
              , instructions to reset your password will be provided for that registered contact.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <PrimaryButton type="button" onClick={onNavigateLogin}>
            Back to Sign In
          </PrimaryButton>

          <PrimaryButton
            type="button"
            variant="secondary"
            onClick={() => {
              setIsSubmitted(false);
              setIdentifier('');
              onClearPreset?.();
            }}
          >
            Enter a different email or mobile number
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[24px] sm:text-[26px] font-semibold tracking-[-0.015em] text-[#1E242B] leading-8">
          Reset your password
        </h1>
        <p className="mt-1.5 text-[15px] text-[#5A6573] leading-6">
          Enter your registered email or mobile number to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          id="reset-identifier"
          name="identifier"
          type="text"
          inputMode="email"
          autoComplete="username"
          label="Email / Mobile Number"
          placeholder="Enter registered email address or mobile number"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value);
            if (identifierError) setIdentifierError(undefined);
            onClearPreset?.();
          }}
          error={identifierError}
          disabled={isSubmitting}
          required
        />

        <div className="pt-1">
          <PrimaryButton
            type="submit"
            isLoading={isSubmitting}
            loadingText="Processing..."
          >
            Continue
          </PrimaryButton>
        </div>
      </form>

      <div className="mt-6 pt-6 border-t border-[#E2E8F0] text-center">
        <button
          type="button"
          onClick={onNavigateLogin}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-1.5 text-[14px] font-semibold text-[#475569] hover:text-[#2C7A7B] transition-colors duration-150 disabled:opacity-50 rounded-sm px-2 py-1 whitespace-nowrap"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Back to Sign In</span>
        </button>
      </div>
    </div>
  );
};
