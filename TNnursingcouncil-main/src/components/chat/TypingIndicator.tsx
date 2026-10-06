import React from 'react';
import { TnnmcEmblem } from '../TnnmcEmblem';

export const TypingIndicator: React.FC = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Nightingale chatbot is responding"
      className="w-full py-3"
    >
      <div className="max-w-[780px] mx-auto flex items-start gap-3.5">
        <div className="mt-0.5 shrink-0">
          <TnnmcEmblem size={28} className="w-7 h-7" />
        </div>

        <div className="flex flex-col">
          <span
            className="text-[13px] font-semibold leading-5 mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            Nightingale chatbot
          </span>
          <div className="inline-flex items-center gap-1.5 py-2 px-1" aria-hidden="true">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--brand)', opacity: 0.8 }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--brand)', opacity: 0.6, animationDelay: '180ms' }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: 'var(--brand)', opacity: 0.4, animationDelay: '360ms' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
