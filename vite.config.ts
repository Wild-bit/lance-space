import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import { getProxyByEnv } from "./config/vite-proxy";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(`🚀 当前环境: ${mode}`);
  console.log(`🚀 API 地址: ${env.VITE_API_BASE_URL}`);

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 8000, // 端口号一定要8000 reason：https://open.feishu.cn/document/faq/trouble-shooting/how-to-resolve-the-authorization-page-20029-error
      open: true,
      host: true,
      // 使用独立的代理配置文件
      proxy: getProxyByEnv(env.VITE_PROXY_ENV),
    },
    build: {
      outDir: "dist",
      sourcemap: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            antd: ["antd"],
            utils: ["lodash", "date-fns"],
          },
        },
      },
    },
    // 环境变量配置
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
  };
});
