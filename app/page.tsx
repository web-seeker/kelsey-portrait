'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Info } from 'lucide-react';
import StyleSelector from '@/components/StyleSelector';
import DescriptionInput from '@/components/DescriptionInput';
import PromptDisplay from '@/components/PromptDisplay';
import ImagePreview from '@/components/ImagePreview';
import { StyleType, DescriptionData, GenerationState } from '@/types';
import { buildPrompt, defaultDescriptions } from '@/lib/prompt-builder';

export default function Home() {
  const [selectedStyle, setSelectedStyle] = useState<StyleType>('A');
  const [description, setDescription] = useState<DescriptionData>(defaultDescriptions);
  const [prompt, setPrompt] = useState<string>('');
  const [generationState, setGenerationState] = useState<GenerationState>({
    status: 'idle',
  });
  const [mounted, setMounted] = useState(false);

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

  // 生成图像
  const handleGenerate = async () => {
    if (generationState.status === 'generating') return;

    setGenerationState({
      status: 'generating',
      progress: '正在连接服务...',
    });

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          style: selectedStyle,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || '生成失败');
      }

      const data = await response.json();

      setGenerationState({
        status: 'generating',
        progress: '正在生成图像...',
        imageUrl: data.imageUrl,
      });

      // 如果直接返回了图片URL
      if (data.imageUrl && !data.id) {
        setGenerationState({
          status: 'succeeded',
          imageUrl: data.imageUrl,
        });
      }
    } catch (error) {
      setGenerationState({
        status: 'failed',
        error: error instanceof Error ? error.message : '生成失败，请重试',
      });
    }
  };

  // 重新生成
  const handleRetry = () => {
    setGenerationState({ status: 'idle' });
    setTimeout(handleGenerate, 100);
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
      <div className="container mx-auto px-4 py-8 max-w-7xl">
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
            融合四种标志性艺术风格，生成专业级的艺术肖像
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="space-y-8">
            <div className="card glass">
              <StyleSelector
                selectedStyle={selectedStyle}
                onSelect={setSelectedStyle}
              />
            </div>

            <div className="card glass">
              <DescriptionInput data={description} onChange={setDescription} />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={generationState.status === 'generating'}
              className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-60"
            >
              {generationState.status === 'generating' ? (
                <>
                  <div className="loading-spinner"></div>
                  生成中...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  生成艺术肖像
                </>
              )}
            </button>

            {/* Prompt Display */}
            {prompt && <PromptDisplay prompt={prompt} />}
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-8">
            <div className="card glass h-full">
              <ImagePreview state={generationState} onRetry={handleRetry} />
            </div>

            {/* Tips */}
            <div className="card glass border-blue-500/20">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-2 text-sm text-white/70">
                  <h4 className="font-semibold text-white">使用技巧</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>选择不同的风格会产生截然不同的艺术效果</li>
                    <li>描述越详细，生成效果越符合预期</li>
                    <li>可以组合使用多个预设描述</li>
                    <li>自定义区域可添加任何特殊要求</li>
                  </ul>
                </div>
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
            使用 Next.js + Replicate API 构建
          </p>
        </footer>
      </div>
    </div>
  );
}
