# Trae AI Rules for Lance React 管理系统

## 项目概述
- **项目名称**: Lance React 管理系统
- **技术栈**: Vite 5 + React 18 + TypeScript 5 + Ant Design 5 + TailwindCSS
- **包管理器**: pnpm 8.x
- **版本**: 1.1.0
- **语言**: 中文（所有注释和文档使用中文）

## 核心开发原则

### 1. 类型安全第一
- 所有 API 交互必须有完整的 TypeScript 类型定义
- 禁止使用 `any` 类型，特殊场景使用 `unknown` 替代
- 所有组件 Props 必须使用 `interface` 定义
- 泛型命名使用单字母大写 (T, U, K)

### 2. 分层架构
```
表现层 (UI 组件) 
    ↓
业务层 (模块化状态管理)
    ↓  
服务层 (API 请求封装)
```

### 3. 请求标准化
- 所有 HTTP 请求必须通过 `services/request` 封装
- 使用自定义的拦截器模式，不使用 Axios 原生拦截器
- API 优先在 `.store.ts` 状态里使用，业务页面不直接调用接口

## 代码生成规范

### React 组件
```typescript
/**
 * 用户卡片组件
 * @param userId 用户ID
 * @param onSelect 选择回调函数
 */
interface UserCardProps {
  userId: string;
  onSelect?: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ userId, onSelect }) => {
  // 组件逻辑
  return (
    <div className="p-4 border rounded-lg">
      {/* 组件内容 */}
    </div>
  );
};

export default UserCard;
```

### API 请求封装
```typescript
// modules/demo/api.ts
import { http } from '@/services/request/api';
import type { DemoQueryParams, DemoListItem } from './types';

/**
 * 获取演示数据列表
 * @param params 查询参数
 * @returns 演示数据列表
 */
export const fetchDemoList = (params: DemoQueryParams) => {
  return http.get<DemoListItem[]>('/api/demo', params);
};
```

### 状态管理 (Zustand)
```typescript
// modules/demo/demo.store.ts
import { create } from 'zustand';
import type { DemoState, DemoActions } from './types';

/**
 * 演示模块状态管理
 */
export const useDemoStore = create<DemoState & DemoActions>((set, get) => ({
  // 状态
  demoList: [],
  loading: false,
  
  // 操作
  fetchDemoList: async (params) => {
    set({ loading: true });
    try {
      const data = await fetchDemoList(params);
      set({ demoList: data, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
}));
```

## 文件结构规范

### 目录组织
```
src/
├── components/           # 公共组件
├── pages/               # 页面组件
├── modules/             # 业务模块（按业务划分）
│   ├── common/          # 公共业务模块
│   │   ├── common.api.ts
│   │   ├── common.store.ts
│   │   └── types.ts
│   └── [业务模块]/
│       ├── [模块].api.ts
│       ├── [模块].store.ts
│       └── types.ts
├── services/            # API 服务
│   └── request/         # 请求封装
│       ├── types.ts     # 请求/响应类型
│       ├── client.ts    # HTTP 客户端
│       ├── define.ts    # API 定义工厂
│       ├── interceptor.ts # 拦截器管理
│       └── utils.ts     # 工具函数
├── utils/               # 工具函数
├── hooks/               # 自定义 Hooks
└── stores/              # 全局状态管理
```

### 命名规范
- **文件名**: kebab-case (user-list.tsx)
- **组件名**: PascalCase (UserList)
- **函数名**: camelCase (fetchUserList)
- **常量名**: UPPER_SNAKE_CASE (API_BASE_URL)
- **类型名**: PascalCase (UserListItem)

## 错误处理规范

### API 错误处理
```typescript
/**
 * 标准化错误处理
 */
export class ApiError<T> extends Error {
  constructor(
    public code: number,
    public response?: AxiosResponse<ApiResponse<T>>,
    message?: string
  ) {
    super(message || `API Error: ${code}`);
    this.name = 'ApiError';
  }
}
```

### 错误分类处理
- **4xx 错误**: 显示用户友好提示
- **5xx 错误**: 记录日志并上报
- **401**: 自动跳转登录
- **403**: 权限不足提示

## 性能优化要求

### 组件优化
```typescript
// 代码分割
const UserList = lazy(() => import('@/pages/UserList'));

// 使用 React.memo 优化渲染
const UserCard = React.memo<UserCardProps>(({ userId, onSelect }) => {
  // 组件逻辑
});
```

### 请求优化
- 使用 React Query 进行请求缓存
- 相同 API 60s 内不重复请求
- 使用 AbortController 取消未完成请求

## 代码质量要求

### 必须添加的注释
```typescript
/**
 * 函数功能描述
 * @param param1 参数1描述
 * @param param2 参数2描述
 * @returns 返回值描述
 */
function exampleFunction(param1: string, param2: number): boolean {
  // 实现逻辑
  return true;
}
```

### TypeScript 严格模式
- 启用所有严格类型检查
- 禁止隐式 any
- 必须处理 null/undefined

## Git 提交规范
```
type(scope): description

类型:
- feat: 新功能
- fix: bug修复  
- docs: 文档变更
- style: 代码样式
- refactor: 重构代码
- test: 测试相关
- chore: 构建/工具变更
```

## 禁止行为
❌ **严格禁止**:
1. 直接使用 `axios.create()`
2. 在组件中直接调用 `fetch/XHR`
3. 在非 `services/request` 目录创建API请求
4. 提交包含 `// @ts-ignore` 的代码
5. 在 useEffect 中直接修改状态而不加依赖项
6. 使用 `any` 类型
7. 不添加函数级注释

## 代码生成指导

### 当创建新组件时
1. 使用函数组件优先
2. 必须定义 Props 接口
3. 添加完整的 JSDoc 注释
4. 使用 TailwindCSS 进行样式设计
5. 遵循 Ant Design 设计规范

### 当创建新 API 时
1. 在对应模块目录下创建
2. 使用 services/request 封装
3. 定义完整的请求/响应类型
4. 添加错误处理
5. 在 store 中封装使用

### 当创建新页面时
1. 在 pages 目录下创建
2. 使用对应的业务模块状态
3. 实现响应式设计
4. 添加加载状态和错误处理
5. 遵循无障碍访问标准

## 特殊要求
- 所有生成的代码必须包含中文注释
- 优先使用项目已有的工具函数和组件
- 保持代码风格与项目一致
- 确保类型安全和性能优化