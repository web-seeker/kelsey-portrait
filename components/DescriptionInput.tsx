'use client';

import { useState } from 'react';
import { DescriptionData } from '@/types';
import { User, Scissors, Smile, Shirt, Plus } from 'lucide-react';

interface DescriptionInputProps {
  data: DescriptionData;
  onChange: (data: DescriptionData) => void;
}

type TabKey = keyof DescriptionData;

const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'appearance', label: '外貌', icon: <User className="w-4 h-4" /> },
  { key: 'hairstyle', label: '发型', icon: <Scissors className="w-4 h-4" /> },
  { key: 'expression', label: '表情', icon: <Smile className="w-4 h-4" /> },
  { key: 'clothing', label: '服装', icon: <Shirt className="w-4 h-4" /> },
  { key: 'custom', label: '自定义', icon: <Plus className="w-4 h-4" /> },
];

const presets: Record<TabKey, string[]> = {
  appearance: [
    'young Asian woman',
    'young man with sharp features',
    'elegant elderly woman',
    'beautiful young girl',
    'handsome middle-aged man',
    'teenage boy',
    'beautiful woman with freckles',
    'man with beard',
    'child with innocent eyes',
  ],
  hairstyle: [
    'long flowing black hair',
    'short bob hair',
    'wavy auburn hair',
    'straight blonde hair',
    'curly brown hair',
    'ponytail',
    'braided hair',
    'long curly hair',
    'short messy hair',
  ],
  expression: [
    'gentle contemplative expression',
    'confident smile',
    'serene calm expression',
    'playful wink',
    'serious thoughtful gaze',
    'soft smile',
    'laughing happily',
    'melancholic distant look',
  ],
  clothing: [
    'white turtleneck sweater',
    'elegant evening dress',
    'casual t-shirt',
    'vintage dress',
    'business suit',
    'bohemian style',
    'formal blazer',
    'cozy sweater',
  ],
  custom: [],
};

export default function DescriptionInput({ data, onChange }: DescriptionInputProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('appearance');
  const [customChips, setCustomChips] = useState<string[]>([]);
  const [customInput, setCustomInput] = useState('');

  const handlePresetClick = (preset: string) => {
    const currentValue = data[activeTab];
    const newValue = currentValue ? `${currentValue}, ${preset}` : preset;
    onChange({ ...data, [activeTab]: newValue });
  };

  const handleTextChange = (key: TabKey, value: string) => {
    onChange({ ...data, [key]: value });
  };

  const handleAddCustomChip = () => {
    if (customInput.trim()) {
      setCustomChips([...customChips, customInput.trim()]);
      const currentCustom = data.custom;
      const newCustom = currentCustom ? `${currentCustom}, ${customInput.trim()}` : customInput.trim();
      onChange({ ...data, custom: newCustom });
      setCustomInput('');
    }
  };

  const handleRemoveCustomChip = (chip: string) => {
    setCustomChips(customChips.filter(c => c !== chip));
    const newCustom = data.custom
      .split(', ')
      .filter(c => c !== chip)
      .join(', ');
    onChange({ ...data, custom: newCustom });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white mb-4">人物描述</h2>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all
              ${activeTab === tab.key
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }
            `}
          >
            {tab.icon}
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Presets for non-custom tabs */}
      {activeTab !== 'custom' && presets[activeTab].length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-white/50">点击添加预设描述：</p>
          <div className="flex flex-wrap gap-2">
            {presets[activeTab].map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetClick(preset)}
                className="chip text-xs"
              >
                + {preset}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom input for custom tab */}
      {activeTab === 'custom' && (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddCustomChip()}
              placeholder="输入自定义描述..."
              className="input-field flex-1"
            />
            <button
              onClick={handleAddCustomChip}
              className="btn-primary whitespace-nowrap"
            >
              添加
            </button>
          </div>

          {customChips.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {customChips.map((chip) => (
                <span
                  key={chip}
                  className="chip active flex items-center gap-2"
                >
                  {chip}
                  <button
                    onClick={() => handleRemoveCustomChip(chip)}
                    className="hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Textarea for current tab */}
      <div className="space-y-2">
        <label className="text-sm text-white/50">
          {tabs.find(t => t.key === activeTab)?.label}描述（可直接编辑）
        </label>
        <textarea
          value={data[activeTab]}
          onChange={(e) => handleTextChange(activeTab, e.target.value)}
          placeholder={activeTab === 'custom'
            ? '输入任何你想要添加到肖像中的描述...'
            : `描述人物的${tabs.find(t => t.key === activeTab)?.label.toLowerCase()}特征...`
          }
          className="input-field"
          rows={4}
        />
      </div>

      {/* 提示 */}
      <p className="text-xs text-white/40 mt-4">
        💡 提示：多个描述用逗号分隔，描述越详细生成效果越好
      </p>
    </div>
  );
}
