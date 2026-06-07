'use client';

import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface PromptDisplayProps {
  prompt: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export default function PromptDisplay({
  prompt,
  onRegenerate,
  isRegenerating = false,
}: PromptDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white/70">生成的提示词</h3>
        <div className="flex gap-2">
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="btn-secondary flex items-center gap-2 text-xs py-2 px-3"
            >
              <RefreshCw className={`w-3 h-3 ${isRegenerating ? 'animate-spin' : ''}`} />
              重新生成
            </button>
          )}
          <button
            onClick={handleCopy}
            className="btn-secondary flex items-center gap-2 text-xs py-2 px-3"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                已复制
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                复制
              </>
            )}
          </button>
        </div>
      </div>

      <div className="prompt-display relative">
        {/* 语法高亮关键字 */}
        <pre className="whitespace-pre-wrap text-sm leading-relaxed">
          {prompt.split('\n').map((line, i) => (
            <span key={i}>
              {highlightKeywords(line)}
              {i < prompt.split('\n').length - 1 && '\n'}
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
}

// 简单的关键词高亮
function highlightKeywords(text: string) {
  const keywords = [
    'Portrait',
    'style',
    'color',
    'background',
    'signature',
    'hair',
    'eyes',
    'Digital painting',
  ];

  const parts: { text: string; highlighted: boolean }[] = [{ text, highlighted: false }];

  keywords.forEach((keyword) => {
    parts.forEach((part) => {
      if (part.highlighted) return;

      const index = part.text.toLowerCase().indexOf(keyword.toLowerCase());
      if (index !== -1) {
        const before = part.text.slice(0, index);
        const match = part.text.slice(index, index + keyword.length);
        const after = part.text.slice(index + keyword.length);

        part.text = '';
        parts.push(
          { text: before, highlighted: false },
          { text: match, highlighted: true },
          { text: after, highlighted: false }
        );
      }
    });
  });

  return parts.map((part, i) =>
    part.highlighted ? (
      <span key={i} className="text-purple-400 font-medium">
        {part.text}
      </span>
    ) : (
      <span key={i}>{part.text}</span>
    )
  );
}
