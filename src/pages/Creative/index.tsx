import {
  DownOutlined,
  PlusOutlined,
  SettingOutlined,
  UpOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Drawer,
  Dropdown,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import type React from "react";
import { useEffect, useState } from "react";
import ImageUpload from "@/components/UploadComponents/ImageUpload";
import VideoUpload from "@/components/UploadComponents/VideoUpload";
import { useAdStore } from "@/modules/ad/ad.store";
import { useBaseInfoStore } from "@/modules/common/common.store";
import type { BaseInfoOption } from "@/modules/common/common.types";
import { useCreativeStore } from "@/modules/creative/creative.store";
import type {
  CreativeFormData,
  CreativeListItem,
} from "@/modules/creative/creative.types";

const CreativePage: React.FC = () => {
  const [searchForm] = Form.useForm();
  const [creativeForm] = Form.useForm();
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    "id",
    "title",
    "description",
    "icon",
    "main_img",
    "cta",
    "languages",
    "video",
    "status",
    "action",
  ]);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);

  // 基础信息状态管理
  const {
    baseInfo,
    fetchAllBaseData,
    loading: baseInfoLoading,
  } = useBaseInfoStore();

  // 广告状态管理
  const { adList, fetchAds: fetchAdList } = useAdStore();

  // 创意状态管理
  const {
    creativeList,
    loading,
    pagination,
    searchParams,
    fetchCreatives,
    updateCreativeStatusById,
    setSearchParams,
    setPagination,
    resetSearch,
    submitting: creativeSubmitting,
    createNewCreative,
    setMainImg,
    setIconImg,
    setVideo,
    clearMedia,
  } = useCreativeStore();

  // 更新状态
  const handleUpdateStatus = async (id: number, status: number) => {
    await updateCreativeStatusById(id, status);
  };

  // 列选择器功能
  const allColumns = [
    { key: "id", title: "创意ID" },
    { key: "title", title: "创意标题" },
    { key: "description", title: "创意描述" },
    { key: "icon", title: "创意图标" },
    { key: "main_img", title: "创意主图" },
    { key: "cta", title: "CTA" },
    { key: "languages", title: "语言" },
    { key: "video", title: "视频" },
    { key: "status", title: "状态" },
    { key: "action", title: "操作" },
  ];

  const handleColumnVisibilityChange = (
    columnKey: string,
    checked: boolean
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
      title: "创意ID",
      key: "id",
      render: (record: CreativeListItem) => (
        <div>
          <div className="text-sm">广告ID: {record.ad_id}</div>
          <div className="text-sm font-medium">创意ID: {record.id}</div>
        </div>
      ),
    },
    {
      title: "创意标题",
      dataIndex: "title",
      key: "title",
      width: 200,
      render: (title: string) => (
        <div className="max-w-48 truncate" title={title}>
          {title}
        </div>
      ),
    },
    {
      title: "创意描述",
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (description: string) => (
        <div className="max-w-48 truncate" title={description}>
          {description}
        </div>
      ),
    },
    {
      title: "创意图标",
      key: "icon",
      render: (record: CreativeListItem) => (
        <Image
          src={record?.icon_img?.url}
          width={60}
          height={60}
          className="rounded object-cover"
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
        />
      ),
    },
    {
      title: "创意主图",
      key: "main_img",
      render: (record: CreativeListItem) => (
        <Image
          src={record?.main_img?.url}
          width={60}
          height={60}
          className="rounded object-cover"
          fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
        />
      ),
    },
    {
      title: "CTA",
      dataIndex: "cta",
      key: "cta",
    },
    {
      title: "语言",
      key: "languages",
      render: (record: CreativeListItem) => (
        <Space wrap>
          {Array.isArray(record?.languages) &&
            record.languages.map((language: string) => (
              <Tag color="blue" key={language}>
                {language}
              </Tag>
            ))}
        </Space>
      ),
    },
    {
      title: "视频",
      key: "video",
      width: 300,
      render: (record: CreativeListItem) => (
        <div className="flex flex-col items-center">
          {record?.video?.mp4url ? (
            <video
              src={record.video.mp4url}
              width={120}
              height={150}
              className="rounded"
              controls
              poster={record.video.url}
            >
              <track kind="captions" />
            </video>
          ) : (
            <div className="w-30 h-38 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-400 text-sm">无视频</span>
            </div>
          )}
          {record?.video?.m3u8url && (
            <div className="text-xs text-gray-500 mt-2 max-w-72 break-all">
              <span className="font-medium text-blue-500">m3u8: </span>
              {record.video.m3u8url.length > 50
                ? `${record.video.m3u8url.slice(0, 50)}...`
                : record.video.m3u8url}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status: number) => (
        <Tag color={status === 1 ? "green" : "red"}>
          {status === 1 ? "启用" : "禁用"}
        </Tag>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (record: CreativeListItem) => (
        <Space>
          {record.status === 1 ? (
            <Button
              type="link"
              danger
              onClick={() => handleUpdateStatus(record.id, 0)}
            >
              禁用
            </Button>
          ) : (
            <Button
              type="link"
              onClick={() => handleUpdateStatus(record.id, 1)}
            >
              启用
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // 根据可见列过滤表格列
  const columns = allTableColumns.filter((col) =>
    visibleColumns.includes(col.key)
  );

  // 搜索功能
  const handleSearch = (values: any) => {
    const params: any = {};

    // 处理创意ID搜索
    if (values.id) {
      params.id = values.id;
    }

    // 处理广告ID搜索
    if (values.ad_id) {
      params.ad_id = values.ad_id;
    }

    // 处理创意标题搜索
    if (values.title) {
      params.title = values.title;
    }

    // 处理创意描述搜索
    if (values.description) {
      params.description = values.description;
    }

    // 处理CTA搜索
    if (values.cta) {
      params.cta = values.cta;
    }

    // 处理赞助商搜索
    if (values.sponsored) {
      params.sponsored = values.sponsored;
    }

    // 处理状态搜索
    if (values.status !== undefined) {
      params.status = values.status;
    }

    // 处理语言搜索
    if (values.languages && values.languages.length > 0) {
      params.languages = values.languages;
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

  // 获取基础数据
  const fetchBaseData = async () => {
    try {
      await Promise.all([
        fetchAdList({ page_num: 1, page_size: 1000 }),
        fetchAllBaseData(),
      ]);
    } catch (error) {
      console.error("获取基础数据失败:", error);
    }
  };

  // 处理创建创意
  const handleCreateCreative = async (values: CreativeFormData) => {
    if (!values.ad_id) {
      message.error("请选择广告");
      return;
    }

    const success = await createNewCreative(values.ad_id, values);
    if (success) {
      setShowCreateDrawer(false);
      creativeForm.resetFields();
      clearMedia();
      fetchCreatives();
    }
  };

  // 打开创建抽屉
  const handleOpenCreateDrawer = () => {
    setShowCreateDrawer(true);
    creativeForm.resetFields();
    clearMedia();
  };

  useEffect(() => {
    fetchCreatives();
  }, [pagination.current, pagination.pageSize, searchParams]);

  useEffect(() => {
    fetchBaseData();
  }, []);

  // 调试：查看 baseInfo 状态
  useEffect(() => {
    console.log("baseInfo updated:", baseInfo);
    console.log("baseInfo.language:", baseInfo?.language);
  }, [baseInfo]);

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
          <Form.Item name="id" label="创意ID">
            <Input placeholder="请输入创意ID" allowClear />
          </Form.Item>

          <Form.Item name="title" label="创意标题">
            <Input placeholder="请输入创意标题" allowClear />
          </Form.Item>

          <Form.Item name="ad_id" label="广告ID">
            <InputNumber
              placeholder="请输入广告ID"
              style={{ width: "100%" }}
              min={0}
            />
          </Form.Item>
          {/* 展开的搜索条件 */}
          {searchExpanded && (
            <>
              <Form.Item name="description" label="创意描述">
                <Input placeholder="请输入创意描述" allowClear />
              </Form.Item>

              <Form.Item name="cta" label="CTA">
                <Input placeholder="请输入CTA" allowClear />
              </Form.Item>

              <Form.Item name="sponsored" label="赞助商">
                <Input placeholder="请输入赞助商" allowClear />
              </Form.Item>

              <Form.Item name="status" label="状态">
                <Select placeholder="请选择状态" allowClear>
                  <Select.Option value={1}>启用</Select.Option>
                  <Select.Option value={0}>禁用</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="languages" label="语言">
                <Input placeholder="请输入语言" allowClear />
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
          <h2 className="text-lg font-semibold m-0">创意管理</h2>
          <Space>
            {/* 原本旧项目有新建创意功能置灰，现在暂时关闭 */}
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleOpenCreateDrawer}
              disabled={true}
            >
              新建创意
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
          dataSource={creativeList}
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
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* 新建创意抽屉 */}
      <Drawer
        title="新建创意"
        placement="right"
        width={600}
        open={showCreateDrawer}
        onClose={() => {
          setShowCreateDrawer(false);
          creativeForm.resetFields();
          clearMedia();
        }}
        closable={true}
      >
        <Form
          form={creativeForm}
          layout="vertical"
          onFinish={handleCreateCreative}
        >
          <Form.Item
            name="ad_id"
            label="选择广告"
            rules={[{ required: true, message: "请选择广告" }]}
          >
            <Select
              placeholder="请选择广告"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.children as unknown as string)
                  ?.toLowerCase()
                  ?.includes(input.toLowerCase())
              }
            >
              {adList.map((ad) => (
                <Select.Option key={ad.id} value={ad.id}>
                  {ad.name} (ID: {ad.id})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="languages"
            label="创意语言"
            rules={[{ required: true, message: "请选择创意语言" }]}
          >
            <Select
              mode="multiple"
              placeholder="请选择创意语言"
              loading={baseInfoLoading}
              onFocus={() => {
                console.log("Select focused, baseInfo:", baseInfo);
                console.log(
                  "Select options:",
                  Array.isArray(baseInfo?.language)
                    ? baseInfo.language.map((item: BaseInfoOption) => ({
                        label: item.label,
                        value: item.value,
                      }))
                    : []
                );
              }}
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

          <Form.Item
            name="main_img"
            rules={[{ required: true, message: "请上传主图" }]}
          >
            <ImageUpload label="主图" onMediaChange={setMainImg} />
          </Form.Item>

          <Form.Item
            name="icon_img"
            rules={[{ required: true, message: "请上传图标" }]}
          >
            <ImageUpload label="Icon" onMediaChange={setIconImg} />
          </Form.Item>

          <Form.Item
            name="video"
            rules={[{ required: true, message: "请上传视频" }]}
          >
            <VideoUpload label="视频" onMediaChange={setVideo} />
          </Form.Item>

          <Form.Item className="mb-0">
            <Space className="w-full justify-end">
              <Button
                onClick={() => {
                  setShowCreateDrawer(false);
                  creativeForm.resetFields();
                  clearMedia();
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

export default CreativePage;
