import React, { useState } from 'react';
import { X, ExternalLink } from 'lucide-react';

type FooterModalType = 'privacy' | 'disclaimer' | null;

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<FooterModalType>(null);

  return (
    <>
      <footer
        className="w-full mt-auto shrink-0"
        style={{
          backgroundColor: 'var(--bg-header)',
          borderTop: '1px solid var(--border-default)',
        }}
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px]"
          style={{ color: 'var(--text-secondary)' }}
        >
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              Nightingale chatbot
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1.5">
              <a
                href="tel:+914446786539"
                className="hover:underline underline-offset-4 transition-colors flex items-center gap-1"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--brand)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
                </svg>
                +91-44-4678 6539
              </a>
              <span className="hidden sm:inline" style={{ color: 'var(--border-input)' }}>|</span>
              <a
                href="mailto:info@tamilnadunursingcouncil.com"
                className="hover:underline underline-offset-4 transition-colors flex items-center gap-1"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--brand)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4.2l-8 5-8-5V6l8 5 8-5v2.2z" />
                </svg>
                info@tamilnadunursingcouncil.com
              </a>
            </div>
          </div>

          <nav
            aria-label="Institutional footer navigation"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mt-2 md:mt-0"
          >
            <a
              href="https://www.tamilnadunursingcouncil.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap py-0.5"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--brand)'}
              onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)'}
            >
              Official Website
            </a>

            <span className="select-none" style={{ color: 'var(--border-input)' }} aria-hidden="true">
              ·
            </span>

            <button
              type="button"
              onClick={() => setActiveModal('privacy')}
              className="hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap py-0.5 cursor-pointer"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.color = 'var(--brand)'}
              onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'}
            >
              Privacy
            </button>

            <span className="select-none" style={{ color: 'var(--border-input)' }} aria-hidden="true">
              ·
            </span>

            <button
              type="button"
              onClick={() => setActiveModal('disclaimer')}
              className="hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap py-0.5 cursor-pointer"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.color = 'var(--brand)'}
              onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'}
            >
              Disclaimer
            </button>
          </nav>
        </div>
      </footer>

      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="footer-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'var(--bg-overlay)' }}
          onClick={() => setActiveModal(null)}
        >
          <div
            className="w-full max-w-md rounded-[8px] shadow-lg overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-dialog)',
              border: '1px solid var(--border-subtle)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-[3px] w-full" style={{ backgroundColor: 'var(--brand)' }} aria-hidden="true" />
            <div
              className="px-6 py-4 flex items-center justify-between gap-4"
              style={{ borderBottom: '1px solid var(--border-default)' }}
            >
              <h2
                id="footer-modal-title"
                className="text-[16px] font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {activeModal === 'privacy' ? 'Privacy Information' : 'Institutional Disclaimer'}
              </h2>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                aria-label="Close dialog"
                className="p-1.5 rounded-[4px] transition-colors cursor-pointer"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-hover)';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
                }}
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div
              className="p-6 text-[14px] leading-6 space-y-3"
              style={{ color: 'var(--text-secondary)' }}
            >
              {activeModal === 'privacy' ? (
                <p>
                  This authentication interface provides entry to the Tamil Nadu Nurses &amp; Midwives Council (TNNMC) digital services. For complete institutional privacy policies and official council notices, please refer to the official TNNMC website.
                </p>
              ) : (
                <p>
                  This portal serves as the authentication entry point for Tamil Nadu Nurses &amp; Midwives Council digital services. Official notices, circulars, and council resources are published on the official TNNMC website.
                </p>
              )}

              <div className="pt-2">
                <a
                  href="https://www.tamilnadunursingcouncil.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold hover:underline underline-offset-4"
                  style={{ color: 'var(--brand)' }}
                >
                  <span>Visit www.tamilnadunursingcouncil.com</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div
              className="px-6 py-3.5 flex justify-end"
              style={{
                backgroundColor: 'var(--bg-dialog-footer)',
                borderTop: '1px solid var(--border-default)',
              }}
            >
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-[13px] font-semibold rounded-[6px] transition-colors cursor-pointer"
                style={{
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-input)',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
