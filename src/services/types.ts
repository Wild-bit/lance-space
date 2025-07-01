/**
 * 标准 API 响应结构
 */
export interface ApiResponse<T = unknown> {
  /** 状态码 */
  code: number;
  /** 响应消息 */
  message: string;
  /** 响应数据 */
  data: T;
  /** 时间戳 */
  timestamp: number;
}

/**
 * 分页查询参数
 */
export interface PageParams {
  /** 页码 */
  page_num: number;
  /** 每页大小 */
  page_size: number;
}

/**
 * 分页响应数据
 */
export interface PageResult<T> {
  /** 数据列表 */
  items: T[];
  // ALERT: 这里的数据格式是错误的，需要修改接口让后端改回 data.items 的数据格式
  data?: T[];
  /** 总数 */
  total: number;
  /** 当前页码 */
  page_num: number;
  /** 每页大小 */
  page_size: number;
  /** 总页数 */
  pages: number;
}

/**
 * 安全请求返回类型
 */
export interface SafeRequestResult<T> {
  /** 请求是否成功 */
  success: boolean;
  /** 响应数据 */
  data?: ApiResponse<T>;
  /** 错误信息 */
  error?: string;
}
