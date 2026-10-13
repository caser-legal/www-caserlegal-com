'use client';

import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import { ArrowUp, Loader2, RotateCcw, Sparkles, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ChatMessage } from './store';

const SUGGESTIONS = [
  'What does a motion to dismiss under Rule 12(b)(6) mean?',
  'Explain the difference between Chapter 7 and Chapter 11 bankruptcy.',
  'Find 1:25-cv-00199 and summarize what happened.',
  'What is a PACER docket report and what does it cost?',
];

function AssistantMarkdown({ text }: { text: string }) {
  return (
    <Markdown
      components={{
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground underline underline-offset-4">
            {children}
          </a>
        ),
        p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
        ul: ({ children }) => <ul className="mb-3 list-disc space-y-1 pl-5">{children}</ul>,
        ol: ({ children }) => <ol className="mb-3 list-decimal space-y-1 pl-5">{children}</ol>,
        h1: ({ children }) => <h3 className="mb-2 mt-4 font-semibold first:mt-0">{children}</h3>,
        h2: ({ children }) => <h3 className="mb-2 mt-4 font-semibold first:mt-0">{children}</h3>,
        h3: ({ children }) => <h3 className="mb-2 mt-4 font-semibold first:mt-0">{children}</h3>,
        blockquote: ({ children }) => <blockquote className="mb-3 border-l-2 border-primary pl-3 italic">{children}</blockquote>,
        code: ({ children }) => <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]">{children}</code>,
      }}
    >
      {text}
    </Markdown>
  );
}

type AtticusPanelProps = {
  messages: ChatMessage[];
  sending: boolean;
  onSend: (text: string) => void;
  onStop: () => void;
  onReset: () => void;
};

export function AtticusPanel({ messages, sending, onSend, onStop, onReset }: AtticusPanelProps) {
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  function submit() {
    const text = input.trim();
    if (!text || sending) return;
    onSend(text);
    setInput('');
  }

  return (
    <div className="flex min-h-[60vh] flex-col rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b px-5 py-3">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <span className="font-semibold">Atticus</span>
          <span className="text-xs text-muted-foreground">AI legal research assistant</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onReset} disabled={messages.length === 0}>
          <RotateCcw />
          New chat
        </Button>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6" aria-live="polite">
        {messages.length === 0 ? (
          <div className="mx-auto max-w-xl py-8 text-center">
            <Sparkles className="mx-auto size-8 text-primary" />
            <h3 className="mt-3 text-lg font-semibold">Ask Atticus anything about federal cases</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Atticus explains filings, defines court terms, and researches dockets with cited sources.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => onSend(suggestion)}
                  className="rounded-lg border bg-background p-3 text-left text-sm transition-colors hover:bg-accent"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}>
              {message.role === 'user' ? (
                <div className="max-w-[85%] whitespace-pre-wrap rounded-2xl bg-foreground px-4 py-2.5 text-sm text-background">
                  {message.text}
                </div>
              ) : message.role === 'system' ? (
                <p className="text-sm text-muted-foreground">{message.text}</p>
              ) : (
                <div className="max-w-[92%] text-sm leading-relaxed">
                  {message.text ? (
                    <AssistantMarkdown text={message.text} />
                  ) : (
                    <Loader2 className="size-4 animate-spin text-primary" aria-label="Atticus is thinking" />
                  )}
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-3 border-t pt-3">
                      <p className="text-xs font-medium text-muted-foreground">Sources</p>
                      <ol className="mt-1 list-decimal space-y-1 pl-5 text-xs">
                        {message.sources.map((source) => (
                          <li key={source.url}>
                            <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                              {source.title}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
        <div ref={endRef} />
      </div>

      <form
        className="border-t p-3"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <div className="flex items-end gap-2 rounded-xl border bg-background p-2 focus-within:ring-2 focus-within:ring-ring/50">
          <textarea
            aria-label="Message Atticus"
            rows={1}
            maxLength={2000}
            value={input}
            placeholder="Ask about a case, a filing, or a legal term…"
            className="max-h-40 min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                event.preventDefault();
                submit();
              }
            }}
          />
          {sending ? (
            <Button type="button" size="icon" variant="outline" onClick={onStop} aria-label="Stop">
              <Square />
            </Button>
          ) : (
            <Button type="submit" size="icon" disabled={!input.trim()} aria-label="Send">
              <ArrowUp />
            </Button>
          )}
        </div>
        <p className="mt-2 px-1 text-xs text-muted-foreground">
          Atticus provides legal research support, not legal advice. Verify important details with the court record.
        </p>
      </form>
    </div>
  );
}
