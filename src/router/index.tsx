import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import AppLayout from "@/components/Layout";
import NotFoundPage from "@/pages/404";
import Login from "@/pages/Login";
import { isAuthenticated } from "@/utils/auth";

// 受保护的路由组件
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const currentPath = window.location.pathname + window.location.search;

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
    children: [],
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
