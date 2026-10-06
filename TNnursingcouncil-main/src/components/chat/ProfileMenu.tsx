import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';

export interface ProfileMenuProps {
  userName: string;
  userEmail: string;
  avatarUrl?: string;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  onSignOut: () => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  userName,
  userEmail,
  avatarUrl,
  onOpenProfile,
  onOpenSettings,
  onOpenHelp,
  onSignOut,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const initials =
    userName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('') || 'TN';

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="User profile menu"
        className="h-9 w-9 rounded-[6px] bg-white hover:bg-[#F8FAFC] active:bg-[#F1F5F9] border border-[#CBD5E1] flex items-center justify-center text-[13px] font-semibold text-[#2C7A7B] overflow-hidden transition-colors duration-150 cursor-pointer"
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={userName}
            className="w-full h-full object-cover"
          />
        ) : initials ? (
          <span>{initials}</span>
        ) : (
          <User className="w-4 h-4 text-[#475569]" aria-hidden="true" />
        )}
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="User account options"
          className="absolute right-0 mt-2 w-64 bg-white border border-[#DCE1E7] rounded-[8px] shadow-[0_4px_12px_rgba(15,23,42,0.08)] overflow-hidden z-40"
        >
          <div className="h-[2px] w-full bg-[#2C7A7B]" aria-hidden="true" />

          <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#FAFBFD] flex items-center gap-3">
            <div className="h-9 w-9 rounded-[6px] bg-white border border-[#CBD5E1] flex items-center justify-center text-[12px] font-semibold text-[#2C7A7B] overflow-hidden shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-[#1E242B] truncate leading-5">
                {userName}
              </p>
              <p className="text-[12px] text-[#5A6573] truncate leading-4 mt-0.5">
                {userEmail}
              </p>
            </div>
          </div>

          <div className="py-1.5">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onOpenProfile();
              }}
              className="w-full px-4 py-2 text-left text-[14px] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#1E242B] flex items-center gap-2.5 transition-colors duration-150 cursor-pointer"
            >
              <User className="w-4 h-4 text-[#5A6573]" aria-hidden="true" />
              <span>Profile</span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onOpenSettings();
              }}
              className="w-full px-4 py-2 text-left text-[14px] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#1E242B] flex items-center gap-2.5 transition-colors duration-150 cursor-pointer"
            >
              <Settings className="w-4 h-4 text-[#5A6573]" aria-hidden="true" />
              <span>Settings</span>
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onOpenHelp();
              }}
              className="w-full px-4 py-2 text-left text-[14px] text-[#334155] hover:bg-[#F8FAFC] hover:text-[#1E242B] flex items-center gap-2.5 transition-colors duration-150 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#5A6573]" aria-hidden="true" />
              <span>Help</span>
            </button>
          </div>

          <div className="border-t border-[#E2E8F0] py-1.5">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                onSignOut();
              }}
              className="w-full px-4 py-2 text-left text-[14px] font-medium text-[#2C7A7B] hover:bg-[#F0FDFA]/60 flex items-center gap-2.5 transition-colors duration-150 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-[#2C7A7B]" aria-hidden="true" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
