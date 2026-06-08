# Kelsey Portrait

多风格人像绘画生成器，融合 Kelsey Hsiao 的四种标志性艺术风格。

![Kelsey Portrait](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ 功能特性

- **四种艺术风格**：数字印象主义、炭笔线条、半写实动漫、彩色数字肖像
- **智能提示词生成**：根据选择自动构建专业级提示词
- **实时图像生成**：集成 Replicate API 和 Flux 模型
- **现代化 UI**：深色主题、流动渐变、玻璃拟态设计
- **响应式布局**：完美适配桌面和移动设备

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-username/kelsey-portrait.git
cd kelsey-portrait
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 为 `.env.local` 并填入你的 Replicate API Token：

```bash
cp .env.example .env.local
```

```env
REPLICATE_API_TOKEN=your_replicate_api_token_here
```

获取 API Token：[Replicate API Tokens](https://replicate.com/account/api-tokens)

### 4. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 5. 构建生产版本

```bash
npm run build
npm start
```

## 📦 部署到 Vercel

### 方法一：使用 Vercel CLI

```bash
npm i -g vercel
vercel
```

### 方法二：使用 GitHub 集成

1. 将项目推送到 GitHub
2. 在 [vercel.com](https://vercel.com) 导入项目
3. 添加环境变量 `REPLICATE_API_TOKEN`
4. 点击 Deploy

### 方法三：手动部署

1. 构建项目：`npm run build`
2. 上传 `.vercel` 目录到 Vercel
3. 配置环境变量

## 🎨 四种艺术风格

### A. 数字印象主义 (Digital Impressionism)

- 互补冷暖色对比
- painterly 笔触质感
- 氛围感优先

### B. 炭笔线条 (Charcoal Line Art)

- 粗炭笔颗粒质感
- 纯白背景，呼吸感线条
- 头发由独立线条构成

### C. 半写实动漫 (Semi-Realistic Anime)

- 纯色/渐变纯色背景
- 光滑瓷器般肌肤
- 梦幻白色光点效果

### D. 彩色数字肖像 (Color Digital Portrait)

- 15-20 个色相丰富色彩
- 硬/软/消失边缘变化
- 饱和度层级分明

## 🛠️ 技术栈

- **框架**：Next.js 14 (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **图标**：Lucide React
- **AI 模型**：Replicate (Flux.1-schnell)
- **部署**：Vercel

## 📁 项目结构

```
kelsey-portrait/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts    # 图像生成 API
│   ├── globals.css         # 全局样式
│   ├── layout.tsx          # 根布局
│   └── page.tsx            # 主页面
├── components/
│   ├── DescriptionInput.tsx # 描述输入组件
│   ├── ImagePreview.tsx    # 图像预览组件
│   ├── PromptDisplay.tsx   # 提示词展示组件
│   └── StyleSelector.tsx   # 风格选择组件
├── lib/
│   ├── prompt-builder.ts   # 提示词构建器
│   └── replicate.ts        # Replicate API 封装
├── types/
│   └── index.ts            # 类型定义
├── SPEC.md                 # 设计规范文档
└── package.json
```

## 🔧 环境变量

| 变量名 | 必填 | 说明 |
|--------|------|------|
| `REPLICATE_API_TOKEN` | 是 | Replicate API 密钥 |

## ☕ 赞赏支持

如果你觉得这个项目对你有帮助，欢迎扫码支持一下！🙏

<div align="center">

### Happy 的赞赏码

![微信赞赏码](donate.jpg)

*感恩遇见，感谢支持*

</div>

## 📝 License

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Kelsey Hsiao](https://www.instagram.com/) - 艺术风格灵感来源
- [Replicate](https://replicate.com/) - AI 模型托管
- [Vercel](https://vercel.com/) - 部署平台
- [Lucide](https://lucide.dev/) - 精美图标

---

Made with ❤️ for art lovers
