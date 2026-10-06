import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, ArrowUp, X, Mic, Square } from 'lucide-react';

export interface MessageComposerProps {
  onSendMessage: (content: string, attachmentName?: string) => void;
  disabled?: boolean;
}

const SAMPLE_VOICE_TRANSCRIPTS = [
  'How can I check my license status?',
  'What documents are required for registration?',
  'How do I renew my registration?',
  'How can I find information about CNE?',
];

export const MessageComposer: React.FC<MessageComposerProps> = ({
  onSendMessage,
  disabled = false,
}) => {
  const [text, setText] = useState('');
  const [attachmentName, setAttachmentName] = useState<string | undefined>();
  const [isListening, setIsListening] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptIndex, setTranscriptIndex] = useState(0);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const listeningTimerRef = useRef<number | null>(null);
  const typingIntervalRef = useRef<number | null>(null);

  // Auto-resize textarea height based on content
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const nextHeight = Math.min(el.scrollHeight, 160);
    el.style.height = `${nextHeight}px`;
  }, [text]);

  const clearVoiceTimers = () => {
    if (listeningTimerRef.current) {
      window.clearTimeout(listeningTimerRef.current);
      listeningTimerRef.current = null;
    }
    if (typingIntervalRef.current) {
      window.clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearVoiceTimers();
    };
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    if ((!trimmed && !attachmentName) || disabled) return;

    if (isListening || isTranscribing) {
      clearVoiceTimers();
      setIsListening(false);
      setIsTranscribing(false);
    }

    const messageText =
      trimmed || (attachmentName ? `Attached document: ${attachmentName}` : '');

    onSendMessage(messageText, attachmentName);
    setText('');
    setAttachmentName(undefined);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachmentName(file.name);
    }
    e.target.value = '';
  };

  const handleToggleMic = () => {
    if (disabled) return;

    if (isListening || isTranscribing) {
      clearVoiceTimers();
      setIsListening(false);
      setIsTranscribing(false);
      return;
    }

    setIsListening(true);
    textareaRef.current?.focus();

    const targetPhrase =
      SAMPLE_VOICE_TRANSCRIPTS[transcriptIndex % SAMPLE_VOICE_TRANSCRIPTS.length];
    setTranscriptIndex((prev) => prev + 1);
    const words = targetPhrase.split(' ');

    listeningTimerRef.current = window.setTimeout(() => {
      setIsListening(false);
      setIsTranscribing(true);

      let currentWordIdx = 0;
      const basePrefix = text.trim() ? `${text.trim()} ` : '';

      typingIntervalRef.current = window.setInterval(() => {
        currentWordIdx += 1;
        const partial = words.slice(0, currentWordIdx).join(' ');
        setText(`${basePrefix}${partial}`);

        if (currentWordIdx >= words.length) {
          if (typingIntervalRef.current) {
            window.clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          setIsTranscribing(false);
          textareaRef.current?.focus();
        }
      }, 140);
    }, 1000);
  };

  const canSend = (text.trim().length > 0 || Boolean(attachmentName)) && !disabled;

  return (
    <div
      className="w-full px-4 sm:px-6 pt-3 pb-4 sm:pb-5 shrink-0"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      <div className="max-w-[780px] mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-[10px] transition-all duration-150"
          style={{
            backgroundColor: 'var(--bg-composer)',
            border: '1px solid var(--composer-border)',
            boxShadow: 'var(--composer-shadow)',
          }}
          onFocus={(e) => {
            (e.currentTarget as HTMLFormElement).style.borderColor = 'var(--brand)';
            (e.currentTarget as HTMLFormElement).style.boxShadow = `var(--composer-shadow), 0 0 0 3px var(--composer-focus-ring)`;
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              (e.currentTarget as HTMLFormElement).style.borderColor = 'var(--composer-border)';
              (e.currentTarget as HTMLFormElement).style.boxShadow = 'var(--composer-shadow)';
            }
          }}
        >
          {/* Top Status Row for Attachment or Mock Voice Listening State */}
          {(attachmentName || isListening || isTranscribing) && (
            <div className="px-3.5 pt-3 pb-1 flex flex-wrap items-center justify-between gap-2">
              {attachmentName && (
                <div
                  className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[6px] text-[12px] font-medium"
                  style={{
                    backgroundColor: 'var(--bg-surface-raised)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <Paperclip className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--brand)' }} aria-hidden="true" />
                  <span className="truncate max-w-[240px]">{attachmentName}</span>
                  <button
                    type="button"
                    onClick={() => setAttachmentName(undefined)}
                    aria-label="Remove attachment"
                    className="p-0.5 rounded-[4px] cursor-pointer transition-colors"
                    style={{ color: 'var(--text-muted)' }}
                    onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'}
                    onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'}
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}

              {(isListening || isTranscribing) && (
                <div
                  role="status"
                  aria-live="polite"
                  className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[6px] text-[12px] font-medium"
                  style={{
                    backgroundColor: 'var(--brand-subtle)',
                    border: '1px solid var(--brand-subtle-border)',
                    color: 'var(--brand)',
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: 'var(--brand)' }}
                    aria-hidden="true"
                  />
                  <span>
                    {isListening ? 'Listening... Speak now' : 'Transcribing voice to text...'}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Main Composer Row */}
          <div className="flex items-end gap-1.5 sm:gap-2 px-3 py-2.5">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              aria-hidden="true"
              tabIndex={-1}
            />

            {/* Attach Document Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              aria-label="Attach document"
              title="Attach document"
              className="h-9 w-9 inline-flex items-center justify-center rounded-[6px] transition-colors duration-150 shrink-0 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-hover)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              }}
            >
              <Paperclip className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Microphone Button */}
            <button
              type="button"
              onClick={handleToggleMic}
              disabled={disabled}
              aria-label={
                isListening || isTranscribing ? 'Stop voice input' : 'Start voice input'
              }
              aria-pressed={isListening || isTranscribing}
              title={
                isListening || isTranscribing ? 'Stop voice input' : 'Voice input'
              }
              className="h-9 w-9 inline-flex items-center justify-center rounded-[6px] transition-colors duration-150 shrink-0 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              style={
                isListening || isTranscribing
                  ? {
                      backgroundColor: 'var(--brand-subtle)',
                      color: 'var(--brand)',
                      border: '1px solid var(--brand)',
                    }
                  : {
                      color: 'var(--text-muted)',
                      backgroundColor: 'var(--bg-surface-raised)',
                      border: '1px solid var(--border-input)',
                    }
              }
            >
              {isListening || isTranscribing ? (
                <Square className="w-3.5 h-3.5 fill-current" aria-hidden="true" />
              ) : (
                <Mic className="w-4 h-4" aria-hidden="true" />
              )}
            </button>

            {/* Multiline Text Input Area */}
            <label htmlFor="chat-message-composer" className="sr-only">
              Message Nightingale chatbot
            </label>
            <textarea
              id="chat-message-composer"
              ref={textareaRef}
              rows={1}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              placeholder={
                isListening
                  ? 'Listening...'
                  : isTranscribing
                  ? 'Transcribing...'
                  : 'Message Nightingale chatbot...'
              }
              className="flex-1 max-h-[160px] py-1.5 px-1.5 text-[16px] sm:text-[15px] leading-6 bg-transparent resize-none focus:outline-none disabled:cursor-not-allowed"
              style={{
                color: 'var(--text-primary)',
              }}
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!canSend}
              aria-label="Send message"
              className="h-9 px-3.5 inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold text-white rounded-[6px] shadow-sm transition-colors duration-150 shrink-0 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
              style={{ backgroundColor: 'var(--brand)' }}
              onMouseEnter={(e) => {
                if (canSend) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--brand-hover)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--brand)';
              }}
            >
              <span className="hidden sm:inline">Send</span>
              <ArrowUp className="w-4 h-4 shrink-0" aria-hidden="true" />
            </button>
          </div>
        </form>

        <p
          className="mt-2 text-center text-[12px] leading-4"
          style={{ color: 'var(--text-muted)' }}
        >
          Nightingale chatbot · Official Information Assistant
        </p>
      </div>
    </div>
  );
};
