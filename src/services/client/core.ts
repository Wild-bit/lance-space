import { createHttpClient } from "@qlj/request";
import { interceptors } from "./interceptor";
import * as modules from "./modules";

export const apiClient = createHttpClient({
  modules,
  config: {
    baseURL: import.meta.env.VITE_API_BASE_URL || "",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
    interceptors,
  },
});
