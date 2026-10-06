export type AuthView = 'login' | 'register' | 'forgot-password';

export type DemoPresetState =
  | 'default'
  | 'empty-errors'
  | 'invalid-email'
  | 'incorrect-password'
  | 'disabled'
  | 'success';

/**
 * Validates whether an identifier is a valid email address or a valid 10-digit Indian mobile number.
 * Returns null if valid, or a clear institutional validation message if invalid.
 */
export function validateIdentifier(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return 'This field is required.';
  }

  // Check if user is entering a mobile number (digits, spaces, +, -)
  const digitsOnly = trimmed.replace(/[\s\-+]/g, '');
  const isNumericAttempt = /^\d+$/.test(digitsOnly) && !trimmed.includes('@');

  if (isNumericAttempt) {
    // Allow 10-digit Indian mobile number or +91 followed by 10 digits
    const normalizedMobile =
      digitsOnly.length === 12 && digitsOnly.startsWith('91')
        ? digitsOnly.slice(2)
        : digitsOnly;

    if (/^[6-9]\d{9}$/.test(normalizedMobile)) {
      return null;
    }
    return 'Please enter a valid 10-digit mobile number or email address.';
  }

  // Otherwise validate as email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address.';
  }

  return null;
}
