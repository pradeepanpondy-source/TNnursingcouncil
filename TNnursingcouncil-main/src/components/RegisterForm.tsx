import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FormField } from './FormField';
import { PasswordField } from './PasswordField';
import { PrimaryButton } from './PrimaryButton';
import { DemoPresetState, validateIdentifier } from '../types/auth';

interface RegisterFormProps {
  onNavigateLogin: () => void;
  onRegisterSuccess?: (identifier: string, fullName: string) => void;
  presetState?: DemoPresetState;
  onClearPreset?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onNavigateLogin,
  onRegisterSuccess,
  presetState = 'default',
  onClearPreset,
}) => {
  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fullNameError, setFullNameError] = useState<string | undefined>();
  const [identifierError, setIdentifierError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | undefined>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Synchronize with optional UI demonstration presets
  useEffect(() => {
    setIsSubmitting(false);
    setIsSuccess(false);

    if (presetState === 'default') {
      setFullName('');
      setIdentifier('');
      setPassword('');
      setConfirmPassword('');
      setFullNameError(undefined);
      setIdentifierError(undefined);
      setPasswordError(undefined);
      setConfirmPasswordError(undefined);
    } else if (presetState === 'empty-errors') {
      setFullName('');
      setIdentifier('');
      setPassword('');
      setConfirmPassword('');
      setFullNameError('This field is required.');
      setIdentifierError('This field is required.');
      setPasswordError('This field is required.');
      setConfirmPasswordError('This field is required.');
    } else if (presetState === 'invalid-email') {
      setFullName('S.Kavitha');
      setIdentifier('kavitha.nurse@invalid');
      setPassword('Tnnmc@2026');
      setConfirmPassword('Tnnmc@2026');
      setFullNameError(undefined);
      setIdentifierError('Please enter a valid email address.');
      setPasswordError(undefined);
      setConfirmPasswordError(undefined);
    } else if (presetState === 'incorrect-password') {
      setFullName('S. Kavitha');
      setIdentifier('kavitha.s@tnnmc.org.in');
      setPassword('Tnnmc@2026');
      setConfirmPassword('Tnnmc@2025');
      setFullNameError(undefined);
      setIdentifierError(undefined);
      setPasswordError(undefined);
      setConfirmPasswordError('Passwords do not match. Please check your password and try again.');
    } else if (presetState === 'disabled') {
      setFullName('S. Kavitha');
      setIdentifier('kavitha.s@tnnmc.org.in');
      setPassword('Tnnmc@2026');
      setConfirmPassword('Tnnmc@2026');
      setFullNameError(undefined);
      setIdentifierError(undefined);
      setPasswordError(undefined);
      setConfirmPasswordError(undefined);
      setIsSubmitting(true);
    } else if (presetState === 'success') {
      setFullName('S. Kavitha');
      setIdentifier('kavitha.s@tnnmc.org.in');
      setPassword('Tnnmc@2026');
      setConfirmPassword('Tnnmc@2026');
      setFullNameError(undefined);
      setIdentifierError(undefined);
      setPasswordError(undefined);
      setConfirmPasswordError(undefined);
      setIsSuccess(true);
    }
  }, [presetState]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClearPreset?.();

    const trimmedName = fullName.trim();
    const nameErr = !trimmedName ? 'This field is required.' : undefined;
    const idErr = validateIdentifier(identifier) || undefined;

    let passErr: string | undefined;
    if (!password) {
      passErr = 'This field is required.';
    } else if (password.length < 8) {
      passErr = 'Password must be at least 8 characters long.';
    }

    let confirmErr: string | undefined;
    if (!confirmPassword) {
      confirmErr = 'This field is required.';
    } else if (password && confirmPassword !== password) {
      confirmErr = 'Passwords do not match. Please check your password and try again.';
    }

    setFullNameError(nameErr);
    setIdentifierError(idErr);
    setPasswordError(passErr);
    setConfirmPasswordError(confirmErr);

    if (nameErr || idErr || passErr || confirmErr) {
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 650);
  };

  if (isSuccess) {
    const activeIdentifier = identifier.trim() || 'kavitha.s@tnnmc.org.in';
    const activeName = fullName.trim() || 'S. Kavitha';
    return (
      <div role="status" aria-live="polite" className="py-2">
        <div className="p-4 rounded-[6px] bg-[#F0FDF4] border border-[#BBF7D0] flex items-start gap-3 mb-6">
          <CheckCircle2
            className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <h2 className="text-[15px] font-semibold text-[#14532D] leading-5">
              Account created
            </h2>
            <p className="text-[14px] text-[#166534] leading-5 mt-1">
              Your account profile for{' '}
              <span className="font-medium">
                {activeName}
              </span>{' '}
              has been prepared. You may now proceed to Nightingale chatbot.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {onRegisterSuccess && (
            <PrimaryButton
              type="button"
              onClick={() => onRegisterSuccess(activeIdentifier, activeName)}
            >
              Continue to Nightingale chatbot
            </PrimaryButton>
          )}

          <PrimaryButton
            type="button"
            variant={onRegisterSuccess ? 'secondary' : 'primary'}
            onClick={onNavigateLogin}
          >
            Proceed to Sign In
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[24px] sm:text-[26px] font-semibold tracking-[-0.015em] text-[#1E242B] leading-8">
          Create Account
        </h1>
        <p className="mt-1.5 text-[15px] text-[#5A6573] leading-6">
          Enter your details below to create an account for Nightingale chatbot.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          id="register-full-name"
          name="fullName"
          type="text"
          autoComplete="name"
          label="Full Name"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            if (fullNameError) setFullNameError(undefined);
            onClearPreset?.();
          }}
          error={fullNameError}
          disabled={isSubmitting}
          required
        />

        <FormField
          id="register-identifier"
          name="identifier"
          type="text"
          inputMode="email"
          autoComplete="username"
          label="Email / Mobile Number"
          placeholder="Enter email address or 10-digit mobile number"
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

        <PasswordField
          id="register-password"
          name="password"
          autoComplete="new-password"
          label="Password"
          placeholder="Create a password (minimum 8 characters)"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError(undefined);
            onClearPreset?.();
          }}
          error={passwordError}
          hint="Use at least 8 characters."
          disabled={isSubmitting}
          required
        />

        <PasswordField
          id="register-confirm-password"
          name="confirmPassword"
          autoComplete="new-password"
          label="Confirm Password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (confirmPasswordError) setConfirmPasswordError(undefined);
            onClearPreset?.();
          }}
          error={confirmPasswordError}
          disabled={isSubmitting}
          required
        />

        <div className="pt-1">
          <PrimaryButton
            type="submit"
            isLoading={isSubmitting}
            loadingText="Creating account..."
          >
            Create Account
          </PrimaryButton>
        </div>
      </form>

      <div className="mt-6 pt-6 border-t border-[#E2E8F0] text-center">
        <p className="text-[14px] text-[#5A6573] leading-5">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onNavigateLogin}
            disabled={isSubmitting}
            className="font-semibold text-[#2C7A7B] hover:text-[#235F5F] hover:underline underline-offset-4 transition-colors duration-150 disabled:opacity-50 rounded-sm px-1 py-0.5 whitespace-nowrap"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};
