import { Spin } from "antd";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import AppLayout from "@/components/Layout";
import NotFoundPage from "@/pages/404";
import AdPage from "@/pages/Ad";
import CreativePage from "@/pages/Creative";
import FlowSettlementPage from "@/pages/FlowSettlement";
import Login from "@/pages/Login";
import TrafficManagementPage from "@/pages/TrafficManagement";
import { isAuthenticated } from "@/utils/auth";

// 受保护的路由组件
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const currentPath = window.location.pathname + window.location.search;

  // 如果是飞书授权回调，先不进行重定向，让App.tsx处理完回调
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("state") === "sitepower20241212" && urlParams.get("code")) {
    console.log("检测到飞书授权回调，等待处理...");
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spin size="large" />
          <div className="mt-4 text-lg text-gray-600">正在处理登录...</div>
          <div className="mt-2 text-sm text-gray-400">请稍候</div>
        </div>
      </div>
    );
  }

  if (isAuthenticated()) {
    return <AppLayout>{children}</AppLayout>;
  }
  // 保存当前路径，登录后跳转回来
  if (currentPath !== "/login") {
    localStorage.setItem("redirect_after_login", currentPath);
  }
  return <Navigate to="/login" replace />;
};

// 已登录用户重定向组件
const AuthRedirect = ({ children }: { children: React.ReactNode }) => {
  return isAuthenticated() ? <Navigate to="/" replace /> : <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <AuthRedirect>
        <Login />
      </AuthRedirect>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "ad",
        element: <AdPage />,
      },
      {
        path: "creative",
        element: <CreativePage />,
      },
      {
        path: "traffic-management",
        element: <TrafficManagementPage />,
      },
      {
        path: "flow-settlement",
        element: <FlowSettlementPage />,
      },
    ],
  },
  {
    path: "/404",
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);

export default router;
