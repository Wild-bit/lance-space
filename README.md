# Lance React 管理系统

基于 Next.js + React + TypeScript + TailwindCSS 构建的现代化管理系统框架

## 技术栈

- **框架**: Next.js 15.x
- **前端库**: React 19.1.*
- **开发语言**: TypeScript 5.8.*
- **样式框架**: TailwindCSS 4.1.10
- **状态管理**: Zustand 5.0.5
- **HTTP 客户端**: Axios 1.10.0
- **代码规范**: Biome 2.0.0
- **包管理**: pnpm 10.10.0 (Corepack 管理)

## 项目结构

```
lance-space/
├── .env.production          # 生产环境配置
├── .env.testing            # 测试环境配置
├── .gitignore              # Git 忽略文件
├── .npmrc                  # npm 配置
├── .trae/                  # Trae AI 配置
│   └── rules/
│       └── project_rules.md
├── README.md               # 项目文档
├── app/                    # Next.js App Router
│   ├── globals.css         # 全局样式
│   ├── guide-components/   # 组件指南页面
│   │   └── page.tsx
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页
│   └── providers.tsx       # 全局提供者
├── biome.json              # Biome 配置
├── components/             # 组件库
│   └── ui/                 # UI 组件
│       ├── Button/         # 按钮组件
│       ├── Card/           # 卡片组件
│       ├── Form/           # 表单组件
│       ├── Input/          # 输入框组件
│       └── Label/          # 标签组件
├── lib/                    # 工具库
│   └── utils.ts            # 通用工具函数
├── next-env.d.ts           # Next.js 类型声明
├── next.config.js          # Next.js 配置
├── package.json            # 项目依赖
├── pnpm-lock.yaml          # 依赖锁定文件
├── postcss.config.js       # PostCSS 配置
├── scripts/                # 构建脚本
│   └── build-cf.ts         # Cloudflare 构建脚本
├── tailwind.config.js      # TailwindCSS 配置
├── tsconfig.json           # TypeScript 配置
└── types/                  # 类型定义
    └── global.d.ts         # 全局类型声明
```


## 核心特性

### 1. 现代化架构
- Next.js App Router 架构
- 服务端渲染 (SSR) 支持
- 静态站点生成 (SSG) 支持
- API Routes 集成

### 2. 类型安全
- 完整的 TypeScript 类型定义
- 严格的类型检查
- 组件 Props 类型安全

### 3. 组件化设计
- 模块化 UI 组件库
- CSS Modules 样式隔离
- 可复用组件架构
- 响应式设计支持

### 4. 开发体验
- 热重载开发环境
- Biome 代码格式化和检查
- 统一的编码风格
- Git 提交规范

### 5. 样式系统
- TailwindCSS 实用类优先
- CSS Modules 样式隔离
- 深色主题支持
- 响应式设计

## 快速开始

### 环境要求

- Node.js >= 18.x
- pnpm >= 10.x

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
```



## 开发规范

### 组件开发规范

1. **组件结构**
   - 每个组件使用独立文件夹
   - 包含 `.tsx`、`.module.css`、`index.ts` 文件
   - 使用 TypeScript 严格类型检查

2. **样式规范**
   - 优先使用 TailwindCSS 实用类
   - 复杂样式使用 CSS Modules
   - 支持深色主题和响应式设计

3. **类型定义**
   - Props 使用 interface 定义
   - 导出组件相关类型
   - 添加完整的 JSDoc 注释

### 页面开发规范

1. **App Router 结构**
   - 使用 `app/` 目录结构
   - 页面文件命名为 `page.tsx`
   - 布局文件命名为 `layout.tsx`

2. **API Routes**
   - API 路由放在 `app/api/` 目录
   - 使用 Next.js 13+ 的新 API 格式
   - 支持 GET、POST、PUT、DELETE 方法

3. **状态管理**
   - 使用 Zustand 进行全局状态管理
   - 组件内状态使用 React Hooks
   - 服务端状态使用 React Query (可选)

### Git 提交规范

```
type(scope): description

类型：
- feat: 新功能
- fix: 修复bug
- docs: 文档更新
- style: 代码样式
- refactor: 重构代码
- test: 测试相关
- chore: 构建/工具变更
- perf: 性能优化
```

### 代码质量

```bash
# 代码检查
pnpm lint

# 自动修复
pnpm lint:fix

# 格式化代码
pnpm format

# 类型检查
pnpm type-check
```
## 部署

### 本地构建

```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

### 静态导出 (可选)

```bash
# 导出静态文件
pnpm export
```

### 部署平台

- **Vercel**: 推荐部署平台，零配置部署
- **Netlify**: 支持静态站点和 Serverless 函数
- **Cloudflare Pages**: 使用 `scripts/build-cf.ts` 脚本
- **传统服务器**: 使用 `pnpm start` 启动 Node.js 服务

## 项目特色

### 🎨 现代化 UI 组件
- 基于 CSS Modules 的样式隔离
- 支持深色主题切换
- 完整的响应式设计
- 无障碍访问支持

### 🚀 开发体验
- TypeScript 严格类型检查
- 热重载开发环境
- 代码自动格式化
- Git 提交规范检查

### 📱 多端适配
- 移动端友好设计
- 平板设备优化
- 桌面端完整体验

### ⚡ 性能优化
- Next.js 自动代码分割
- 图片自动优化
- 字体优化加载
- 构建产物压缩

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 [Issue](https://github.com/your-username/lance-space/issues)
- 发送邮件至：your-email@example.com

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！
