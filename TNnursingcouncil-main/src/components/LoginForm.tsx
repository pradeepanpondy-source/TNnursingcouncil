import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { FormField } from './FormField';
import { PasswordField } from './PasswordField';
import { PrimaryButton } from './PrimaryButton';
import { DemoPresetState, validateIdentifier } from '../types/auth';

interface LoginFormProps {
  onNavigateRegister: () => void;
  onNavigateForgotPassword: () => void;
  onLoginSuccess: (identifier: string) => void;
  presetState?: DemoPresetState;
  onClearPreset?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onNavigateRegister,
  onNavigateForgotPassword,
  onLoginSuccess,
  presetState = 'default',
  onClearPreset,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [identifierError, setIdentifierError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [formBannerError, setFormBannerError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Synchronize with optional UI demonstration presets
  useEffect(() => {
    setIsSubmitting(false);
    setIsSuccess(false);
    setIsRedirecting(false);
    setFormBannerError(undefined);

    if (presetState === 'default') {
      setIdentifier('');
      setPassword('');
      setIdentifierError(undefined);
      setPasswordError(undefined);
    } else if (presetState === 'empty-errors') {
      setIdentifier('');
      setPassword('');
      setIdentifierError('This field is required.');
      setPasswordError('This field is required.');
    } else if (presetState === 'invalid-email') {
      setIdentifier('nurse.registry@tnnmc');
      setPassword('••••••••••••');
      setIdentifierError('Please enter a valid email address.');
      setPasswordError(undefined);
    } else if (presetState === 'incorrect-password') {
      setIdentifier('anitha.kumar@tnnmc.org.in');
      setPassword('wrongpass123');
      setIdentifierError(undefined);
      setPasswordError('Please check your password and try again.');
    } else if (presetState === 'disabled') {
      setIdentifier('anitha.kumar@tnnmc.org.in');
      setPassword('Tnnmc@2026');
      setIdentifierError(undefined);
      setPasswordError(undefined);
      setIsSubmitting(true);
    } else if (presetState === 'success') {
      setIdentifier('anitha.kumar@tnnmc.org.in');
      setPassword('Tnnmc@2026');
      setIdentifierError(undefined);
      setPasswordError(undefined);
      setIsSuccess(true);
    }
  }, [presetState]);

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value);
    if (identifierError) setIdentifierError(undefined);
    if (formBannerError) setFormBannerError(undefined);
    onClearPreset?.();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError(undefined);
    if (formBannerError) setFormBannerError(undefined);
    onClearPreset?.();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClearPreset?.();

    const idErr = validateIdentifier(identifier);
    let passErr: string | undefined;

    if (!password) {
      passErr = 'This field is required.';
    } else if (password.length < 6 || password.toLowerCase() === 'wrong') {
      passErr = 'Please check your password and try again.';
    }

    setIdentifierError(idErr || undefined);
    setPasswordError(passErr);

    if (idErr || passErr) {
      return;
    }

    const signedInUser = identifier.trim();

    // Frontend-only mock submission followed by automatic redirect into the portal
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setIsRedirecting(true);
      window.setTimeout(() => {
        onLoginSuccess(signedInUser);
      }, 700);
    }, 500);
  };

  if (isSuccess) {
    const activeUser = identifier.trim() || 'anitha.kumar@tnnmc.org.in';
    return (
      <div
        role="status"
        aria-live="polite"
        className="py-2"
      >
        <div className="p-4 rounded-[6px] bg-[#F0FDF4] border border-[#BBF7D0] flex items-start gap-3 mb-6">
          <CheckCircle2
            className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div>
            <h2 className="text-[15px] font-semibold text-[#14532D] leading-5">
              Sign-in verified
            </h2>
            <p className="text-[14px] text-[#166534] leading-5 mt-1">
              You have signed in as{' '}
              <span className="font-medium break-all">
                {activeUser}
              </span>
              . {isRedirecting ? 'Redirecting to Nightingale chatbot...' : 'You may now proceed to Nightingale chatbot.'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <PrimaryButton
            type="button"
            isLoading={isRedirecting}
            loadingText="Opening Nightingale chatbot..."
            onClick={() => {
              onClearPreset?.();
              onLoginSuccess(activeUser);
            }}
          >
            Continue to Nightingale chatbot
          </PrimaryButton>

          <PrimaryButton
            type="button"
            variant="secondary"
            disabled={isRedirecting}
            onClick={() => {
              setIsSuccess(false);
              setIsRedirecting(false);
              setIdentifier('');
              setPassword('');
              onClearPreset?.();
            }}
          >
            Sign in with a different account
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-[28px] sm:text-[32px] font-extrabold uppercase tracking-tight text-[#1E242B] leading-9">
          WELCOME BACK !
        </h1>
        <p className="mt-2 text-[15px] text-[#5A6573] leading-6">
          Welcome back! Please enter your details.
        </p>
      </div>

      {formBannerError && (
        <div
          role="alert"
          className="mb-5 p-3.5 rounded-[6px] bg-[#F0FDFA] border border-[#CCFBF1] flex items-start gap-2.5 text-[13px] text-[#0F766E] leading-5"
        >
          <AlertCircle className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" aria-hidden="true" />
          <span>{formBannerError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <FormField
          id="login-identifier"
          name="identifier"
          type="text"
          inputMode="email"
          autoComplete="username"
          label="Registered Email / Mobile Number"
          placeholder="Enter email address or 10-digit mobile number"
          value={identifier}
          onChange={handleIdentifierChange}
          error={identifierError}
          disabled={isSubmitting}
          required
        />

        <PasswordField
          id="login-password"
          name="password"
          autoComplete="current-password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
          disabled={isSubmitting}
          onForgotPassword={onNavigateForgotPassword}
          required
        />

        <div className="pt-1">
          <PrimaryButton
            type="submit"
            isLoading={isSubmitting}
            loadingText="Signing in..."
          >
            Sign In
          </PrimaryButton>
        </div>
      </form>

      <div className="mt-6 pt-6 border-t border-[#E2E8F0] text-center">
        <p className="text-[14px] text-[#5A6573] leading-5">
          Do not have a registered account?{' '}
          <button
            type="button"
            onClick={onNavigateRegister}
            disabled={isSubmitting}
            className="font-semibold text-[#2C7A7B] hover:text-[#235F5F] hover:underline underline-offset-4 transition-colors duration-150 disabled:opacity-50 rounded-sm px-1 py-0.5 whitespace-nowrap"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};
