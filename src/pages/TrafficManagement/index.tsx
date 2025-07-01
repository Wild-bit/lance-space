import {
  BarChartOutlined,
  DollarOutlined,
  EditOutlined,
  EyeOutlined,
  FunctionOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Row,
  Space,
  Table,
  Tag,
  type TablePaginationConfig,
} from "antd";
import { format, subDays } from "date-fns";
import dayjs from "dayjs";
import type React from "react";
import { useEffect, useState } from "react";
import EditTrafficDrawer from "@/components/EditTrafficDrawer";
import { useTrafficStore } from "@/modules/traffic/traffic.store";
import type {
  GetTrafficListParams,
  TrafficRecord,
} from "@/modules/traffic/traffic.types";

const { RangePicker } = DatePicker;

const TrafficManagementPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    subDays(new Date(), 30),
    new Date(),
  ]);
  const [hideInactive, setHideInactive] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<TrafficRecord | null>(
    null,
  );

  // 使用 traffic store
  const {
    loading,
    dataSource,
    total,
    current,
    pageSize,
    fetchTrafficList,
    setPagination,
  } = useTrafficStore();

  // 获取流量列表
  const fetchTrafficData = async () => {
    const params: GetTrafficListParams = {
      page_num: current,
      page_size: pageSize,
      start_time: format(dateRange[0], "yyyy-MM-dd"),
      end_time: format(dateRange[1], "yyyy-MM-dd"),
      show_back_null: hideInactive,
    };

    await fetchTrafficList(params);
  };

  // 处理编辑
  const handleEdit = (record: TrafficRecord) => {
    setSelectedRecord(record);
    setEditDrawerOpen(true);
  };

  // 处理编辑抽屉关闭
  const handleEditDrawerClose = (hasChange: boolean) => {
    setEditDrawerOpen(false);
    setSelectedRecord(null);
    if (hasChange) {
      fetchTrafficData(); // 刷新数据
    }
  };

  // 日期范围变化
  const handleDateChange = (dates: any) => {
    if (dates) {
      setDateRange([dayjs(dates[0]).toDate(), dayjs(dates[1]).toDate()]);
      setPagination({ current: 1, pageSize, total });
    }
  };

  // 隐藏无效流量选项变化
  const handleHideInactiveChange = (checked: boolean) => {
    setHideInactive(checked);
    setPagination({ current: 1, pageSize, total });
  };

  // 表格列定义
  const columns = [
    {
      title: "流量信息",
      key: "flow",
      width: 200,
      render: (record: TrafficRecord) => (
        <div>
          <div className="font-medium mb-1">DC-{record.link_id}</div>
          <div className="text-sm text-gray-500">ID: {record.ad_unit_id}</div>
          <div className="text-xs text-gray-400">{record.created_at}</div>
        </div>
      ),
    },
    {
      title: "流量定向",
      key: "targeting",
      width: 300,
      render: (record: TrafficRecord) => (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm">
              <span className="font-medium">性别:</span>
              <span className="text-gray-600 ml-1">
                {record.ad_target?.sex || "未设置"}
              </span>
            </span>
            <span className="text-sm">
              <span className="font-medium">年龄:</span>
              <span className="text-gray-600 ml-1">
                {record.ad_target?.ages?.join("、") || "未设置"}
              </span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm">
              <span className="font-medium">语言:</span>
              <span className="text-gray-600 ml-1">
                {record.ad_target?.language || "未设置"}
              </span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="text-sm">
              <span className="font-medium">地区:</span>
              <span className="text-gray-600 ml-1">
                {record.ad_target?.countrys?.join("、") || "未设置"}
              </span>
            </span>
          </div>
          {record.ad_target?.interests &&
            record.ad_target.interests.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm">
                  <span className="font-medium">关键词:</span>
                  <span className="text-gray-600 ml-1">
                    {record.ad_target.interests.join("、")}
                  </span>
                </span>
              </div>
            )}
        </div>
      ),
    },
    {
      title: "回流广告",
      key: "ads",
      width: 250,
      render: (record: TrafficRecord) => (
        <div>
          {!record.ads || record.ads.length === 0 ? (
            <span className="text-gray-400">无</span>
          ) : (
            <Space direction="vertical" size="small">
              {record.ads.map((ad) => (
                <Tag key={ad.id} className="text-xs">
                  <span className="mr-1">{ad.name}</span>
                  <span className="mr-1">${ad.adv_settle_price}</span>
                  <span>{ad.bill_event_name}</span>
                </Tag>
              ))}
            </Space>
          )}
        </div>
      ),
    },
    {
      title: "广告数据",
      key: "stats",
      width: 200,
      render: (record: TrafficRecord) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm">
            <EyeOutlined className="mr-1 text-blue-500" />
            <span className="font-medium">展示:</span>
            <span className="text-gray-600 ml-1">
              {record.imp?.toLocaleString() || 0}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <BarChartOutlined className="mr-1 text-green-500" />
            <span className="font-medium">点击:</span>
            <span className="text-gray-600 ml-1">
              {record.click?.toLocaleString() || 0}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <FunctionOutlined className="mr-1 text-orange-500" />
            <span className="font-medium">转化:</span>
            <span className="text-gray-600 ml-1">{record.action || 0}</span>
          </div>
          <div className="flex items-center text-sm">
            <DollarOutlined className="mr-1 text-red-500" />
            <span className="font-medium">收益:</span>
            <span className="text-gray-600 ml-1">
              ${record.settle_money || 0}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <span className="font-medium">eCPM:</span>
            <span className="text-gray-600 ml-1">${record.ecpm || 0}</span>
          </div>
        </div>
      ),
    },
    {
      title: "操作",
      key: "operation",
      width: 100,
      render: (record: TrafficRecord) => (
        <Button
          type="link"
          size="small"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          编辑
        </Button>
      ),
    },
  ];

  // 表格分页变化
  const handleTableChange = (paginationParams: TablePaginationConfig): void => {
    setPagination(paginationParams as { current: number; pageSize: number; total: number });
  };


  useEffect(() => {
    fetchTrafficData();
  }, [current, pageSize, dateRange, hideInactive]);

  return (
    <div className="p-6">
      <Card>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-4">流量管理</h2>

          <Row gutter={16} className="mb-4">
            <Col span={8}>
              <RangePicker
                onChange={handleDateChange}
                disabledDate={(current) => {
                   // 禁用未来日期
                  return current && current.isAfter(dayjs());
                }}
                className="w-full"
                format="YYYY-MM-DD"
              />
            </Col>
            <Col span={8}>
              <Checkbox
                checked={hideInactive}
                onChange={(e) => handleHideInactiveChange(e.target.checked)}
              >
                隐藏未开启流量
              </Checkbox>
            </Col>
            <Col className="flex justify-end" span={8}>
              <Button type="primary" onClick={fetchTrafficData}>
                刷新数据
              </Button>
            </Col>
          </Row>
        </div>

        <Table
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          rowKey={(record) => `${record.link_id}-${record.ad_unit_id}`}
          pagination={{
            current,
            pageSize,
            total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
          onChange={handleTableChange}
          scroll={{ x: 1200 }}
        />
      </Card>

      <EditTrafficDrawer
        open={editDrawerOpen}
        record={selectedRecord}
        onClose={handleEditDrawerClose}
      />
    </div>
  );
};

export default TrafficManagementPage;
