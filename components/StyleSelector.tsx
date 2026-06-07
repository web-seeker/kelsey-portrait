'use client';

import { StyleType } from '@/types';
import { styles } from '@/lib/prompt-builder';
import { Check } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyle: StyleType;
  onSelect: (style: StyleType) => void;
}

export default function StyleSelector({ selectedStyle, onSelect }: StyleSelectorProps) {
  const styleList = Object.values(styles);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white mb-4">选择艺术风格</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {styleList.map((style) => {
          const isSelected = selectedStyle === style.id;
          return (
            <button
              key={style.id}
              onClick={() => onSelect(style.id)}
              className={`
                relative p-4 rounded-2xl text-left transition-all duration-300
                ${isSelected
                  ? 'bg-gradient-to-br from-purple-600/20 to-blue-600/20 border-2 border-purple-500/60'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                }
              `}
            >
              {/* 选中标记 */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              {/* 风格图标 */}
              <div className="text-3xl mb-3">{style.icon}</div>

              {/* 风格编号和名称 */}
              <div className="flex items-center gap-2 mb-2">
                <span className={`
                  inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold
                  ${isSelected
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-white/60'
                  }
                `}>
                  {style.id}
                </span>
                <h3 className="font-semibold text-white">{style.name}</h3>
              </div>

              {/* 英文名称 */}
              <p className="text-xs text-white/50 mb-2">{style.nameEn}</p>

              {/* 描述 */}
              <p className="text-sm text-white/70 mb-3">{style.description}</p>

              {/* 特征标签 */}
              <div className="flex flex-wrap gap-2">
                {style.features.map((feature) => (
                  <span
                    key={feature}
                    className={`
                      text-xs px-2 py-1 rounded-full
                      ${isSelected
                        ? 'bg-purple-500/30 text-purple-200'
                        : 'bg-white/5 text-white/50'
                      }
                    `}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
