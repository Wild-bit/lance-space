import { BarChartOutlined, EyeOutlined, LikeOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  message,
  Table,
  Tabs,
  type TabsProps,
} from "antd";
import { format } from "date-fns";
import type React from "react";
import { useEffect, useState } from "react";
import { useSettlementStore } from "@/modules/settlement/settlement.store";
import type { SettlementItem } from "@/modules/settlement/settlement.types";

const FlowSettlementPage: React.FC = () => {
  const [status, setStatus] = useState("0");
  const [settleMoneyMap, setSettleMoneyMap] = useState<{
    [key: string]: string;
  }>({});

  // 使用 settlement store
  const { loading, submitting, dataSource, fetchSettlementList, updateAmount } =
    useSettlementStore();

  // 获取结算列表
  const fetchSettlementData = async (statusParam: string) => {
    await fetchSettlementList({ status: Number(statusParam) });
  };

  // 处理结算
  const handleSettle = async (record: SettlementItem) => {
    const { id, settle_money } = record;
    const settleMoney = Number(settle_money);

    if (settleMoney < 0) {
      message.error("结算金额不能小于0");
      return;
    }

    const success = await updateAmount({ id, settle_money: settleMoney });
    if (success) {
      setStatus("1");
      fetchSettlementData("1");
    }
  };

  // 表格列定义
  const columns = [
    {
      title: "结算周期",
      dataIndex: "date",
      key: "date",
      render: (date: string) => (
        <span>{format(new Date(date), "yyyy-MM-dd HH:mm:ss")}</span>
      ),
    },
    {
      title: "流量信息",
      key: "link_id",
      render: (record: SettlementItem) => (
        <div>
          <div className="font-medium">DC-{record.link_id}</div>
          <div className="text-sm text-gray-500">ID: {record.id}</div>
        </div>
      ),
    },
    {
      title: "广告数据",
      key: "ad_data",
      render: (record: SettlementItem) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm">
            <EyeOutlined className="mr-1 text-blue-500" />
            <span>{record.imp}</span>
          </div>
          <div className="flex items-center text-sm">
            <LikeOutlined className="mr-1 text-green-500" />
            <span>{record.click}</span>
          </div>
          <div className="flex items-center text-sm">
            <BarChartOutlined className="mr-1 text-orange-500" />
            <span>{record.action}</span>
          </div>
        </div>
      ),
    },
    {
      title: "DSP收入",
      key: "income",
      render: (record: SettlementItem) => (
        <span className="font-medium text-green-600">${record.income}</span>
      ),
    },
    {
      title: "eCPM",
      key: "ecpm",
      render: (record: SettlementItem) => (
        <span className="font-medium">${record.ecpm}</span>
      ),
    },
    {
      title: "结算金额",
      key: "settle_money",
      width: 280,
      render: (record: SettlementItem) => {
        if (status === "1") {
          return (
            <span className="font-medium text-red-600">
              ${record.settle_money}
            </span>
          );
        }
        return (
          <div className="flex items-center gap-2">
            <Input
              value={settleMoneyMap[record.id] ?? record.settle_money}
              placeholder="请输入结算金额"
              onChange={(e) => {
                let newValue = e.target.value;
                // 只允许输入数字和小数点
                newValue = newValue.replace(/[^0-9.]/g, "");
                // 确保小数点后最多两位
                newValue = newValue.replace(/^(\d*\.?\d{0,2}).*$/, "$1");
                setSettleMoneyMap((prev) => ({
                  ...prev,
                  [record.id]: newValue,
                }));
              }}
              className="w-32"
            />
            <Button
              type="primary"
              size="small"
              loading={submitting}
              onClick={() => {
                const updatedMoney =
                  settleMoneyMap[record.id] ?? record.settle_money;
                handleSettle({ ...record, settle_money: Number(updatedMoney) });
              }}
            >
              结算
            </Button>
          </div>
        );
      },
    },
  ];

  // 标签页配置
  const items: TabsProps["items"] = [
    {
      key: "0",
      label: "待处理",
    },
    {
      key: "1",
      label: "已完成",
    },
  ];

  // 切换状态
  const handleTabChange = (key: string) => {
    setStatus(key);
  };

  useEffect(() => {
    fetchSettlementData(status);
  }, [status]);

  return (
    <div className="p-6">
      <Card>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-4">流量结算</h2>
        </div>

        <Tabs
          activeKey={status}
          items={items}
          onChange={handleTabChange}
          className="mb-4"
        />

        <Table
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      </Card>
    </div>
  );
};

export default FlowSettlementPage;
