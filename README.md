# React 管理系统 框架模版

基于 Vite + React + TypeScript + Ant Design + TailwindCSS 构建的现代化管理系统

## 技术栈

- **构建工具**: Vite 6.3.*
- **前端框架**: React 19.1.*
- **开发语言**: TypeScript 5.8.*
- **UI 组件库**: Ant Design 5.26.1
- **样式框架**: TailwindCSS 4.1.10
- **路由管理**: React Router 7.6.2
- **状态管理**: Zustand 5.0.5
- **HTTP 客户端**: Axios 1.10.0 + React Query 5.80.10
- **代码规范**: Biome 2.0.0
- **包管理**: pnpm 10.12.2 (Corepack 管理)

## 项目结构

```
react-console-tel/
├── config/                       # vite 配置文件
├── public/                       # 静态资源
├── scripts/                      # 构建脚本
├── src/                          # 源代码
│   ├── assets/                   # 图片、字体、CSS 等静态资源
│   │   ├── icon/                 # 图标文件
│   │   └── styles/               # 样式文件
│   ├── components/               # 公共组件
│   ├── pages/                    # 页面组件
│   │   └── pageDoc/              # 页面文件
│   ├── services/                 # API 服务
│   │   └── request/              # 请求配置封装
│   │       ├── api.ts            # 通用 API 方法
│   │       ├── types.ts          # 请求类型定义
│   │       ├── interceptor.ts    # 请求拦截器
│   │       └── error.ts          # 错误处理
│   ├── modules/                  # 业务模块
│   │   └── common/               # 通用模块
│   │       ├── types.ts          # 类型定义
│   │       ├── common.api.ts     # API 接口
│   │       └── common.store.ts   # 状态管理
│   │       └── common.enum.ts    # 枚举常量
│   ├── stores/                   # 全局状态管理
│   ├── utils/                    # 工具函数
│   │   └── index.ts              # 通用工具函数
│   ├── hooks/                    # 自定义 Hooks
│   ├── index.css                 # 全局样式
│   ├── main.tsx                  # 应用入口
│   └── App.tsx                   # 根组件
├── types/                        # 全局类型定义
│   └── global.d.ts               # 全局类型
├── .cursorrules                  # 项目开发规范
├── biome.json                    # 代码规范配置
├── tailwind.config.js            # TailwindCSS 配置
├── postcss.config.js             # PostCSS 配置
├── vite.config.ts                # Vite 配置
├── tsconfig.json                 # TypeScript 配置
└── package.json                  # 项目依赖
```

## 核心特性

### 1. 类型安全
- 完整的 TypeScript 类型定义
- API 请求/响应类型安全
- 组件 Props 类型检查

### 2. 标准化请求封装
- 统一的 API 请求处理
- 请求/响应拦截器
- 错误处理机制
- 自动 Token 管理

### 3. 状态管理
- Zustand 轻量级状态管理
- 持久化存储支持
- 模块化状态设计

### 4. 代码规范
- Biome 代码格式化和检查
- 统一的编码风格
- Git 提交规范

### 5. 样式系统
- TailwindCSS 实用类优先
- Ant Design 组件库
- 响应式设计支持

## 快速开始

### 环境要求

- Node.js >= 18.x
- pnpm >= 8.x

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

### 代码检查和格式化

```bash
# 代码检查
pnpm lint

# 自动修复
pnpm lint:fix

# 格式化代码
pnpm format

# 全面检查
pnpm check
```

## 开发规范

### API 开发流程

1. 在 `modules/{业务模块}/{模块}.types.ts` 定义业务类型
2. 在 `modules/{业务模块}/{模块}.api.ts` 实现请求方法
3. 在 `modules/{业务模块}/{模块}.store.ts` 创建状态管理
3. 在 `modules/{业务模块}/{模块}.enum.ts` 创建枚举状态
5. 业务页面使用 store 中的状态和方法

### 组件开发规范

1. 使用函数组件 + TypeScript
2. Props 类型使用 interface 定义
3. 样式优先使用 TailwindCSS
4. 复杂组件拆分为子组件

### 提交规范

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
```

## 环境变量

创建 `.env` 文件配置环境变量：

```bash
# 应用信息
VITE_APP_ENV=development
VITE_PROXY_ENV=test

# API 配置
VITE_API_BASE_URL=http://localhost:8080/api
```

## 部署

### 构建

```bash
pnpm build
```

### 预览

```bash
pnpm preview
```

构建产物在 `dist` 目录中，可以部署到任何静态文件服务器。

## 许可证

本项目采用 MIT 许可证。
