import type { AxiosResponse } from "axios";
import type { APIInterceptor } from "./types";

export function applyInterceptors(
  local?: APIInterceptor,
  global?: APIInterceptor
) {
  const merged: Required<APIInterceptor> = {
    // 请求拦截器：先执行全局，再执行局部
    request: async (cfg) => {
      let result = cfg;
      if (global?.request) result = await global.request(result);
      if (local?.request) result = await local.request(result);
      return result;
    },

    // 响应拦截器：先执行局部，再执行全局
    response: async (res: AxiosResponse) => {
      let result = res;
      if (local?.response) result = await local.response(result);
      if (global?.response) result = await global.response(result);
      return result;
    },

    // 错误拦截器：先尝试局部处理，如果没有则用全局，都没有则拒绝
    error: async (err) => {
      try {
        if (local?.error) return await local.error(err);
        if (global?.error) return await global.error(err);
        return Promise.reject(err);
      } catch (e) {
        return Promise.reject(e);
      }
    },
  };
  return merged;
}
