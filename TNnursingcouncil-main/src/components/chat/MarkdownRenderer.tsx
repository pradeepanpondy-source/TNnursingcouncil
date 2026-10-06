import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Highlight, PrismTheme } from 'prism-react-renderer';
import { Check, Copy, ExternalLink } from 'lucide-react';

export interface MarkdownRendererProps {
  content: string;
}

/**
 * Custom Prism syntax-highlighting theme strictly adhering to the
 * TNNMC institutional palette (#2C7A7B teal, #1B4E7B navy, #1E242B charcoal, #F8FAFC surface).
 */
const tnnmcPrismTheme: PrismTheme = {
  plain: {
    color: '#1E242B',
    backgroundColor: '#F8FAFC',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: { color: '#64748B', fontStyle: 'italic' },
    },
    {
      types: ['punctuation', 'operator'],
      style: { color: '#475569' },
    },
    {
      types: ['keyword', 'tag', 'boolean', 'important', 'atrule'],
      style: { color: '#2C7A7B', fontWeight: '600' },
    },
    {
      types: ['property', 'attr-name', 'constant', 'symbol', 'deleted'],
      style: { color: '#2C7A7B' },
    },
    {
      types: ['string', 'char', 'attr-value', 'regex', 'inserted'],
      style: { color: '#1B4E7B' },
    },
    {
      types: ['function', 'class-name', 'selector'],
      style: { color: '#1E242B', fontWeight: '600' },
    },
    {
      types: ['number', 'variable', 'builtin'],
      style: { color: '#7C2D12' },
    },
  ],
};

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard permission errors in restricted iframes
    }
  };

  const displayLang = language || 'text';

  return (
    <div
      className="my-3.5 rounded-[6px] overflow-hidden"
      style={{
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 1px 2px rgba(15,23,42,0.03)',
        backgroundColor: 'var(--bg-surface-raised)',
      }}
    >
      <div
        className="px-3.5 py-1.5 flex items-center justify-between gap-2"
        style={{
          backgroundColor: 'var(--bg-hover)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <span
          className="text-[11px] font-semibold uppercase tracking-wider font-mono"
          style={{ color: 'var(--text-secondary)' }}
        >
          {displayLang}
        </span>

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code block"
          className="inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-medium rounded-[4px] transition-colors cursor-pointer"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--brand)';
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-surface)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
          }}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-500" aria-hidden="true" />
              <span className="text-green-500">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <Highlight
        theme={tnnmcPrismTheme}
        code={code}
        language={displayLang.toLowerCase()}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} p-3.5 text-[13px] leading-6 overflow-x-auto font-mono m-0`}
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
}) => {
  return (
    <div
      className="space-y-3 text-[15px] leading-7"
      style={{ color: 'var(--text-primary)' }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1
              className="text-[18px] font-semibold pt-2 pb-0.5 leading-7"
              style={{
                color: 'var(--text-primary)',
                borderBottom: '1px solid var(--border-default)',
              }}
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              className="text-[16px] font-semibold pt-2 pb-0.5 leading-6"
              style={{ color: 'var(--text-primary)' }}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              className="text-[15px] font-semibold pt-1.5 leading-6"
              style={{ color: 'var(--text-primary)' }}
            >
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4
              className="text-[14px] font-semibold pt-1 leading-5"
              style={{ color: 'var(--text-secondary)' }}
            >
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p
              className="text-[15px] leading-7"
              style={{ color: 'var(--text-primary)' }}
            >
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong
              className="font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em
              className="italic"
              style={{ color: 'var(--text-secondary)' }}
            >
              {children}
            </em>
          ),
          ul: ({ children }) => (
            <ul
              className="space-y-2 pl-5 list-disc text-[15px] leading-6"
              style={{ color: 'var(--text-secondary)' }}
            >
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol
              className="space-y-2 pl-5 list-decimal text-[15px] leading-6"
              style={{ color: 'var(--text-secondary)' }}
            >
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1 leading-6">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote
              className="pl-3.5 py-1 text-[14px] rounded-r-[4px]"
              style={{
                borderLeft: '3px solid var(--brand)',
                backgroundColor: 'var(--bg-surface-raised)',
                color: 'var(--text-secondary)',
              }}
            >
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[14px] font-medium hover:underline underline-offset-4 transition-colors duration-150"
              style={{ color: 'var(--brand)' }}
            >
              <span>{children}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>
          ),
          pre: ({ children }) => <>{children}</>,
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const rawCode = String(children).replace(/\n$/, '');
            const isMultiline = rawCode.includes('\n') || Boolean(match);

            if (isMultiline) {
              return (
                <CodeBlock
                  language={match ? match[1] : 'text'}
                  code={rawCode}
                />
              );
            }

            return (
              <code
                className="px-1.5 py-0.5 text-[13px] font-mono font-medium rounded-[4px]"
                style={{
                  color: 'var(--brand)',
                  backgroundColor: 'var(--bg-hover)',
                  border: '1px solid var(--border-default)',
                }}
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
