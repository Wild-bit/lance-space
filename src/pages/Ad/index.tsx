import {
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  SettingOutlined,
  UpOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Drawer,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import dayjs from "dayjs";
import type React from "react";
import { useEffect, useState } from "react";
import ImageUpload from "@/components/UploadComponents/ImageUpload";
import VideoUpload from "@/components/UploadComponents/VideoUpload";
import {
  countryOptions,
  platformOptions,
  statusOptions,
} from "@/modules/ad/ad.enum";
import { useAdStore } from "@/modules/ad/ad.store";
import type { AdFormData, AdListItem } from "@/modules/ad/ad.types";
import { useBaseInfoStore } from "@/modules/common/common.store";
import type { BaseInfoOption } from "@/modules/common/common.types";
import { useCreativeStore } from "@/modules/creative/creative.store";

const { RangePicker } = DatePicker;

const AdPage: React.FC = () => {
  // 使用模块化状态管理
  const {
    adList,
    loading,
    submitting,
    pagination,
    searchParams,
    fetchAds,
    createNewAd,
    updateExistingAd,
    setSearchParams,
    setPagination,
    resetSearch,
  } = useAdStore();

  // 创意状态管理
  const {
    submitting: creativeSubmitting,
    createNewCreative,
    setMainImg,
    setIconImg,
    setVideo,
    clearMedia,
  } = useCreativeStore();

  // 本地状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<AdListItem | null>(null);
  const [showAddCreative, setShowAddCreative] = useState(false);
  const [currentRow, setCurrentRow] = useState<AdListItem | null>(null);
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [creativeForm] = Form.useForm();
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "info",
    "time",
    "price",
    "bill_type",
    "daily_cap",
    "total_cap",
    "status",
    "landing_url",
    "bill_event_name",
    "countrys",
    "platforms",
    "action",
  ]);
  // 基础信息状态管理
  const { baseInfo, partners, fetchAllBaseData } = useBaseInfoStore();
  const [searchExpanded, setSearchExpanded] = useState(false);

  // 处理创建/编辑广告
  const handleSubmit = async (values: AdFormData) => {
    let success = false;

    if (editingRecord) {
      success = await updateExistingAd(editingRecord.id, values);
    } else {
      success = await createNewAd(values);
    }

    if (success) {
      setIsModalVisible(false);
      form.resetFields();
      setEditingRecord(null);
    }
  };

  // 打开编辑模态框
  const handleEdit = (record: AdListItem) => {
    setEditingRecord(record);
    form.setFieldsValue({
      ...record,
      timeRange: [dayjs(record.begin_time), dayjs(record.end_time)],
      target_partner: record.targeting?.partner_id || [],
    });
    setIsModalVisible(true);
  };

  // 打开新建模态框
  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 列选择器功能
  const allColumns = [
    { key: "info", title: "广告信息" },
    { key: "time", title: "投放时间" },
    { key: "price", title: "价格" },
    { key: "bill_type", title: "广告类型" },
    { key: "daily_cap", title: "广告每日限额" },
    { key: "total_cap", title: "广告总限额" },
    { key: "status", title: "状态" },
    { key: "landing_url", title: "落地页" },
    { key: "bill_event_name", title: "广告事件名称" },
    { key: "countrys", title: "国家" },
    { key: "platforms", title: "平台" },
    { key: "action", title: "操作" },
  ];

  const handleColumnVisibilityChange = (
    columnKey: string,
    checked: boolean,
  ) => {
    if (checked) {
      setVisibleColumns([...visibleColumns, columnKey]);
    } else {
      setVisibleColumns(visibleColumns.filter((key) => key !== columnKey));
    }
  };

  const columnSelectorMenu = {
    items: [
      {
        key: "column-selector",
        label: (
          <div className="p-2">
            <div className="mb-2 font-medium">列展示</div>
            {allColumns.map((col) => (
              <div key={col.key} className="flex items-center mb-1">
                <Checkbox
                  checked={visibleColumns.includes(col.key)}
                  onChange={(e) =>
                    handleColumnVisibilityChange(col.key, e.target.checked)
                  }
                >
                  {col.title}
                </Checkbox>
              </div>
            ))}
          </div>
        ),
      },
    ],
  };

  // 表格列定义
  const allTableColumns = [
    {
      title: "广告信息",
      key: "info",
      render: (record: AdListItem) => (
        <div>
          <div className="font-medium">{record.name}</div>
          <div className="text-sm text-gray-500">ID: {record.id}</div>
        </div>
      ),
    },
    {
      title: "投放时间",
      key: "time",
      render: (record: AdListItem) => (
        <div>
          <div className="text-sm">{record.begin_time}</div>
          <div className="text-sm">{record.end_time}</div>
        </div>
      ),
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
    },
    {
      title: "广告类型",
      dataIndex: "bill_type",
      key: "bill_type",
    },
    {
      title: "广告每日限额",
      dataIndex: "daily_cap",
      key: "daily_cap",
    },
    {
      title: "广告总限额",
      dataIndex: "total_cap",
      key: "total_cap",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (
        <Tag color={status === 1 ? "green" : "red"}>
          {status === 1 ? "开启" : "关闭"}
        </Tag>
      ),
    },
    {
      title: "落地页",
      dataIndex: "landing_url",
      key: "landing_url",
      render: (url: string) =>
        url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {url.length > 20 ? `${url.slice(0, 20)}...` : url}
          </a>
        ) : (
          <span className="text-gray-400">无</span>
        ),
    },
    {
      title: "广告事件名称",
      dataIndex: "bill_event_name",
      key: "bill_event_name",
    },
    {
      title: "国家",
      dataIndex: "countrys",
      key: "countrys",
      render: (countrys: string[]) => {
        return countrys && countrys.length > 0 ? countrys.join(", ") : "无";
      },
    },
    {
      title: "平台",
      dataIndex: "platforms",
      key: "platforms",
      render: (platforms: string[]) => {
        return platforms && platforms.length > 0 ? platforms.join(", ") : "无";
      },
    },
    {
      title: "操作",
      key: "action",
      render: (record: AdListItem) => (
        <Space>
          <Button
            type="link"
            size="small"
            onClick={() => {
              setShowAddCreative(true);
              setCurrentRow(record);
            }}
          >
            添加创意
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
        </Space>
      ),
    },
  ];

  // 根据可见列过滤表格列
  const columns = allTableColumns.filter((col) =>
    visibleColumns.includes(col.key),
  );

  // 搜索功能
  const handleSearch = (values: any) => {
    const params: any = {};

    // 处理广告名称搜索
    if (values.name) {
      params.name = values.name;
    }

    // 处理时间范围搜索
    if (values.timeRange && values.timeRange.length === 2) {
      params.begin_time = dayjs(values.timeRange[0]).format(
        "YYYY-MM-DD HH:mm:ss",
      );
      params.end_time = dayjs(values.timeRange[1]).format(
        "YYYY-MM-DD HH:mm:ss",
      );
    }

    // 处理价格搜索
    if (values.price) {
      params.price = values.price;
    }

    // 处理广告类型搜索
    if (values.bill_type) {
      params.bill_type = values.bill_type;
    }

    // 处理每日限额搜索
    if (values.daily_cap) {
      params.daily_cap = values.daily_cap;
    }

    // 处理总限额搜索
    if (values.total_cap) {
      params.total_cap = values.total_cap;
    }

    // 处理状态搜索
    if (values.status !== undefined) {
      params.status = values.status;
    }

    // 处理广告事件名称搜索
    if (values.bill_event_name) {
      params.bill_event_name = values.bill_event_name;
    }

    // 处理国家搜索
    if (values.countrys) {
      params.countrys = values.countrys;
    }

    // 处理平台搜索
    if (values.platforms) {
      params.platforms = values.platforms;
    }

    // 处理落地页搜索
    if (values.landing_url) {
      params.landing_url = values.landing_url;
    }

    setSearchParams(params);
  };

  // 重置搜索
  const handleReset = () => {
    searchForm.resetFields();
    resetSearch();
  };

  // 表格分页变化
  const handleTableChange = (paginationParams: any) => {
    setPagination(paginationParams);
  };

  // 获取基础数据 - 现在使用 store
  const fetchBaseData = async () => {
    await fetchAllBaseData();
  };

  // 监听分页和搜索参数变化，自动刷新数据
  useEffect(() => {
    fetchAds();
  }, [pagination.current, pagination.pageSize, searchParams]);

  useEffect(() => {
    fetchBaseData();
  }, []);

  return (
    <div className="p-6">
      {/* 搜索表单 */}
      <Card className="!mb-[20px] bg-gray-50">
        <Form
          form={searchForm}
          layout="inline"
          onFinish={handleSearch}
          className="grid grid-cols-4 gap-4"
        >
          {/* 基础搜索条件 - 始终显示 */}
          <Form.Item name="name" label="广告名称">
            <Input placeholder="请输入广告名称" allowClear />
          </Form.Item>

          <Form.Item name="timeRange" label="持续时间">
            <RangePicker showTime placeholder={["开始时间", "结束时间"]} />
          </Form.Item>

          <Form.Item name="price" label="广告价格">
            <InputNumber
              placeholder="请输入价格"
              style={{ width: "100%" }}
              min={0}
            />
          </Form.Item>
          {/* 展开的搜索条件 */}
          {searchExpanded && (
            <>
              <Form.Item name="bill_type" label="广告类型">
                <Input placeholder="请输入广告类型" allowClear />
              </Form.Item>

              <Form.Item name="daily_cap" label="广告每日限额">
                <InputNumber
                  placeholder="请输入每日限额"
                  style={{ width: "100%" }}
                  min={0}
                />
              </Form.Item>

              <Form.Item name="total_cap" label="广告总限额">
                <InputNumber
                  placeholder="请输入总限额"
                  style={{ width: "100%" }}
                  min={0}
                />
              </Form.Item>

              <Form.Item name="status" label="广告状态">
                <Select placeholder="请选择广告状态" allowClear>
                  {statusOptions.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="bill_event_name" label="广告事件名称">
                <Input placeholder="请输入广告事件名称" allowClear />
              </Form.Item>

              <Form.Item name="countrys" label="国家">
                <Input placeholder="请输入国家" allowClear />
              </Form.Item>

              <Form.Item name="platforms" label="平台">
                <Input placeholder="请输入平台" allowClear />
              </Form.Item>

              <Form.Item name="landing_url" label="广告落地页">
                <Input placeholder="请输入落地页URL" allowClear />
              </Form.Item>
            </>
          )}
          {/* 操作按钮和展开/折叠按钮 */}
          <Form.Item className="col-span-1">
            <Space>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button onClick={handleReset}>重置</Button>
              <Button
                type="link"
                onClick={() => setSearchExpanded(!searchExpanded)}
                icon={searchExpanded ? <UpOutlined /> : <DownOutlined />}
              >
                {searchExpanded ? "收起" : "展开"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold m-0">广告管理</h2>
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              新建广告
            </Button>
            <Dropdown
              menu={columnSelectorMenu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button icon={<SettingOutlined />}>列展示</Button>
            </Dropdown>
          </Space>
        </div>
        <Table
          dataSource={adList}
          columns={columns}
          loading={loading}
          rowKey="id"
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
          }}
          onChange={handleTableChange}
          scroll={{ x: 1400 }}
        />
      </Card>
      {/* 新建、编辑广告 */}
      <Drawer
        title={editingRecord ? "编辑广告" : "新建广告"}
        placement="right"
        open={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingRecord(null);
        }}
        width={800}
        closable={true}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Form.Item
                name="name"
                label="广告名称"
                rules={[{ required: true, message: "请输入广告名称" }]}
              >
                <Input placeholder="请输入广告名称" />
              </Form.Item>

              <Form.Item
                name="owner_id"
                label="广告主"
                rules={[{ required: true, message: "请选择广告主" }]}
              >
                <Select placeholder="请选择广告主">
                  {partners.map((partner) => (
                    <Select.Option key={partner.id} value={partner.id}>
                      {partner.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="timeRange"
                label="投放时间"
                rules={[{ required: true, message: "请选择投放时间" }]}
              >
                <RangePicker
                  showTime
                  className="w-full"
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </Form.Item>

              <Form.Item
                name="price"
                label="广告价格"
                rules={[{ required: true, message: "请输入广告价格" }]}
              >
                <InputNumber
                  placeholder="请输入广告价格"
                  min={0}
                  step={0.01}
                  className="w-full"
                />
              </Form.Item>

              <Form.Item
                name="bill_type"
                label="出价类型"
                rules={[{ required: true, message: "请选择出价类型" }]}
              >
                <Select placeholder="请选择出价类型">
                  {Array.isArray(baseInfo?.bill_type) &&
                    baseInfo.bill_type.map((item: BaseInfoOption) => (
                      <Select.Option key={item.value} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="daily_cap"
                label="广告每日限额"
                rules={[{ required: true, message: "请输入广告每日限额" }]}
              >
                <InputNumber
                  placeholder="请输入广告每日限额"
                  min={0}
                  className="w-full"
                />
              </Form.Item>

              <Form.Item
                name="total_cap"
                label="广告总限额"
                rules={[{ required: true, message: "请输入广告总限额" }]}
              >
                <InputNumber
                  placeholder="请输入广告总限额"
                  min={0}
                  className="w-full"
                />
              </Form.Item>

              <Form.Item
                name="status"
                label="广告状态"
                rules={[{ required: true, message: "请选择广告状态" }]}
                initialValue={1}
              >
                <Select placeholder="请选择广告状态">
                  {statusOptions.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div>
              <Form.Item
                name="landing_url"
                label="广告落地页"
                rules={[
                  { required: true, message: "请输入广告落地页" },
                  { type: "url", message: "请输入有效的URL" },
                ]}
              >
                <Input placeholder="请输入广告落地页URL" />
              </Form.Item>

              <Form.Item
                name="countrys"
                label="国家"
                rules={[{ required: true, message: "请选择国家" }]}
              >
                <Select
                  mode="multiple"
                  placeholder="请选择国家"
                  options={countryOptions}
                />
              </Form.Item>

              <Form.Item
                name="platforms"
                label="平台"
                rules={[{ required: true, message: "请选择平台" }]}
              >
                <Select
                  mode="multiple"
                  placeholder="请选择平台"
                  options={platformOptions}
                />
              </Form.Item>

              <Form.Item
                name="bill_event_name"
                label="广告事件名称"
                rules={[{ required: true, message: "请输入广告事件名称" }]}
              >
                <Input placeholder="请输入广告事件名称" />
              </Form.Item>

              <Form.Item
                name="app_url"
                label="应用链接"
                rules={[{ required: true, message: "请输入应用链接" }]}
              >
                <Input placeholder="请输入应用链接" />
              </Form.Item>

              <Form.Item
                name="app_type"
                label="应用类型"
                rules={[{ required: true, message: "请选择应用类型" }]}
              >
                <Select placeholder="请选择应用类型">
                  {Array.isArray(baseInfo?.app_type) &&
                    baseInfo.app_type.map((item: BaseInfoOption) => (
                      <Select.Option key={item.value} value={item.value}>
                        {item.label}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="adv_settle_price"
                label="广告结算价格"
                rules={[{ required: true, message: "请输入广告结算价格" }]}
              >
                <InputNumber
                  placeholder="请输入广告结算价格"
                  min={0}
                  step={0.01}
                  className="w-full"
                />
              </Form.Item>

              <Form.Item
                name="adv_settle_bill_event_name"
                label="广告结算事件"
                rules={[{ required: true, message: "请输入广告结算事件" }]}
              >
                <Input placeholder="请输入广告结算事件" />
              </Form.Item>

              <Form.Item name="target_partner" label="再定向-流量主">
                <Select mode="multiple" placeholder="请选择流量主" allowClear>
                  {partners.map((partner) => (
                    <Select.Option key={partner.id} value={partner.id}>
                      {partner.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

          <Form.Item className="mb-0">
            <Space className="w-full justify-end">
              <Button onClick={() => setIsModalVisible(false)}>取消</Button>
              <Button type="primary" htmlType="submit" loading={submitting}>
                {editingRecord ? "更新" : "创建"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>

      {/* 添加创意抽屉 */}
      <Drawer
        title={`为广告 "${currentRow?.name}" 添加创意`}
        placement="right"
        width={600}
        open={showAddCreative}
        onClose={() => {
          setShowAddCreative(false);
          setCurrentRow(null);
          clearMedia();
          creativeForm.resetFields();
        }}
        closable={true}
      >
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">广告信息</h3>
          <div className="bg-gray-50 p-4 rounded">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">广告ID：</span>
                <span>{currentRow?.id}</span>
              </div>
              <div>
                <span className="text-gray-600">广告名称：</span>
                <span>{currentRow?.name}</span>
              </div>
              <div>
                <span className="text-gray-600">广告价格：</span>
                <span>${currentRow?.price}</span>
              </div>
              <div>
                <span className="text-gray-600">广告类型：</span>
                <span>{currentRow?.bill_type}</span>
              </div>
            </div>
          </div>
        </div>

        <Form
          form={creativeForm}
          layout="vertical"
          onFinish={async (values) => {
            if (!currentRow?.id) return;

            const success = await createNewCreative(currentRow.id, values);
            if (success) {
              setShowAddCreative(false);
              setCurrentRow(null);
              creativeForm.resetFields();
              // 刷新广告列表
              fetchAds();
            }
          }}
        >
          <Form.Item
            name="languages"
            label="创意语言"
            rules={[{ required: true, message: "请选择创意语言" }]}
          >
            <Select
              mode="multiple"
              placeholder="请选择创意语言"
              options={
                Array.isArray(baseInfo?.language)
                  ? baseInfo.language.map((item: BaseInfoOption) => ({
                      label: item.label,
                      value: item.value,
                    }))
                  : []
              }
            />
          </Form.Item>

          <Form.Item
            name="title"
            label="创意标题"
            rules={[{ required: true, message: "请输入创意标题" }]}
          >
            <Input placeholder="请输入创意标题" />
          </Form.Item>

          <Form.Item
            name="description"
            label="创意描述"
            rules={[{ required: true, message: "请输入创意描述" }]}
          >
            <Input.TextArea placeholder="请输入创意描述" rows={3} />
          </Form.Item>

          <Form.Item
            name="sponsored"
            label="赞助商"
            rules={[{ required: true, message: "请输入赞助商" }]}
          >
            <Input placeholder="请输入赞助商" />
          </Form.Item>

          <Form.Item
            name="cta"
            label="行动号召"
            rules={[{ required: true, message: "请输入行动号召" }]}
          >
            <Input placeholder="请输入行动号召" />
          </Form.Item>

          <Form.Item name="main_img">
            <ImageUpload label="主图" onMediaChange={setMainImg} />
          </Form.Item>

          <Form.Item name="icon_img">
            <ImageUpload label="Icon" onMediaChange={setIconImg} />
          </Form.Item>

          <Form.Item name="video">
            <VideoUpload label="视频" onMediaChange={setVideo} />
          </Form.Item>

          <Form.Item className="mb-0">
            <Space className="w-full justify-end">
              <Button
                onClick={() => {
                  setShowAddCreative(false);
                  setCurrentRow(null);
                  clearMedia();
                  creativeForm.resetFields();
                }}
              >
                取消
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={creativeSubmitting}
              >
                创建创意
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default AdPage;
