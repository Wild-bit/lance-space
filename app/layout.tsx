import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

/**
 * 应用元数据配置
 */
export const metadata: Metadata = {
  title: "Lance Space - 个人站点",
  description:
    "基于 Next.js + React + TypeScript + shadcn/ui + TailwindCSS 的搭建的个人站点",
};

/**
 * 根布局组件
 * @param children 子组件
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
