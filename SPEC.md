# Kelsey Portrait - 多风格人像绘画生成器

## 1. Concept & Vision

**Kelsey Portrait** 是一款优雅的人像绘画生成器，融合 Kelsey Hsiao 的四种标志性艺术风格。用户通过简洁的界面选择风格、描述人物特征，即可生成专业级的艺术肖像提示词，并可直接生成图像。

应用呈现**数字艺术画廊**的质感：深邃的背景如同夜空，渐变光晕烘托艺术氛围，让用户在创作过程中就感受到艺术的魅力。

## 2. Design Language

### 2.1 Aesthetic Direction
**数字艺术画廊风格** — 深色背景配合流动渐变，营造沉浸式艺术创作空间。如同在高端数字画廊中欣赏艺术作品。

### 2.2 Color Palette

| 用途 | 色值 | 说明 |
|------|------|------|
| **Primary Gradient** | `#667eea` → `#764ba2` | 主渐变，呼应数字艺术感 |
| **Accent Warm** | `#f093fb` → `#f5576c` | 温暖强调色，用于高亮 |
| **Accent Cool** | `#4facfe` → `#00f2fe` | 冷色强调，用于次级元素 |
| **Background Dark** | `#0f0f1a` | 主背景 |
| **Background Card** | `rgba(255, 255, 255, 0.03)` | 卡片背景 |
| **Text Primary** | `#ffffff` | 主要文字 |
| **Text Secondary** | `rgba(255, 255, 255, 0.6)` | 次要文字 |
| **Border** | `rgba(255, 255, 255, 0.1)` | 边框色 |

### 2.3 Typography

| 用途 | 字体 | 规格 |
|------|------|------|
| **Headings** | Poppins | 700, 36-48px |
| **Subheadings** | Poppins | 600, 20-24px |
| **Body** | Inter | 400, 14-16px |
| **Labels** | Inter | 500, 12-14px |
| **Code/Prompt** | JetBrains Mono | 400, 13px |

### 2.4 Spatial System

- **Base Unit**: 4px
- **Spacing Scale**: 4, 8, 12, 16, 24, 32, 48, 64, 96px
- **Border Radius**: 8px (small), 16px (medium), 24px (large), 9999px (pill)
- **Container Max Width**: 1200px
- **Card Padding**: 24-32px

### 2.5 Motion Philosophy

| 元素 | 动画 | 持续时间 | 缓动 |
|------|------|----------|------|
| **Hover Lift** | translateY(-4px) + shadow | 200ms | ease-out |
| **Gradient Flow** | 背景渐变缓慢流动 | 8s | linear, infinite |
| **Card Appear** | opacity + translateY | 400ms | ease-out |
| **Button Press** | scale(0.98) | 100ms | ease-out |
| **Tab Switch** | opacity fade | 200ms | ease |
| **Loading Pulse** | opacity + scale | 1.5s | ease-in-out, infinite |

### 2.6 Visual Assets

- **Icons**: Lucide React（线性风格，stroke-width: 1.5）
- **Decorative**: 流动渐变背景、柔和光晕效果、玻璃拟态卡片
- **Images**: 生成的肖像画作为主要展示内容

## 3. Layout & Structure

### 3.1 Page Architecture

```
┌─────────────────────────────────────────┐
│           [流动渐变背景层]                 │
│  ┌───────────────────────────────────┐  │
│  │         Logo + 标题区域              │  │
│  │    "Kelsey Portrait"                │  │
│  │    副标题: 多风格人像绘画生成器        │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌─────────────────┐ ┌───────────────┐  │
│  │   左侧控制面板    │ │   右侧预览区   │  │
│  │                 │ │               │  │
│  │  [风格选择卡片]   │ │  [生成的图像]  │  │
│  │  A 数字印象主义  │ │               │  │
│  │  B 炭笔线条     │ │   或           │  │
│  │  C 半写实动漫   │ │               │  │
│  │  D 彩色数字肖像  │ │  [加载动画]    │  │
│  │                 │ │               │  │
│  │  [人物描述区]    │ │               │  │
│  │  - 外貌描述     │ │  [操作按钮]    │  │
│  │  - 发型发色     │ │  下载/复制提示词│  │
│  │  - 表情姿态     │ │               │  │
│  │  - 服装配饰     │ │               │  │
│  │                 │ │               │  │
│  │  [生成按钮]     │ │               │  │
│  └─────────────────┘ └───────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │         [生成的提示词展示]           │  │
│  │   可复制，带语法高亮                 │  │
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

### 3.2 Responsive Strategy

| 断点 | 布局 |
|------|------|
| **< 768px (Mobile)** | 单列布局，控制面板在上，预览在下 |
| **768-1024px (Tablet)** | 双列布局，缩小间距 |
| **> 1024px (Desktop)** | 完整双列布局，最大宽度1200px |

### 3.3 Visual Pacing

- **Hero区域**: 标题渐入动画，logo呼吸光晕
- **控制面板**: 毛玻璃卡片，轻微悬浮效果
- **预览区域**: 边框渐变光晕，图像生成时有脉冲动画
- **提示词展示**: 代码块风格，复制按钮悬浮

## 4. Features & Interactions

### 4.1 Core Features

#### 4.1.1 风格选择 (Style Selection)
- **四种风格卡片**，带图标和描述
- 点击选择时：边框渐变高亮 + 轻微放大
- 悬停时：卡片微微上浮 + 边框发光
- 选中状态：持续渐变边框 + 勾选标记

#### 4.1.2 人物描述输入 (Character Description)
- **Tab分组**：
  - 外貌 (Appearance)
  - 发型 (Hairstyle)
  - 表情 (Expression)
  - 服装 (Clothing)
  - 自定义 (Custom)
- 每个Tab包含预设选项 + 自由输入
- 预设选项为Chip样式，点击添加
- 自由输入为Textarea，自动补全建议

#### 4.1.3 提示词生成 (Prompt Generation)
- 根据所选风格和描述自动组装提示词
- 包含风格特征、色板、签名规范
- 可编辑/微调生成的提示词
- 一键复制，带成功提示

#### 4.1.4 图像生成 (Image Generation)
- **使用 Replicate API + Flux 模型**
- 支持参数调整（尺寸、步数、CFG）
- 实时进度显示（polling状态）
- 生成完成自动展示
- 支持下载高清图像

### 4.2 Interaction Flows

#### 生成图像流程
```
用户选择风格 → 输入描述 → 点击"生成" →
显示加载动画 → 调用API → 轮询状态 →
生成完成 → 展示图像 + 下载按钮
```

#### 错误处理
- API 失败：显示友好错误提示 + 重试按钮
- 网络错误：提示检查网络 + 离线模式（仅显示提示词）
- 参数缺失：输入框红色边框 + 提示信息

### 4.3 Edge Cases

- **空描述**：使用通用描述模板
- **过长描述**：自动截断 + 提示
- **重复生成**：禁用按钮 + 加载状态
- **API限额**：提示剩余次数 + 升级建议

## 5. Component Inventory

### 5.1 StyleCard 风格卡片

| 状态 | 样式 |
|------|------|
| **Default** | 透明背景，1px边框，白色文字 |
| **Hover** | 背景微亮，轻微上浮，边框发光 |
| **Selected** | 渐变边框，背景渐变，选中图标 |
| **Disabled** | 50%透明度，cursor: not-allowed |

### 5.2 InputGroup 输入组

| 元素 | 说明 |
|------|------|
| **Label** | 小号文字，次要颜色 |
| **Textarea** | 深色背景，聚焦时渐变边框 |
| **Chip** | 胶囊样式，可点击添加/移除 |
| **Helper** | 小号文字，错误时变红色 |

### 5.3 Button 按钮

| 变体 | 用途 | 样式 |
|------|------|------|
| **Primary** | 主要操作 | 渐变背景，白色文字 |
| **Secondary** | 次要操作 | 透明背景，渐变边框 |
| **Ghost** | 图标按钮 | 透明背景，hover时显示 |
| **Loading** | 加载状态 | 禁用+旋转图标 |

### 5.4 ImagePreview 图片预览

| 状态 | 样式 |
|------|------|
| **Empty** | 占位图+提示文字 |
| **Loading** | 脉冲动画+进度文字 |
| **Success** | 图像展示+操作按钮 |
| **Error** | 错误图标+重试按钮 |

### 5.5 PromptDisplay 提示词展示

- 代码块风格
- 语法高亮（关键词着色）
- 复制按钮（右上角）
- 滚动条样式定制

## 6. Technical Approach

### 6.1 Stack

| 层级 | 技术 |
|------|------|
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS + CSS Variables |
| **Components** | React 18 + TypeScript |
| **State** | React useState/useContext |
| **API** | Next.js API Routes |
| **Image Gen** | Replicate API (Flux.1-schnell) |

### 6.2 Project Structure

```
kelsey-portrait/
├── app/
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 主页面
│   ├── globals.css         # 全局样式
│   └── api/
│       └── generate/
│           └── route.ts    # 图像生成API
├── components/
│   ├── StyleSelector.tsx   # 风格选择器
│   ├── DescriptionInput.tsx # 描述输入
│   ├── PromptDisplay.tsx   # 提示词展示
│   ├── ImagePreview.tsx    # 图像预览
│   └── ui/                 # 通用UI组件
├── lib/
│   ├── prompt-builder.ts   # 提示词构建器
│   └── replicate.ts        # Replicate API封装
├── types/
│   └── index.ts            # 类型定义
└── package.json
```

### 6.3 API Design

#### POST /api/generate

**Request:**
```json
{
  "prompt": "生成的提示词文本",
  "style": "A|B|C|D"
}
```

**Response (Success):**
```json
{
  "id": "replicate_prediction_id",
  "status": "processing"
}
```

**Response (Polling):**
```json
{
  "status": "succeeded",
  "output": ["image_url"]
}
```

### 6.4 Environment Variables

```
REPLICATE_API_TOKEN=xxx  # Replicate API密钥
```

### 6.5 Image Generation Parameters

| 参数 | 值 | 说明 |
|------|------|------|
| **Model** | black-forest-labs/flux-schnell | 快速生成模型 |
| **Width** | 1024 | 固定宽度 |
| **Height** | 1024/1280 | 根据风格变化 |
| **Num_Inference_Steps** | 4 | 快速模式 |
| **Guidance_Scale** | 7.5 | CFG强度 |
| **Prompt** | Kelsey风格提示词 | 输入提示词 |

## 7. Kelsey 风格提示词模板

### 风格 A: 数字印象主义
- 冷暖色对比（青蓝背景 + 暖桃肤色）
- painterly笔触
- 氛围优先

### 风格 B: 炭笔线条
- 粗炭笔质感
- 纯白背景
- 头发由独立线条构成

### 风格 C: 半写实动漫
- 纯色背景
- 瓷器肌肤
- 白色光点效果

### 风格 D: 彩色数字肖像
- 15-20色相
- 边缘变化（硬/软/消失）
- 饱和度层级

所有风格均包含：
- Kelsey Hsiao 手写签名
- 高质量数字绘画
- 专业构图比例
