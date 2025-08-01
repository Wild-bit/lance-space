import { Button, Form, Input } from "antd";
import type React from "react";
import { useState } from "react";
// import { useAuthStore } from "@/modules/common/common.store";

const Login: React.FC = () => {
  // const { loading, feishuAuthUrl, fetchFeishuAuthUrl, redirectToFeishu } =
  //   useAuthStore();

  const [loading, setLoading] = useState(false);

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
          <Form layout="vertical">
            <Form.Item
              name="username"
              required
              label="用户名"
              rules={[{ required: true, message: "请输入用户名" }, { min: 6 }]}
            >
              <Input className="h-12" placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              required
              label="密码"
              rules={[{ required: true, message: "请输入密码" }, { min: 6 }]}
            >
              <Input.Password className="h-12" placeholder="请输入密码" />
            </Form.Item>
          </Form>
          <Button
            type="primary"
            size="large"
            onClick={handleLogin}
            loading={loading}
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
