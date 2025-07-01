import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import type React from "react";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "@/router";
import { setToken, setUserInfo } from "@/utils/auth";
import { apiClient } from "./services/client";

// 创建 QueryClient 实例
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 分钟
    },
  },
});

// 获取URL参数
const getQueryParam = () => {
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
};

const App: React.FC = () => {
  useEffect(() => {
    // 处理飞书授权回调
    const handleFeishuAuth = async () => {
      const query = getQueryParam();

      console.log("URL查询参数:", query);

      if (query.state === "sitepower20241212" && query.code) {
        console.log("开始处理飞书授权回调...");
        try {
          const res = await apiClient.common.feishuAuthCallback({
            code: query.code,
            state: query.state,
          });

          console.log("飞书授权回调响应:", res);

          if (res.code === 0 && res.data) {
            console.log("授权成功，保存token和用户信息");

            // 根据原项目的逻辑，token可能直接在data中
            const token = res.data.token || res.data;
            setToken(token);

            if (res.data.user_info) {
              setUserInfo(res.data.user_info);
            }

            // 获取登录前要访问的页面，如果没有则跳转到广告管理页面
            const redirectUrl =
              localStorage.getItem("redirect_after_login") || "/ad";
            localStorage.removeItem("redirect_after_login");

            console.log("准备跳转到:", redirectUrl);

            // 清除URL参数并跳转到目标页面
            window.history.replaceState({}, "", redirectUrl);
            window.location.reload();
          } else {
            console.error("飞书授权失败:", res);
          }
        } catch (error) {
          console.error("飞书授权回调异常:", error);
        }
      } else {
        console.log("不是飞书授权回调，跳过处理");
      }
    };

    handleFeishuAuth();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={zhCN}>
        <div className="app">
          <RouterProvider router={router} />
        </div>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
