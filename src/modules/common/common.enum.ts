/**
 * 用户状态枚举
 */
export const UserStatus = {
  ACTIVE: { value: 1, label: "正常" },
  INACTIVE: { value: 0, label: "禁用" },
  PENDING: { value: 2, label: "待审核" },
} as const;

/**
 * 性别枚举
 */
export const Gender = {
  MALE: { value: 1, label: "男" },
  FEMALE: { value: 2, label: "女" },
  UNKNOWN: { value: 0, label: "未知" },
} as const;

/**
 * 操作类型枚举
 */
export const OperationType = {
  CREATE: { value: "create", label: "新增" },
  UPDATE: { value: "update", label: "修改" },
  DELETE: { value: "delete", label: "删除" },
  VIEW: { value: "view", label: "查看" },
} as const;

/**
 * 页面大小选项
 */
export const PageSizeOptions = ["10", "20", "50", "100"] as const;

/**
 * 默认分页配置
 */
export const DEFAULT_PAGE_CONFIG = {
  pageNum: 1,
  pageSize: 20,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number, range: [number, number]) =>
    `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
  pageSizeOptions: PageSizeOptions,
} as const;

/**
 * 时间格式枚举
 */
export const DateFormat = {
  DATE: { value: "YYYY-MM-DD", label: "日期格式" },
  DATETIME: { value: "YYYY-MM-DD HH:mm:ss", label: "日期时间格式" },
  TIME: { value: "HH:mm:ss", label: "时间格式" },
  MONTH: { value: "YYYY-MM", label: "月份格式" },
} as const;

/**
 * 文件上传限制
 */
export const UPLOAD_CONFIG = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/gif", "application/pdf"],
  ALLOWED_EXTENSIONS: [".jpg", ".jpeg", ".png", ".gif", ".pdf"],
} as const;
