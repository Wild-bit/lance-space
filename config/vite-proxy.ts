import type { ProxyOptions } from "vite";

/**
 * Vite 代理配置
 * 基于原项目的服务配置转换而来
 */

// 代理目标配置
const proxyTargets = {
  // 开发环境（使用测试服务器）
  dev: "https://admin-dsp-test.deepclick.com",
  // 测试环境
  test: "https://admin-dsp-test.deepclick.com",
  // 生产环境
  prod: "https://admin-dsp.deepclick.com",
};

/**
 * 创建代理配置
 * @param env 环境名称
 * @returns Vite 代理配置对象
 */
export function createProxy(
  env: keyof typeof proxyTargets = "test",
): Record<string, string | ProxyOptions> {
  const target = proxyTargets[env];

  console.log(`🚀 代理目标: ${target}`);

  return {
    // API 接口代理 - 保留完整路径
    "/api": {
      target,
      changeOrigin: true,
      // 不重写路径，保持原有的 /api 前缀
      // rewrite: (path) => path.replace(/^\/api/, ''),
      configure: (proxy, options) => {
        // 请求拦截
        proxy.on("proxyReq", (_proxyReq, req) => {
          console.log(
            `🔄 [${env.toUpperCase()}] 代理请求: ${req.method} ${req.url} -> ${options.target}${req.url}`,
          );
        });

        // 响应拦截
        proxy.on("proxyRes", (proxyRes, req) => {
          const status = proxyRes.statusCode || 0;
          const icon = status >= 200 && status < 300 ? "✅" : "❌";
          console.log(
            `${icon} [${env.toUpperCase()}] 代理响应: ${status} ${req.url}`,
          );
        });

        // 错误处理
        proxy.on("error", (err, req) => {
          console.error(
            `❌ [${env.toUpperCase()}] 代理错误: ${req.url}`,
            err.message,
          );
        });
      },
    },

    // 文件上传代理
    "/upload": {
      target,
      changeOrigin: true,
    },

    // WebSocket 代理
    "/ws": {
      target: target.replace("https", "wss").replace("http", "ws"),
      ws: true,
      changeOrigin: true,
    },

    // 静态资源代理（如果需要）
    "/static": {
      target,
      changeOrigin: true,
    },
  };
}

/**
 * 根据环境变量获取代理配置
 */
export function getProxyByEnv(
  proxyEnv = "test",
): Record<string, string | ProxyOptions> {
  console.log(`🚀 代理环境: ${proxyEnv}`);

  return createProxy(proxyEnv as keyof typeof proxyTargets);
}

export default createProxy;
