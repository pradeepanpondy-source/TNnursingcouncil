import React from 'react';
import { Paperclip } from 'lucide-react';
import { TnnmcEmblem } from '../TnnmcEmblem';
import { Message } from '../../types/chat';
import { MarkdownRenderer } from './MarkdownRenderer';

export interface ChatMessageProps {
  message: Message;
}

/**
 * Ensures any legacy block-structured message is converted into clean Markdown
 * if `message.content` does not already contain multi-line Markdown formatting.
 */
function resolveMarkdownContent(message: Message): string {
  if (
    message.content.includes('\n') ||
    message.content.includes('###') ||
    message.content.includes('```') ||
    message.content.includes('**')
  ) {
    return message.content;
  }

  if (message.blocks && message.blocks.length > 0) {
    return message.blocks
      .map((block) => {
        if (block.type === 'paragraph') {
          return block.text || '';
        }
        if (block.type === 'heading') {
          return `### ${block.text || ''}`;
        }
        if (block.type === 'bullet-list' && block.items) {
          return block.items.map((item) => `- ${item}`).join('\n');
        }
        if (block.type === 'numbered-list' && block.items) {
          return block.items.map((item, idx) => `${idx + 1}. ${item}`).join('\n');
        }
        if (block.type === 'link' && block.href) {
          return `[${block.linkLabel || block.href}](${block.href})`;
        }
        return '';
      })
      .filter(Boolean)
      .join('\n\n');
  }

  return message.content;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="w-full py-3">
        <div className="max-w-[780px] mx-auto flex justify-end">
          <div
            className="max-w-[88%] sm:max-w-[75%] rounded-[8px] px-4 py-3"
            style={{
              backgroundColor: 'var(--bg-user-bubble)',
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
            }}
          >
            {message.attachmentName && (
              <div
                className="mb-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-[12px] font-medium"
                style={{
                  backgroundColor: 'var(--bg-surface-raised)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-secondary)',
                }}
              >
                <Paperclip className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--brand)' }} aria-hidden="true" />
                <span className="truncate max-w-[220px]">{message.attachmentName}</span>
              </div>
            )}
            <p
              className="text-[15px] leading-6 whitespace-pre-wrap break-words"
              style={{ color: 'var(--text-primary)' }}
            >
              {message.content}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const markdownText = resolveMarkdownContent(message);

  return (
    <div className="w-full py-4">
      <div className="max-w-[780px] mx-auto flex items-start gap-3.5">
        <div className="mt-0.5 shrink-0">
          <TnnmcEmblem size={28} className="w-7 h-7" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="text-[13px] font-semibold leading-5"
              style={{ color: 'var(--text-primary)' }}
            >
              Nightingale chatbot
            </span>
            <span
              className="text-[12px] leading-4"
              style={{ color: 'var(--text-muted)' }}
            >
              {message.timestamp}
            </span>
          </div>

          <MarkdownRenderer content={markdownText} />

          {message.source && (
            <div
              className="mt-3.5 pt-2.5 flex flex-wrap items-center gap-1.5 text-[12px]"
              style={{
                borderTop: '1px solid var(--border-default)',
                color: 'var(--text-muted)',
              }}
            >
              <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>Source:</span>
              <span>{message.source}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
