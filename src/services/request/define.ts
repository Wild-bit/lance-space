import type {
  APIDefinition,
  ApiResponse,
  DefineOptions,
  HTTPMethod,
} from "./types";

export function defineMethod(method: HTTPMethod) {
  return function <TReq = any, TRes = any>(
    path: string,
    options?: DefineOptions
  ): APIDefinition<TReq, ApiResponse<TRes>> {
    return { method, path, options };
  };
}

export const define = {
  get: defineMethod("GET"),
  post: defineMethod("POST"),
  put: defineMethod("PUT"),
  delete: defineMethod("DELETE"),
  head: defineMethod("HEAD"),
  patch: defineMethod("PATCH"),
};
