import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kelsey Portrait - 多风格人像绘画生成器',
  description: '融合 Kelsey Hsiao 的四种标志性艺术风格，生成专业级的艺术肖像。数字印象主义、炭笔线条、半写实动漫、彩色数字肖像。',
  keywords: ['AI绘画', '人像生成', 'Kelsey Hsiao', '数字艺术', '艺术风格'],
  authors: [{ name: 'Kelsey Portrait' }],
  openGraph: {
    title: 'Kelsey Portrait - 多风格人像绘画生成器',
    description: '融合 Kelsey Hsiao 的四种标志性艺术风格，生成专业级的艺术肖像。',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
