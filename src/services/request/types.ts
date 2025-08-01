import type { AxiosRequestConfig, AxiosResponse } from "axios";

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "HEAD" | "PATCH";

export type Module = Record<string, APIDefinition<any, any>>;

export type ApiClientOptions = Omit<
  AxiosRequestConfig,
  "url" | "method" | "data" | "params"
>;

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  timestamp: number;
}

export type ExtractModuleTypes<
  T extends Record<string, APIDefinition<any, any>>
> = {
  [K in keyof T]: T[K] extends APIDefinition<infer Req, infer Res>
    ? (payload: Req, options?: ApiClientOptions) => Promise<Res>
    : never;
};

export interface APIInterceptor {
  request?: (
    config: AxiosRequestConfig
  ) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
  response?: (res: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  error?: (err: any) => any;
}

export interface DefineOptions {
  interceptors?: APIInterceptor;
}

/**
 * API 定义接口，用于描述 API 的基本信息和类型约束
 * @template TReq 请求参数类型
 * @template TRes 响应数据类型
 */
export interface APIDefinition<TReq, TRes> {
  method: HTTPMethod;
  path: string;
  options?: DefineOptions;
  /** 请求参数类型标识，用于类型推断 */
  _req?: TReq;
  /** 响应数据类型标识，用于类型推断 */
  _res?: TRes;
}

export interface HttpClientConfig extends AxiosRequestConfig {
  interceptors?: APIInterceptor;
}
