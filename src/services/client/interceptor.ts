import type { DefineOptions } from "@qlj/request";
import { clearAuth, getToken } from "@/utils/auth";
import { ApiError, ErrorCode, errorHandler } from "./error";

export const interceptors: DefineOptions["interceptors"] = {
  request: (config) => {
    // 添加授权头
    const token = getToken();
    config.headers ||= {};

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 添加请求时间戳
    config.headers["X-Request-Time"] = Date.now().toString();

    return config;
  },
  response: (response) => {
    const { data } = response;

    // 检查业务状态码
    if (data.code !== ErrorCode.SUCCESS) {
      const error = new ApiError(data.code, response, data.message);

      // 处理特殊错误码
      switch (data.code) {
        case ErrorCode.UNAUTHORIZED:
          // 清除 token 并跳转到登录页
          clearAuth();
          window.location.href = "/login";
          break;
        case ErrorCode.FORBIDDEN:
          console.warn("权限不足:", data.message);
          break;
        default:
          break;
      }

      return Promise.reject(error);
    }

    return data;
  },
  error: (error: any) => {
    // 处理 HTTP 状态码错误
    if (error.response) {
      const { status, data } = error.response;
      const apiError = new ApiError(
        status,
        error.response,
        data?.message || errorHandler.getUserFriendlyMessage(status),
      );

      // 根据 HTTP 状态码处理
      switch (status) {
        case 401:
          clearAuth();
          window.location.href = "/login";
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          // 服务器错误，可以在这里添加错误上报逻辑
          console.error("服务器错误:", apiError.message);
          break;
        default:
          break;
      }

      return Promise.reject(apiError);
    }

    // 网络错误或其他错误
    const networkError = new Error("网络连接异常，请检查网络设置");
    return Promise.reject(networkError);
  },
};
