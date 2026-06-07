# Kelsey Portrait - Vercel 部署指南

## 📋 部署前准备

### 1. 获取 Replicate API Token

1. 访问 [Replicate](https://replicate.com/)
2. 注册/登录账户
3. 进入 [API Tokens 页面](https://replicate.com/account/api-tokens)
4. 点击 "Create Token" 创建一个新 Token
5. 复制生成的 Token（格式：`r8_xxxxxxxxxxxx`）

### 2. 准备代码仓库

将项目代码推送到 GitHub：

```bash
# 在项目目录中初始化 Git
cd kelsey-portrait
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Kelsey Portrait"

# 创建 GitHub 仓库并推送
git remote add origin https://github.com/YOUR_USERNAME/kelsey-portrait.git
git push -u origin main
```

## 🚀 部署到 Vercel

### 方法一：使用 GitHub 集成（推荐）

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "Sign Up" 注册或 "Log In" 登录
3. 点击 "Add New..." → "Project"
4. 选择 "Import Git Repository"
5. 选择你刚创建的 GitHub 仓库
6. 在 "Environment Variables" 中添加：
   - **Name**: `REPLICATE_API_TOKEN`
   - **Value**: 你从 Replicate 获取的 Token
7. 点击 "Deploy"
8. 等待部署完成（约 2-3 分钟）
9. 获得你的网站 URL：`https://your-project.vercel.app`

### 方法二：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录 Vercel
vercel login

# 进入项目目录
cd kelsey-portrait

# 部署（首次部署）
vercel

# 设置环境变量
vercel env add REPLICATE_API_TOKEN

# 再次部署
vercel --prod
```

### 方法三：本地构建后部署

```bash
# 安装依赖
npm install

# 构建项目
npm run build

# 手动将 .next 文件夹部署到 Vercel
# （不推荐，需要手动配置）
```

## ⚙️ 部署配置

项目已包含以下 Vercel 配置文件：

### `vercel.json`（可选）

如果需要自定义配置，创建 `vercel.json`：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "REPLICATE_API_TOKEN": "@replicate-api-token"
  }
}
```

### 环境变量配置

在 Vercel Dashboard 中配置：

| 变量名 | 类型 | 说明 |
|--------|------|------|
| `REPLICATE_API_TOKEN` | Secret | Replicate API 密钥 |

## 🔧 本地开发

### 安装依赖

```bash
npm install
```

### 复制环境变量文件

```bash
cp .env.example .env.local
```

### 编辑 `.env.local`

```
REPLICATE_API_TOKEN=your_actual_token_here
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
npm start
```

## 🐛 常见问题

### 1. 部署失败

**检查项**：
- [ ] GitHub 仓库是否公开
- [ ] 环境变量是否正确设置
- [ ] package.json 是否有语法错误

**解决方案**：
```bash
# 本地测试构建
npm run build

# 检查构建错误
npm run build 2>&1 | head -50
```

### 2. 图像生成失败

**可能原因**：
- API Token 无效或过期
- Replicate API 限额已用完
- 网络连接问题

**解决方案**：
1. 检查 Vercel 环境变量是否正确配置
2. 访问 Replicate 确认账户状态
3. 查看 Vercel 函数日志

### 3. 图片无法加载

**原因**：Next.js 图片域名未配置

**解决方案**：
已在 `next.config.js` 中配置了 Replicate 和相关域名。

### 4. 函数执行超时

**原因**：图像生成需要时间

**解决方案**：
Vercel Serverless Function 默认超时 10 秒。对于图像生成，可能需要：
1. 优化 API 调用
2. 使用 Vercel Pro 的更长超时设置
3. 考虑使用 Webhook 回调

## 💰 成本估算

### Replicate 费用

- Flux.1-schnell 模型：约 $0.003-0.005/次
- 免费额度：每月 100 次
- 查看详情：[Replicate 定价](https://replicate.com/pricing)

### Vercel 费用

- Hobby 计划：免费（100GB 带宽/月）
- Pro 计划：$20/月（无限带宽）
- 查看详情：[Vercel 定价](https://vercel.com/pricing)

## 🌐 自定义域名（可选）

1. 在 Vercel 项目设置中点击 "Domains"
2. 输入你的域名
3. 按照指示添加 DNS 记录
4. 等待 SSL 证书自动配置

## 📊 监控和维护

### 查看日志

```bash
# 使用 Vercel CLI
vercel logs your-project
```

### 设置警报

在 Vercel Dashboard 中：
1. 进入项目 → "Functions"
2. 点击 "Create Alert"
3. 设置错误率或响应时间阈值

## 🔒 安全建议

1. **不要将 API Token 提交到 Git**
   - `.env.local` 已在 `.gitignore` 中
   - 仅使用 Vercel 环境变量

2. **限制 API 使用**
   - 在 Replicate 设置用量限制
   - 考虑添加速率限制

3. **监控异常使用**
   - 定期检查 API 调用记录
   - 设置账单警报

## 📞 获取帮助

- [Vercel 文档](https://vercel.com/docs)
- [Replicate 文档](https://replicate.com/docs)
- [Next.js 文档](https://nextjs.org/docs)

---

**部署成功了吗？** 🎉

如果部署遇到问题，请检查：
1. 环境变量配置
2. 构建日志
3. 函数执行日志

祝部署顺利！
