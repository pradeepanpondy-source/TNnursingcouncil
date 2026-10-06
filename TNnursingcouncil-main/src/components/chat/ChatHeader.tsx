import React from 'react';
import { PanelLeft } from 'lucide-react';


export interface ChatHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  userName: string;
  userEmail: string;
  avatarUrl?: string;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  onSignOut: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  isSidebarOpen,
  onToggleSidebar,
}) => {
  return (
    <header
      className="w-full shrink-0"
      style={{
        backgroundColor: 'var(--bg-header)',
        borderBottom: '1px solid var(--border-default)',
      }}
    >
      {/* Restrained 3px institutional brand top bar */}
      <div
        className="h-[3px] w-full"
        style={{ backgroundColor: 'var(--brand)' }}
        aria-hidden="true"
      />

      <div className="px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Sidebar Toggle + Product Title */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <button
            type="button"
            onClick={onToggleSidebar}
            aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            className="h-9 w-9 inline-flex items-center justify-center rounded-[6px] transition-colors duration-150 shrink-0 cursor-pointer"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-hover)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
            }}
          >
            <PanelLeft className="w-4 h-4" aria-hidden="true" />
          </button>

          <div className="min-w-0">
            <span
              className="block text-[16px] sm:text-[18px] lg:text-[20px] font-extrabold truncate leading-snug"
              style={{
                color: 'var(--text-header-title)',
                fontFamily: "'Libre Baskerville', Georgia, Cambria, serif",
              }}
            >
              Nightingale chatbot
            </span>
          </div>
        </div>

        {/* Right area (reserved for future controls) */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0" />
      </div>
    </header>
  );
};
