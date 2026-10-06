import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface SuggestionPromptProps {
  prompt: string;
  label?: string;
  onSelect: (prompt: string) => void;
}

export const SuggestionPrompt: React.FC<SuggestionPromptProps> = ({
  prompt,
  onSelect,
}) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(prompt)}
      className="group w-full text-left px-3.5 py-2.5 rounded-[6px] transition-colors duration-150 flex items-center justify-between gap-3 cursor-pointer"
      style={{
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 1px 2px rgba(15,23,42,0.03)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-surface-raised)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-input-hover)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-surface)';
        (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-subtle)';
      }}
    >
      <span
        className="text-[14px] font-normal leading-5 transition-colors duration-150 group-hover:text-[var(--brand)]"
        style={{ color: 'var(--text-primary)' }}
      >
        {prompt}
      </span>
      <ArrowUpRight
        className="w-4 h-4 shrink-0 transition-colors duration-150 group-hover:text-[var(--brand)]"
        style={{ color: 'var(--text-placeholder)' }}
        aria-hidden="true"
      />
    </button>
  );
};
