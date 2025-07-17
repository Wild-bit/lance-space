import { Button } from "antd";
import type React from "react";
// import { useEffect } from "react";
// import { useAuthStore } from "@/modules/common/common.store";

const Login: React.FC = () => {
  // const { loading, feishuAuthUrl, fetchFeishuAuthUrl, redirectToFeishu } =
  //   useAuthStore();

  // useEffect(() => {
  //   fetchFeishuAuthUrl(location.origin);
  // }, [fetchFeishuAuthUrl]);

  const handleLogin = () => {};

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Logo 和标题 */}
        <div className="flex justify-center items-center mb-8">
          <img className="w-15 h-15 mr-3" src="/favicon.svg" alt="logo" />
          <span className="text-2xl font-bold text-gray-800">Lance-Admin</span>
        </div>

        {/* 登录按钮 */}
        <div className="text-center">
          <Button
            type="primary"
            size="large"
            onClick={handleLogin}
            // loading={loading}
            className="w-full h-12 text-lg"
            // disabled={!feishuAuthUrl}
          >
            登录
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
