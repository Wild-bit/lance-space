/**
 * 全局类型定义
 */

/**
 * 通用 ID 类型
 */
export type ID = string | number;

/**
 * 通用状态类型
 */
export type Status = 0 | 1 | 2;

/**
 * 分页查询基础参数
 */
export interface BasePageParams {
  pageNum: number;
  pageSize: number;
}

/**
 * 通用查询参数
 */
export interface BaseQueryParams extends BasePageParams {
  keyword?: string;
  status?: Status;
  startDate?: string;
  endDate?: string;
}

/**
 * 基础实体接口
 */
export interface BaseEntity {
  id: ID;
  createTime: string;
  updateTime: string;
  createBy?: string;
  updateBy?: string;
}

/**
 * 下拉选项接口
 */
export interface SelectOption<T = string | number> {
  label: string;
  value: T;
  disabled?: boolean;
}

/**
 * 树形节点接口
 */
export interface TreeNode<T = unknown> {
  key: string | number;
  title: string;
  children?: TreeNode<T>[];
  disabled?: boolean;
  data?: T;
}

/**
 * 表格列配置
 */
export interface TableColumn<T = unknown> {
  title: string;
  dataIndex: keyof T;
  key?: string;
  width?: number | string;
  align?: "left" | "center" | "right";
  sorter?: boolean;
  filters?: { text: string; value: string | number }[];
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
}

/**
 * 表单字段配置
 */
export interface FormField {
  name: string;
  label: string;
  type:
    | "input"
    | "textarea"
    | "select"
    | "date"
    | "number"
    | "switch"
    | "upload";
  required?: boolean;
  rules?: unknown[];
  options?: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
}

/**
 * 环境变量类型
 */
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_ENV: "development" | "production" | "test";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ConfigEnv {
  mode: "development" | "testing" | "production";
}
