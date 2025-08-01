import axios, { type AxiosRequestConfig } from "axios";
import type { ExtractModuleTypes, HttpClientConfig, Module } from "./types";
import { applyInterceptors } from "./interceptor";
import { interpolatePath } from "./utils";

interface CreateHttpClientOptions<T extends Record<string, Module>> {
  modules: T;
  config: HttpClientConfig;
}
type Parload = Record<string, any>;

export function createHttpClient<TModules extends Record<string, Module>>(
  options: CreateHttpClientOptions<TModules>
): {
  [K in keyof TModules]: ExtractModuleTypes<TModules[K]>;
} {
  const axiosInstance = axios.create(options.config);
  const client: any = {};

  for (const [moduleName, moduleDef] of Object.entries(options.modules)) {
    // 定义模块
    client[moduleName] = {};
    for (const [apiName, apiDef] of Object.entries(moduleDef)) {
      // 定义 API 方法, api级别的options 会覆盖 全局的options
      client[moduleName][apiName] = async (
        payload: Parload,
        _options?: AxiosRequestConfig
      ) => {
        const { method, path, options: apiOptions } = apiDef;
        options.config.interceptors ||= {};
        options.config.interceptors.response ||= (res) => res.data;
        const interceptors = applyInterceptors(
          apiOptions?.interceptors,
          options.config.interceptors
        );
        let url = path;
        let data: any = null;
        let params: any = null;
        // 路径参数处理
        url = interpolatePath(url, payload);
        if (method === "GET" || method === "DELETE") {
          params = payload;
        } else {
          data = payload;
        }
        let config: HttpClientConfig = {
          method,
          url,
          params,
          data,
          ..._options,
        };
        try {
          config = await interceptors.request(config);
          const response = await axiosInstance.request(config);
          return interceptors.response(response);
        } catch (error) {
          return interceptors.error(error);
        }
      };
    }
  }
  return client;
}
