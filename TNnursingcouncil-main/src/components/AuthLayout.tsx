import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AuthView, DemoPresetState } from '../types/auth';

interface AuthLayoutProps {
  children: React.ReactNode;
  currentView: AuthView;
  onSelectView: (view: AuthView) => void;
  presetState: DemoPresetState;
  onSelectPreset: (preset: DemoPresetState) => void;
}

const PRESET_OPTIONS: { id: DemoPresetState; label: string }[] = [
  { id: 'default', label: 'Default' },
  { id: 'empty-errors', label: 'Required Error' },
  { id: 'invalid-email', label: 'Invalid Email' },
  { id: 'incorrect-password', label: 'Password Error' },
  { id: 'disabled', label: 'Disabled / Loading' },
  { id: 'success', label: 'Success' },
];

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  currentView,
  onSelectView,
  presetState,
  onSelectPreset,
}) => {
  const [showDemoControls, setShowDemoControls] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-[#1E242B]">
      <Header
        onNavigateHome={() => {
          onSelectView('login');
          onSelectPreset('default');
        }}
      />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#1B2A2F]">
        <div className="w-full max-w-[960px] bg-white rounded-[20px] shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10">
          
          {/* Left Visual Panel */}
          <div className="hidden md:flex md:w-[45%] relative bg-[#1B2A2F] text-white p-10 flex-col justify-between min-h-[560px]">
            {/* Illustration fills the panel */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-l-[20px]">
               <img
                 src="/tnnmc-illustration.jpg"
                 alt="Nightingale chatbot Healthcare Illustration"
                 className="w-full h-full object-cover object-center"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A2A]/80 via-transparent to-[#0F2A2A]/20" />
            </div>
            <div className="relative z-10">
              <div className="font-bold text-lg tracking-wide uppercase drop-shadow">Nightingale chatbot</div>
            </div>
            <div className="relative z-10">
              <h2 className="text-[28px] lg:text-[34px] font-bold leading-tight mb-3 tracking-tight uppercase drop-shadow">
                TRUSTED<br/>HEALTHCARE<br/>PROFESSIONALS
              </h2>
              <p className="text-[13px] lg:text-[14px] text-gray-200 mb-6 max-w-sm leading-relaxed">
                Access your digital service dashboard, verify your registry, and manage your continuing nursing education profile.
              </p>
              <p className="text-[13px] lg:text-[14px] font-medium text-gray-100">Your professional journey, simplified.</p>
            </div>
          </div>

          {/* Right Auth Panel */}
          <div className="w-full md:w-[55%] p-6 sm:p-10 lg:p-12 flex flex-col items-center justify-center bg-white relative">
            <div className="w-full max-w-[380px]">
              {children}
            </div>

            {/* Discreet Frontend UI State Preview Switcher for Review/Demonstration */}
            <div className="mt-8 flex flex-col items-center w-full max-w-[380px]">
              <button
                type="button"
                onClick={() => setShowDemoControls((prev) => !prev)}
                aria-expanded={showDemoControls}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium text-[#64748B] hover:text-[#1E242B] bg-white/80 hover:bg-white border border-[#E2E8F0] rounded-[6px] transition-colors duration-150 cursor-pointer whitespace-nowrap"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#2C7A7B]" aria-hidden="true" />
                <span>UI Demonstration States</span>
                {showDemoControls ? (
                  <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                )}
              </button>

              {showDemoControls && (
                <div
                  aria-label="UI demonstration controls"
                  className="mt-3 w-full p-4 bg-white border border-[#DCE1E7] rounded-[6px] space-y-3 text-left"
                >
                  <div>
                    <div className="text-[11px] font-semibold text-[#64748B] mb-1.5">
                      Screen View
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(
                        [
                          { id: 'login', label: 'Sign In' },
                          { id: 'register', label: 'Create Account' },
                          { id: 'forgot-password', label: 'Reset Password' },
                        ] as const
                      ).map((view) => (
                        <button
                          key={view.id}
                          type="button"
                          onClick={() => {
                            onSelectView(view.id);
                            onSelectPreset('default');
                          }}
                          className={`px-2.5 py-1.5 text-[12px] font-medium rounded-[4px] border transition-colors whitespace-nowrap truncate cursor-pointer ${
                            currentView === view.id
                              ? 'bg-[#2C7A7B] text-white border-[#2C7A7B]'
                              : 'bg-[#F8FAFC] text-[#334155] border-[#E2E8F0] hover:bg-[#F1F5F9]'
                          }`}
                        >
                          {view.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-[11px] font-semibold text-[#64748B] mb-1.5">
                      Interaction State
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {PRESET_OPTIONS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => onSelectPreset(preset.id)}
                          className={`px-2.5 py-1 text-[12px] font-medium rounded-[4px] border transition-colors whitespace-nowrap cursor-pointer ${
                            presetState === preset.id
                              ? 'bg-[#1E242B] text-white border-[#1E242B]'
                              : 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0] hover:bg-[#F1F5F9]'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
