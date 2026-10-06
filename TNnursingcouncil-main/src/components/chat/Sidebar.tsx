import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Plus,
  MessageSquare,
  HelpCircle,
  Settings,
  User,
  LogOut,
  X,
  MoreHorizontal,
  Share2,
  Pin,
  PinOff,
  Pencil,
  BookPlus,
  Trash2,
  Search,
  Link,
  CheckCheck,
  BookOpen,
} from 'lucide-react';
import { TnnmcEmblem } from '../TnnmcEmblem';
import { Conversation } from '../../types/chat';

export interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation?: (id: string) => void;
  onRenameConversation?: (id: string, newTitle: string) => void;
  onNewChat: () => void;
  isDesktopCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  userName: string;
  userEmail: string;
  avatarUrl?: string;
  onOpenProfile: () => void;
  onOpenHelp: () => void;
  onOpenSettings: () => void;
  onSignOut: () => void;
}

const MOCK_NOTEBOOKS = [
  { id: 'nb-1', label: 'Registration Resources' },
  { id: 'nb-2', label: 'Nursing Council Notes' },
  { id: 'nb-3', label: 'Professional Development' },
];

// ─── Context Menu ──────────────────────────────────────────────────────────────
interface ContextMenuProps {
  convId: string;
  convTitle: string;
  isPinned: boolean;
  onClose: () => void;
  onShare: () => void;
  onPin: () => void;
  onRename: () => void;
  onAddToNotebook: () => void;
  onDelete: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  convTitle,
  isPinned,
  onClose,
  onShare,
  onPin,
  onRename,
  onAddToNotebook,
  onDelete,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const items = [
    { icon: Share2, label: 'Share conversation', action: onShare },
    { icon: isPinned ? PinOff : Pin, label: isPinned ? 'Unpin' : 'Pin', action: onPin },
    { icon: Pencil, label: 'Rename', action: onRename },
    { icon: BookPlus, label: 'Add to notebook', action: onAddToNotebook },
  ];

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label={`Options for ${convTitle}`}
      className="absolute right-0 top-8 z-50 w-[184px] rounded-[8px] py-1 overflow-hidden shadow-lg"
      style={{
        backgroundColor: 'var(--bg-dialog)',
        border: '1px solid var(--border-default)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map(({ icon: Icon, label, action }) => (
        <button
          key={label}
          type="button"
          role="menuitem"
          onClick={() => { action(); onClose(); }}
          className="w-full px-3 py-2 text-left text-[13px] flex items-center gap-2.5 transition-colors cursor-pointer"
          style={{ color: 'var(--text-primary)' }}
          onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-hover)'}
          onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'}
        >
          <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--text-muted)' }} aria-hidden="true" />
          {label}
        </button>
      ))}
      <div className="my-1" style={{ borderTop: '1px solid var(--border-default)' }} />
      <button
        type="button"
        role="menuitem"
        onClick={() => { onDelete(); onClose(); }}
        className="w-full px-3 py-2 text-left text-[13px] text-red-500 flex items-center gap-2.5 hover:bg-red-500/10 transition-colors cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        Delete
      </button>
    </div>
  );
};

// ─── Share Dialog ──────────────────────────────────────────────────────────────
interface ShareDialogProps {
  conv: Conversation;
  onClose: () => void;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ conv, onClose }) => {
  const mockLink = `https://tnnmc.gov.in/share/chat/${conv.id.slice(-8)}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(mockLink).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-dialog-title"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--bg-overlay)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-[10px] shadow-xl overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-dialog)',
          border: '1px solid var(--border-default)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-[3px] w-full" style={{ backgroundColor: 'var(--brand)' }} />
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ borderBottom: '1px solid var(--border-default)' }}
        >
          <h2 id="share-dialog-title" className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>
            Share conversation
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-[4px] transition-colors cursor-pointer"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-hover)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <p className="text-[12px] font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Conversation</p>
            <p className="text-[14px] font-medium truncate" style={{ color: 'var(--text-primary)' }}>{conv.title}</p>
          </div>
          <div>
            <p className="text-[12px] font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Share link</p>
            <div
              className="flex items-center gap-2 rounded-[6px] px-3 py-2"
              style={{
                backgroundColor: 'var(--bg-surface-raised)',
                border: '1px solid var(--border-default)',
              }}
            >
              <Link className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--text-muted)' }} />
              <span className="text-[12px] truncate flex-1" style={{ color: 'var(--text-secondary)' }}>{mockLink}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className={`w-full h-9 inline-flex items-center justify-center gap-2 text-[13px] font-semibold rounded-[6px] transition-colors cursor-pointer ${
              copied ? 'bg-green-50 text-green-700 border border-green-200' : ''
            }`}
            style={!copied ? { backgroundColor: 'var(--brand)', color: '#fff' } : {}}
          >
            {copied ? (
              <><CheckCheck className="w-4 h-4" /> Link copied!</>
            ) : (
              <><Link className="w-4 h-4" /> Copy link</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Rename Dialog ─────────────────────────────────────────────────────────────
interface RenameDialogProps {
  conv: Conversation;
  onSave: (newTitle: string) => void;
  onClose: () => void;
}

const RenameDialog: React.FC<RenameDialogProps> = ({ conv, onSave, onClose }) => {
  const [value, setValue] = useState(conv.title);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.select();
  }, []);

  const handleSave = () => {
    if (!value.trim()) { setError('Title cannot be empty.'); return; }
    onSave(value.trim());
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="rename-dialog-title"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--bg-overlay)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-[10px] shadow-xl overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-dialog)',
          border: '1px solid var(--border-default)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-[3px] w-full" style={{ backgroundColor: 'var(--brand)' }} />
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ borderBottom: '1px solid var(--border-default)' }}
        >
          <h2 id="rename-dialog-title" className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>
            Rename conversation
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-[4px] transition-colors cursor-pointer"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-hover)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label htmlFor="rename-input" className="block text-[12px] font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
              Conversation title
            </label>
            <input
              id="rename-input"
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => { setValue(e.target.value); setError(''); }}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') onClose(); }}
              className="w-full h-9 px-3 text-[14px] rounded-[6px] focus:outline-none transition-colors"
              style={{
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-input)',
              }}
            />
            {error && <p className="text-[12px] text-red-500 mt-1">{error}</p>}
          </div>
          <div className="flex gap-2.5 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-medium rounded-[6px] transition-colors cursor-pointer"
              style={{
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-input)',
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-[13px] font-semibold text-white rounded-[6px] transition-colors cursor-pointer"
              style={{ backgroundColor: 'var(--brand)' }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Notebook Dialog ───────────────────────────────────────────────────────────
interface NotebookDialogProps {
  conv: Conversation;
  onClose: () => void;
}

const NotebookDialog: React.FC<NotebookDialogProps> = ({ conv, onClose }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleAdd = () => {
    if (!selected) return;
    setConfirmed(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="notebook-dialog-title"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ backgroundColor: 'var(--bg-overlay)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-[10px] shadow-xl overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-dialog)',
          border: '1px solid var(--border-default)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-[3px] w-full" style={{ backgroundColor: 'var(--brand)' }} />
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ borderBottom: '1px solid var(--border-default)' }}
        >
          <h2 id="notebook-dialog-title" className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>
            Add to notebook
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-[4px] transition-colors cursor-pointer"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-hover)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          {confirmed ? (
            <div className="flex flex-col items-center gap-3 py-3 text-center">
              <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCheck className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-[14px] font-medium" style={{ color: 'var(--text-primary)' }}>
                Added to <span className="font-semibold">{MOCK_NOTEBOOKS.find(n => n.id === selected)?.label}</span>
              </p>
              <p className="text-[12px] truncate max-w-[220px]" style={{ color: 'var(--text-muted)' }}>{conv.title}</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-1 px-4 py-2 text-[13px] font-semibold text-white rounded-[6px] transition-colors cursor-pointer"
                style={{ backgroundColor: 'var(--brand)' }}
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                Select a notebook for <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{conv.title}</span>
              </p>
              <div className="space-y-1.5">
                {MOCK_NOTEBOOKS.map((nb) => (
                  <button
                    key={nb.id}
                    type="button"
                    onClick={() => setSelected(nb.id)}
                    className="w-full px-3 py-2.5 text-left text-[13px] flex items-center gap-2.5 rounded-[6px] transition-colors cursor-pointer"
                    style={
                      selected === nb.id
                        ? {
                            border: '1px solid var(--brand)',
                            backgroundColor: 'var(--brand-subtle)',
                            color: 'var(--text-primary)',
                            fontWeight: 500,
                          }
                        : {
                            border: '1px solid var(--border-default)',
                            color: 'var(--text-secondary)',
                          }
                    }
                    onMouseEnter={(e) => {
                      if (selected !== nb.id)
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-hover)';
                    }}
                    onMouseLeave={(e) => {
                      if (selected !== nb.id)
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                    }}
                  >
                    <BookOpen className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--text-muted)' }} />
                    {nb.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-2.5 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-[13px] font-medium rounded-[6px] transition-colors cursor-pointer"
                  style={{
                    color: 'var(--text-secondary)',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-input)',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={!selected}
                  className="px-4 py-2 text-[13px] font-semibold text-white rounded-[6px] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: 'var(--brand)' }}
                >
                  Add
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Delete Confirmation Dialog ────────────────────────────────────────────────
interface DeleteDialogProps {
  conv: Conversation;
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ conv, onConfirm, onClose }) => (
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="delete-dialog-title"
    className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    style={{ backgroundColor: 'var(--bg-overlay)' }}
    onClick={onClose}
  >
    <div
      className="w-full max-w-sm rounded-[10px] shadow-xl overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-dialog)',
        border: '1px solid var(--border-default)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-[3px] w-full bg-red-500" />
      <div className="p-5 space-y-4">
        <div>
          <h2 id="delete-dialog-title" className="text-[15px] font-semibold" style={{ color: 'var(--text-primary)' }}>
            Delete this conversation?
          </h2>
          <p className="text-[13px] mt-1" style={{ color: 'var(--text-muted)' }}>This action cannot be undone.</p>
          <p className="text-[13px] font-medium mt-1 truncate" style={{ color: 'var(--text-secondary)' }}>{conv.title}</p>
        </div>
        <div className="flex gap-2.5 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[13px] font-medium rounded-[6px] transition-colors cursor-pointer"
            style={{
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-input)',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => { onConfirm(); onClose(); }}
            className="px-4 py-2 text-[13px] font-semibold text-white bg-red-600 hover:bg-red-700 rounded-[6px] transition-colors cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);

// ─── Conversation Item ─────────────────────────────────────────────────────────
interface ConvItemProps {
  conv: Conversation;
  isActive: boolean;
  isPinned: boolean;
  openMenuId: string | null;
  onSelect: () => void;
  onMenuOpen: (id: string) => void;
  onMenuClose: () => void;
  onShare: (conv: Conversation) => void;
  onPin: (id: string) => void;
  onRename: (conv: Conversation) => void;
  onAddToNotebook: (conv: Conversation) => void;
  onDelete: (conv: Conversation) => void;
}

const ConvItem: React.FC<ConvItemProps> = ({
  conv, isActive, isPinned, openMenuId,
  onSelect, onMenuOpen, onMenuClose,
  onShare, onPin, onRename, onAddToNotebook, onDelete,
}) => {
  const isMenuOpen = openMenuId === conv.id;
  const lastMessage = conv.messages[conv.messages.length - 1];

  return (
    <div
      className="group relative w-full rounded-[6px] transition-colors duration-150"
      style={
        isActive
          ? {
              backgroundColor: 'var(--conv-active-bg)',
              border: '1px solid var(--conv-active-border)',
            }
          : { border: '1px solid transparent' }
      }
      onMouseEnter={(e) => {
        if (!isActive) (e.currentTarget as HTMLDivElement).style.backgroundColor = 'var(--bg-hover)';
      }}
      onMouseLeave={(e) => {
        if (!isActive) (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent';
      }}
    >
      <button
        type="button"
        aria-current={isActive ? 'page' : undefined}
        onClick={onSelect}
        className="w-full px-2.5 py-2 text-left flex items-start gap-2.5 cursor-pointer pr-9"
      >
        <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
          {isPinned && <Pin className="w-3 h-3" style={{ color: 'var(--brand)' }} aria-label="Pinned" />}
          {!isPinned && (
            <MessageSquare
              className="w-3.5 h-3.5"
              style={{ color: isActive ? 'var(--brand)' : 'var(--text-muted)' }}
              aria-hidden="true"
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div
            className="text-[13px] truncate leading-snug"
            style={{
              color: isActive ? 'var(--brand)' : 'var(--text-primary)',
              fontWeight: isActive ? 600 : 500,
            }}
          >
            {conv.title}
          </div>
          {lastMessage && (
            <div className="mt-0.5 text-[11px] truncate" style={{ color: 'var(--text-muted)' }}>
              {lastMessage.content}
            </div>
          )}
        </div>
      </button>

      {/* Three-dot menu trigger */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          isMenuOpen ? onMenuClose() : onMenuOpen(conv.id);
        }}
        aria-label={`Options for ${conv.title}`}
        aria-expanded={isMenuOpen}
        aria-haspopup="menu"
        className={`absolute right-1.5 top-2 h-6 w-6 inline-flex items-center justify-center rounded-[4px] transition-all cursor-pointer ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 focus:opacity-100'
        }`}
        style={{
          color: 'var(--text-muted)',
          backgroundColor: isMenuOpen ? 'var(--bg-active)' : 'transparent',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-active)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = isMenuOpen ? 'var(--bg-active)' : 'transparent';
        }}
      >
        <MoreHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
      </button>

      {isMenuOpen && (
        <ContextMenu
          convId={conv.id}
          convTitle={conv.title}
          isPinned={isPinned}
          onClose={onMenuClose}
          onShare={() => onShare(conv)}
          onPin={() => onPin(conv.id)}
          onRename={() => onRename(conv)}
          onAddToNotebook={() => onAddToNotebook(conv)}
          onDelete={() => onDelete(conv)}
        />
      )}
    </div>
  );
};

// ─── Main Sidebar ──────────────────────────────────────────────────────────────
export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  onRenameConversation,
  onNewChat,
  isDesktopCollapsed,
  isMobileOpen,
  onCloseMobile,
  userName,
  userEmail,
  avatarUrl,
  onOpenProfile,
  onOpenHelp,
  onOpenSettings,
  onSignOut,
}) => {
  const initials =
    userName.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]?.toUpperCase()).join('') || 'TN';

  // ── State ──
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Dialogs
  const [shareConv, setShareConv] = useState<Conversation | null>(null);
  const [renameConv, setRenameConv] = useState<Conversation | null>(null);
  const [notebookConv, setNotebookConv] = useState<Conversation | null>(null);
  const [deleteConv, setDeleteConv] = useState<Conversation | null>(null);

  // ── Derived ──
  const pinnedConvs = conversations.filter((c) => pinnedIds.has(c.id));
  const recentConvs = conversations.filter((c) => !pinnedIds.has(c.id));

  const filterConvs = useCallback((list: Conversation[]) => {
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter((c) => c.title.toLowerCase().includes(q));
  }, [searchQuery]);

  const filteredPinned = filterConvs(pinnedConvs);
  const filteredRecent = filterConvs(recentConvs);
  const hasResults = filteredPinned.length + filteredRecent.length > 0;

  // Focus search on open
  useEffect(() => {
    if (searchActive) setTimeout(() => searchInputRef.current?.focus(), 50);
  }, [searchActive]);

  const handlePin = (id: string) => {
    setPinnedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleDelete = (conv: Conversation) => {
    setPinnedIds((prev) => { const n = new Set(prev); n.delete(conv.id); return n; });
    onDeleteConversation?.(conv.id);
  };

  const handleRename = (id: string, newTitle: string) => {
    onRenameConversation?.(id, newTitle);
  };

  const closeAllMenus = () => setOpenMenuId(null);

  // ── Conversation item factory ──
  const renderItem = (conv: Conversation) => (
    <ConvItem
      key={conv.id}
      conv={conv}
      isActive={activeConversationId === conv.id}
      isPinned={pinnedIds.has(conv.id)}
      openMenuId={openMenuId}
      onSelect={() => { onSelectConversation(conv.id); onCloseMobile(); }}
      onMenuOpen={(id) => setOpenMenuId(id)}
      onMenuClose={closeAllMenus}
      onShare={setShareConv}
      onPin={handlePin}
      onRename={setRenameConv}
      onAddToNotebook={setNotebookConv}
      onDelete={setDeleteConv}
    />
  );

  const sidebarContent = (
    <div
      className="h-full w-full flex flex-col select-none"
      style={{
        backgroundColor: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-default)',
      }}
    >
      {/* Top Brand Area */}
      <div
        className="px-4 pt-4 pb-3 flex items-center justify-between gap-2"
        style={{ borderBottom: '1px solid var(--border-default)' }}
      >
        <button
          type="button"
          onClick={() => { onNewChat(); onCloseMobile(); }}
          className="flex items-center gap-2.5 text-left min-w-0 rounded-[4px] focus:outline-none cursor-pointer"
        >
          <TnnmcEmblem size={36} className="w-9 h-9 shrink-0" />
          <div className="min-w-0">
            <span className="block text-[14px] font-bold truncate leading-tight" style={{ color: 'var(--text-primary)' }}>
              Nightingale chatbot
            </span>
            <span className="block text-[11px] truncate leading-tight mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Official Assistant
            </span>
          </div>
        </button>
        <button
          type="button"
          onClick={onCloseMobile}
          aria-label="Close navigation drawer"
          className="md:hidden h-8 w-8 inline-flex items-center justify-center rounded-[6px] transition-colors cursor-pointer"
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

      {/* New Chat + Search */}
      <div className="px-3 pt-3 pb-1 space-y-2">
        <button
          type="button"
          onClick={() => { onNewChat(); onCloseMobile(); }}
          className="w-full h-10 px-3.5 inline-flex items-center justify-center gap-2 text-[14px] font-semibold text-white rounded-[6px] shadow-sm transition-colors duration-150 cursor-pointer whitespace-nowrap"
          style={{ backgroundColor: 'var(--brand)' }}
          onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--brand-hover)'}
          onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--brand)'}
        >
          <Plus className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>New Chat</span>
        </button>

        {/* Search chats */}
        {searchActive ? (
          <div
            className="flex items-center gap-2 rounded-[6px] px-2.5 h-9"
            style={{
              backgroundColor: 'var(--bg-surface-raised)',
              border: '1px solid var(--brand)',
            }}
          >
            <Search className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--text-muted)' }} aria-hidden="true" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Escape') { setSearchActive(false); setSearchQuery(''); } }}
              placeholder="Search chats..."
              className="flex-1 bg-transparent text-[13px] focus:outline-none min-w-0"
              style={{
                color: 'var(--text-primary)',
              }}
              aria-label="Search conversations"
            />
            <button
              type="button"
              onClick={() => { setSearchActive(false); setSearchQuery(''); }}
              aria-label="Clear search"
              className="cursor-pointer"
              style={{ color: 'var(--text-muted)' }}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setSearchActive(true)}
            className="w-full h-9 px-2.5 inline-flex items-center gap-2 text-[13px] rounded-[6px] transition-colors cursor-pointer"
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
            <Search className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Search chats</span>
          </button>
        )}
      </div>

      {/* Conversation Lists */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3">
        {/* Pinned */}
        {filteredPinned.length > 0 && (
          <div>
            <div className="px-2 mb-1.5 flex items-center gap-1.5">
              <Pin className="w-3 h-3" style={{ color: 'var(--brand)' }} aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Pinned
              </span>
            </div>
            <nav aria-label="Pinned conversations" className="space-y-0.5">
              {filteredPinned.map(renderItem)}
            </nav>
          </div>
        )}

        {/* Recent */}
        {filteredRecent.length > 0 && (
          <div>
            <div className="px-2 mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                {searchQuery ? 'Results' : 'Recent Conversations'}
              </span>
              {!searchQuery && (
                <span className="text-[11px] font-medium" style={{ color: 'var(--text-placeholder)' }}>
                  {recentConvs.length}
                </span>
              )}
            </div>
            <nav aria-label="Recent conversations" className="space-y-0.5">
              {filteredRecent.map(renderItem)}
            </nav>
          </div>
        )}

        {/* No results */}
        {searchQuery && !hasResults && (
          <div className="py-8 text-center">
            <Search className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--border-input)' }} />
            <p className="text-[13px]" style={{ color: 'var(--text-placeholder)' }}>No chats found</p>
            <p className="text-[12px] mt-0.5" style={{ color: 'var(--border-input)' }}>Try a different search term</p>
          </div>
        )}
      </div>

      {/* Bottom Area: Profile, Help, Settings, User */}
      <div
        className="p-3 space-y-1"
        style={{
          borderTop: '1px solid var(--border-default)',
          backgroundColor: 'var(--bg-sidebar-bottom)',
        }}
      >
        {[
          { icon: User, label: 'Profile', action: () => { onOpenProfile(); onCloseMobile(); } },
          { icon: HelpCircle, label: 'Help', action: () => { onOpenHelp(); onCloseMobile(); } },
          { icon: Settings, label: 'Settings', action: () => { onOpenSettings(); onCloseMobile(); } },
        ].map(({ icon: Icon, label, action }) => (
          <button
            key={label}
            type="button"
            onClick={action}
            className="w-full px-2.5 py-2 text-left rounded-[6px] flex items-center gap-2.5 text-[13px] font-medium transition-colors duration-150 cursor-pointer"
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
            <Icon className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} aria-hidden="true" />
            <span>{label}</span>
          </button>
        ))}

        {/* User Profile Row */}
        <div
          className="pt-2 mt-1 flex items-center justify-between gap-2 px-1 py-1"
          style={{ borderTop: '1px solid var(--border-default)' }}
        >
          <button
            type="button"
            onClick={() => { onOpenProfile(); onCloseMobile(); }}
            title="Edit profile details"
            className="flex items-center gap-2.5 min-w-0 text-left flex-1 p-1 rounded-[6px] transition-colors cursor-pointer"
            onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-hover)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'}
          >
            <div
              className="h-8 w-8 rounded-[6px] flex items-center justify-center text-[12px] font-semibold overflow-hidden shrink-0"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-input)',
                color: 'var(--brand)',
              }}
              aria-hidden="true"
            >
              {avatarUrl ? <img src={avatarUrl} alt={userName} className="w-full h-full object-cover" /> : initials}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold truncate leading-tight" style={{ color: 'var(--text-primary)' }}>
                {userName}
              </p>
              <p className="text-[11px] truncate leading-tight mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {userEmail}
              </p>
            </div>
          </button>
          <button
            type="button"
            onClick={onSignOut}
            aria-label="Sign Out"
            title="Sign Out"
            className="h-8 w-8 inline-flex items-center justify-center rounded-[6px] transition-colors duration-150 shrink-0 cursor-pointer"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--brand)';
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-hover)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            }}
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Collapsible Sidebar */}
      <aside
        aria-label="Conversation sidebar"
        className={`hidden md:block shrink-0 transition-all duration-200 overflow-hidden ${isDesktopCollapsed ? 'w-0' : 'w-[276px]'}`}
      >
        <div className="w-[276px] h-full">{sidebarContent}</div>
      </aside>

      {/* Mobile Slide-Out Drawer */}
      {isMobileOpen && (
        <div role="dialog" aria-modal="true" aria-label="Navigation drawer" className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 transition-opacity"
            style={{ backgroundColor: 'var(--bg-overlay)' }}
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative z-10 w-[284px] max-w-[85vw] h-full shadow-lg">{sidebarContent}</div>
        </div>
      )}

      {/* Modals rendered via portals at root level */}
      {shareConv && <ShareDialog conv={shareConv} onClose={() => setShareConv(null)} />}
      {renameConv && (
        <RenameDialog
          conv={renameConv}
          onSave={(t) => handleRename(renameConv.id, t)}
          onClose={() => setRenameConv(null)}
        />
      )}
      {notebookConv && <NotebookDialog conv={notebookConv} onClose={() => setNotebookConv(null)} />}
      {deleteConv && (
        <DeleteDialog
          conv={deleteConv}
          onConfirm={() => handleDelete(deleteConv)}
          onClose={() => setDeleteConv(null)}
        />
      )}
    </>
  );
};
