/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AuthLayout } from './components/AuthLayout';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { ChatLayout } from './components/chat/ChatLayout';
import { AuthView, DemoPresetState } from './types/auth';

interface AuthenticatedSession {
  identifier: string;
  fullName?: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [presetState, setPresetState] = useState<DemoPresetState>('default');
  const [session, setSession] = useState<AuthenticatedSession | null>(null);

  const handleNavigate = (view: AuthView) => {
    setCurrentView(view);
    setPresetState('default');
  };

  if (session) {
    return (
      <ChatLayout
        userIdentifier={session.identifier}
        userName={session.fullName}
        onSignOut={() => {
          setSession(null);
          setCurrentView('login');
          setPresetState('default');
        }}
      />
    );
  }

  return (
    <AuthLayout
      currentView={currentView}
      onSelectView={handleNavigate}
      presetState={presetState}
      onSelectPreset={setPresetState}
    >
      {currentView === 'login' && (
        <LoginForm
          onNavigateRegister={() => handleNavigate('register')}
          onNavigateForgotPassword={() => handleNavigate('forgot-password')}
          onLoginSuccess={(identifier) => {
            setSession({ identifier });
          }}
          presetState={presetState}
          onClearPreset={() => {
            if (presetState !== 'default') {
              setPresetState('default');
            }
          }}
        />
      )}

      {currentView === 'register' && (
        <RegisterForm
          onNavigateLogin={() => handleNavigate('login')}
          onRegisterSuccess={(identifier, fullName) => {
            setSession({ identifier, fullName });
          }}
          presetState={presetState}
          onClearPreset={() => {
            if (presetState !== 'default') {
              setPresetState('default');
            }
          }}
        />
      )}

      {currentView === 'forgot-password' && (
        <ForgotPasswordForm
          onNavigateLogin={() => handleNavigate('login')}
          presetState={presetState}
          onClearPreset={() => {
            if (presetState !== 'default') {
              setPresetState('default');
            }
          }}
        />
      )}
    </AuthLayout>
  );
}
