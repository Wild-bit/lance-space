import {
  DiffOutlined,
  LogoutOutlined,
  SnippetsOutlined,
  TableOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space, Watermark } from "antd";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clearAuth, getUserInfo } from "@/utils/auth";

const { Header, Content, Sider } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = getUserInfo();
  const [collapsed, setCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    dayjs().format("YYYY-MM-DD HH:mm:ss"),
  );

  // 定时更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 水印内容
  const watermarkContent = useMemo(() => {
    // 构建用户标识
    const userName = userInfo?.name || "DSP-Admin";
    const userId =
      userInfo?.union_id || userInfo?.id || "";
    const userIdentifier = userId ? `${userName}-${userId}` : userName;

    return [userIdentifier, currentTime];
  }, [userInfo, currentTime]);

  const handleLogout = () => {
    clearAuth();
    navigate("/login", { replace: true });
  };

  const userMenuItems = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "退出登录",
      onClick: handleLogout,
    },
  ];

  // 导航菜单项
  const menuItems = [
    {
      key: "/ad",
      icon: <TableOutlined />,
      label: "广告管理",
      onClick: () => navigate("/ad"),
    },
    {
      key: "/creative",
      icon: <TableOutlined />,
      label: "创意管理",
      onClick: () => navigate("/creative"),
    },
    {
      key: "/traffic-management",
      icon: <DiffOutlined />,
      label: "流量管理",
      onClick: () => navigate("/traffic-management"),
    },
    {
      key: "/flow-settlement",
      icon: <SnippetsOutlined />,
      label: "流量结算",
      onClick: () => navigate("/flow-settlement"),
    },
    // {
    //   key: '/date',
    //   icon: <PieChartOutlined />,
    //   label: '数据模块',
    //   onClick: () => navigate('/date'),
    // },
  ];

  // 获取当前选中的菜单项
  const selectedKeys = [location.pathname];
  const siderStyle: React.CSSProperties = {
    overflow: "auto",
    height: "100vh",
    position: "sticky",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
  };
  return (
    <Layout className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="light"
        style={{ ...siderStyle }}
        width={200}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-100">
          {!collapsed ? (
            <div className="flex items-center">
              <img className="w-8 h-8 mr-2" src="/favicon.svg" alt="logo" />
              <h1 className="text-lg font-semibold text-gray-800 m-0">
                DSP-Admin
              </h1>
            </div>
          ) : (
            <img className="w-8 h-8" src="/favicon.svg" alt="logo" />
          )}
        </div>

        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          items={menuItems}
          className="border-none"
        />
      </Sider>

      <Layout>
        <Header className="!bg-white shadow-sm px-6 flex items-center justify-between h-16 sticky top-0 z-[10] w-full">
          <div className="flex items-center ">
            <h2 className="text-lg font-medium text-gray-800 m-0">
              {menuItems.find((item) => item.key === location.pathname)
                ?.label || "数据概览"}
            </h2>
          </div>

          <Space>
            <Dropdown
              menu={{
                items: userMenuItems,
              }}
              placement="bottomRight"
            >
              <Button type="text" className="flex items-center">
                <Avatar size="small" icon={<UserOutlined />} />
                <span className="ml-2 hidden sm:inline">
                  {userInfo?.name || "用户"}
                </span>
              </Button>
            </Dropdown>
          </Space>
        </Header>

        <Content className="bg-gray-50 overflow-auto">
          <Watermark
            content={watermarkContent}
            gap={[100, 100]}
            offset={[50, 50]}
            font={{
              color: "rgba(0, 0, 0, 0.15)",
              fontSize: 16,
              fontWeight: "normal",
              fontFamily: "sans-serif",
            }}
            className="min-h-full"
          >
            {children}
          </Watermark>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
