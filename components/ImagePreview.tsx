'use client';

import { GenerationState } from '@/types';
import { Image as ImageIcon, Download, RefreshCw, AlertCircle } from 'lucide-react';
import Image from 'next/image';

interface ImagePreviewProps {
  state: GenerationState;
  onRetry?: () => void;
}

export default function ImagePreview({ state, onRetry }: ImagePreviewProps) {
  const handleDownload = async () => {
    if (!state.imageUrl) return;

    try {
      const response = await fetch(state.imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kelsey-portrait-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed:', err);
      // Fallback: open in new tab
      window.open(state.imageUrl, '_blank');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">预览</h2>

      <div className="relative">
        {/* 加载状态 */}
        {state.status === 'generating' && (
          <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 flex flex-col items-center justify-center gap-4">
            <div className="relative w-20 h-20">
              {/* 外圈 */}
              <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
              {/* 旋转的渐变圈 */}
              <div
                className="absolute inset-0 rounded-full border-4 border-transparent"
                style={{
                  borderTopColor: '#8b5cf6',
                  animation: 'spin 1s linear infinite',
                }}
              ></div>
              {/* 内圈 */}
              <div
                className="absolute inset-2 rounded-full border-4 border-transparent"
                style={{
                  borderTopColor: '#3b82f6',
                  animation: 'spin 0.8s linear infinite reverse',
                }}
              ></div>
            </div>
            <div className="text-center">
              <p className="text-white font-medium mb-1">正在生成艺术肖像...</p>
              <p className="text-white/50 text-sm">{state.progress || '处理中'}</p>
            </div>
          </div>
        )}

        {/* 成功状态 */}
        {state.status === 'succeeded' && state.imageUrl && (
          <div className="space-y-4">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10 group">
              <Image
                src={state.imageUrl}
                alt="生成的肖像"
                fill
                className="object-cover"
                unoptimized
              />

              {/* 悬停时的操作按钮 */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  onClick={handleDownload}
                  className="btn-primary flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  下载
                </button>
                <a
                  href={state.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  查看原图
                </a>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3">
              <button
                onClick={handleDownload}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                下载图像
              </button>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="btn-secondary flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  重新生成
                </button>
              )}
            </div>

            {/* 签名提示 */}
            <p className="text-xs text-white/40 text-center">
              ✨ 图像已包含 Kelsey Hsiao 艺术家签名
            </p>
          </div>
        )}

        {/* 失败状态 */}
        {state.status === 'failed' && (
          <div className="w-full aspect-square rounded-2xl bg-red-900/20 border border-red-500/30 flex flex-col items-center justify-center gap-4 p-6">
            <AlertCircle className="w-12 h-12 text-red-400" />
            <div className="text-center">
              <p className="text-red-400 font-medium mb-2">生成失败</p>
              <p className="text-white/60 text-sm">{state.error || '请稍后重试'}</p>
            </div>
            {onRetry && (
              <button onClick={onRetry} className="btn-primary flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                重试
              </button>
            )}
          </div>
        )}

        {/* 空闲状态 */}
        {state.status === 'idle' && (
          <div className="image-placeholder">
            <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
            <p className="text-white/50 text-sm">选择风格并输入描述后</p>
            <p className="text-white/50 text-sm">点击生成按钮创建艺术肖像</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
