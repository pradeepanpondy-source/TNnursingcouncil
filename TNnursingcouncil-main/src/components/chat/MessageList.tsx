import React, { useEffect, useRef } from 'react';
import { Message } from '../../types/chat';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';

export interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isTyping,
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isTyping]);

  return (
    <div
      role="log"
      aria-live="polite"
      aria-label="Conversation transcript"
      className="flex-1 overflow-y-auto px-4 sm:px-6 pt-4 pb-6"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      <div
        style={{ borderColor: 'var(--border-divider)' }}
        className="divide-y"
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>

      {isTyping && <TypingIndicator />}

      <div ref={bottomRef} className="h-2" aria-hidden="true" />
    </div>
  );
};
