'use client';

import { useState, useEffect } from 'react';
import { Info, Copy } from 'lucide-react';
import StyleSelector from '@/components/StyleSelector';
import DescriptionInput from '@/components/DescriptionInput';
import { StyleType, DescriptionData } from '@/types';
import { buildPrompt, defaultDescriptions } from '@/lib/prompt-builder';

export default function Home() {
  const [selectedStyle, setSelectedStyle] = useState<StyleType>('A');
  const [description, setDescription] = useState<DescriptionData>(defaultDescriptions);
  const [prompt, setPrompt] = useState<string>('');
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  // 初始化提示词
  useEffect(() => {
    setMounted(true);
    const initialPrompt = buildPrompt(selectedStyle, description);
    setPrompt(initialPrompt);
  }, []);

  // 当风格或描述改变时更新提示词
  useEffect(() => {
    if (mounted) {
      const newPrompt = buildPrompt(selectedStyle, description);
      setPrompt(newPrompt);
    }
  }, [selectedStyle, description, mounted]);

  // 复制提示词
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 背景渐变 */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0f0f1a]"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at 20% 20%, rgba(102, 126, 234, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(118, 75, 162, 0.4) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(79, 172, 254, 0.2) 0%, transparent 60%)',
          }}
        ></div>
        {/* 流动光晕动画 */}
        <div
          className="absolute inset-0 opacity-20 animate-gradient-flow"
          style={{
            background:
              'linear-gradient(45deg, transparent 30%, rgba(102, 126, 234, 0.1) 50%, transparent 70%)',
            backgroundSize: '400% 400%',
          }}
        ></div>
      </div>

      {/* 主内容 */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <header className="text-center mb-12 animate-float">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl">
              🎨
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="text-gradient">Kelsey Portrait</span>
            </h1>
          </div>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            融合四种标志性艺术风格，免费生成专业级的艺术肖像提示词
          </p>

          {/* 风格标签 */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {['A 数字印象主义', 'B 炭笔线条', 'C 半写实动漫', 'D 彩色数字肖像'].map(
              (style) => (
                <span
                  key={style}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/60"
                >
                  {style}
                </span>
              )
            )}
          </div>
        </header>

        {/* Main Content */}
        <div className="space-y-8">
          {/* 风格选择 */}
          <div className="card glass">
            <StyleSelector
              selectedStyle={selectedStyle}
              onSelect={setSelectedStyle}
            />
          </div>

          {/* 描述输入 */}
          <div className="card glass">
            <DescriptionInput data={description} onChange={setDescription} />
          </div>

          {/* 提示词展示 */}
          <div className="card glass">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">生成的提示词</h2>
              <button
                onClick={handleCopy}
                className="btn-primary flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <span className="text-green-300">✓</span>
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    复制提示词
                  </>
                )}
              </button>
            </div>
            <div className="prompt-display">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed text-white/90">
                {prompt}
              </pre>
            </div>
          </div>

          {/* 使用说明 */}
          <div className="card glass border-blue-500/20">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2 text-sm text-white/70">
                <h4 className="font-semibold text-white">💡 使用说明</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>选择你喜欢的艺术风格</li>
                  <li>输入或选择人物描述</li>
                  <li>点击"复制提示词"获取完整提示词</li>
                  <li>将提示词粘贴到 Midjourney、Stable Diffusion 等工具中使用</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-white/40 text-sm">
          <p>
            由 Kelsey Portrait 提供 · 基于 Kelsey Hsiao 艺术风格
          </p>
          <p className="mt-2">
            提示词可用于 Midjourney、Stable Diffusion、DALL-E 等 AI 绘画工具
          </p>
        </footer>
      </div>
    </div>
  );
}
