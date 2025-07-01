import type { AxiosResponse } from "@qlj/request";
import type { ApiResponse } from "../types";

/**
 * API 错误类
 */
export class ApiError<T = unknown> extends Error {
  public code: number;
  public response?: AxiosResponse<ApiResponse<T>>;

  constructor(
    code: number,
    response?: AxiosResponse<ApiResponse<T>>,
    message?: string,
  ) {
    super(message || `API Error: ${code}`);
    this.name = "ApiError";
    this.code = code;
    this.response = response;
  }
}

/**
 * 错误代码枚举
 */
export const ErrorCode = {
  /** 请求成功 */
  SUCCESS: 0,
  /** 未授权 */
  UNAUTHORIZED: 401,
  /** 权限不足 */
  FORBIDDEN: 403,
  /** 资源不存在 */
  NOT_FOUND: 404,
  /** 服务器错误 */
  INTERNAL_ERROR: 500,
} as const;

/**
 * 错误处理工具
 */
export const errorHandler = {
  /**
   * 判断是否为 API 错误
   */
  isApiError: (error: unknown): error is ApiError => {
    return error instanceof ApiError;
  },

  /**
   * 获取错误消息
   */
  getErrorMessage: (error: unknown): string => {
    if (errorHandler.isApiError(error)) {
      return error.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return "未知错误";
  },

  /**
   * 根据错误代码获取用户友好的错误消息
   */
  getUserFriendlyMessage: (code: number): string => {
    switch (code) {
      case ErrorCode.UNAUTHORIZED:
        return "登录已过期，请重新登录";
      case ErrorCode.FORBIDDEN:
        return "权限不足，无法访问该资源";
      case ErrorCode.NOT_FOUND:
        return "请求的资源不存在";
      case ErrorCode.INTERNAL_ERROR:
        return "服务器异常，请稍后重试";
      default:
        return "操作失败，请稍后重试";
    }
  },
};
