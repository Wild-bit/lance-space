import {
  Button,
  Descriptions,
  Drawer,
  Form,
  message,
  Select,
  Space,
  Tag,
} from "antd";
import type React from "react";
import { useEffect, useState } from "react";
import { apiClient } from "@/services/client";
import type { Ad, TrafficRecord } from "@/modules/traffic/traffic.types";

interface EditTrafficDrawerProps {
  open: boolean;
  record: TrafficRecord | null;
  onClose: (hasChange: boolean) => void;
}

const EditTrafficDrawer: React.FC<EditTrafficDrawerProps> = ({
  open,
  record,
  onClose,
}) => {
  const [form] = Form.useForm();
  const [availableAds, setAvailableAds] = useState<Ad[]>([]);
  const [selectedAdIds, setSelectedAdIds] = useState<Ad[]>([]);
  const [saveLoading, setSaveLoading] = useState(false);

  // 保存更新
  const handleSubmit = async () => {
    setSaveLoading(true);
    try {
      const values = await form.validateFields();
      console.log("提交的数据:", values);
      console.log("选中的广告数据:", selectedAdIds);

      // 提取广告ID数组
      const adIds = selectedAdIds.map((ad: Ad) =>
        Number.parseInt(ad.id.toString())
      );

      await apiClient.traffic.updateLink({
        id: record?.id || Number.parseInt(record?.link_id || "0"),
        ad_ids: adIds,
      });

      message.success("保存成功");
      onClose(true); // 关闭抽屉并触发父组件的刷新
    } catch (error) {
      console.error("保存失败", error);
      message.error("保存失败");
    } finally {
      setSaveLoading(false);
    }
  };

  const fetchAdList = async () => {
    try {
      // 调用获取定向广告列表接口
      const response = await apiClient.traffic.getAdList({
        countrys: record?.ad_target?.countrys || [],
      });

      // 处理接口返回的数据
      const adList = response?.data?.data || [];
      console.log("获取到的广告列表:", adList);

      setAvailableAds(adList);
    } catch (error) {
      message.error("拉取广告列表失败");
    }
  };

  // 初始化数据
  useEffect(() => {
    if (record && open) {
      // 直接使用 record.ads 作为已选择的广告
      setSelectedAdIds(record?.ads || []);

      // 拉取可用广告列表
      fetchAdList();
    }

    return () => {
      form.setFieldsValue({ ad_selection: undefined });
    };
  }, [record, open]);

  // 移除已选择的广告标签
  const handleRemoveAd = (adId: string) => {
    const newSelectedAds = selectedAdIds.filter(
      (ad: Ad) => ad.id.toString() !== adId
    );
    setSelectedAdIds(newSelectedAds);
    console.log("移除广告:", adId, "剩余广告:", newSelectedAds);
  };

  // 处理广告选择变化
  const handleAdSelectionChange = (selectedId: string) => {
    if (selectedId) {
      // 从可用广告列表中找到选中的广告
      const selectedAd = availableAds.find(
        (ad: Ad) => ad.id.toString() === selectedId
      );
      if (selectedAd) {
        // 检查是否已经选择过
        const isAlreadySelected = selectedAdIds.some(
          (ad: Ad) => ad.id.toString() === selectedId
        );
        if (!isAlreadySelected) {
          setSelectedAdIds([...selectedAdIds, selectedAd]);
          console.log("添加广告到已选择列表:", selectedAd);
        } else {
          message.info("该广告已经选择过了");
        }
      }
    }
    // 清空下拉选择
    form.setFieldsValue({ ad_selection: undefined });
  };

  // 格式化可用广告为 Select options
  const formatAdOptions = () => {
    return availableAds.map((ad: Ad) => ({
      label: `${ad.name} 结算: $${ad.adv_settle_price}/${ad.bill_event_name}`,
      value: ad.id.toString(),
    }));
  };

  return (
    <Drawer
      title="编辑流量"
      open={open}
      onClose={() => onClose(false)}
      width={600}
      footer={
        <div className="text-right">
          <Space>
            <Button onClick={() => onClose(false)}>取消</Button>
            <Button
              loading={saveLoading}
              disabled={saveLoading}
              type="primary"
              onClick={handleSubmit}
            >
              保存
            </Button>
          </Space>
        </div>
      }
    >
      <Descriptions column={1} className="mb-6">
        <Descriptions.Item label="流量名称">
          {record?.link_id}
        </Descriptions.Item>
        <Descriptions.Item label="ID">{record?.ad_unit_id}</Descriptions.Item>
        <Descriptions.Item label="性别">
          {record?.ad_target?.sex}
        </Descriptions.Item>
        <Descriptions.Item label="年龄">
          {record?.ad_target?.ages?.join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="语言">
          {record?.ad_target?.language}
        </Descriptions.Item>
        <Descriptions.Item label="地区">
          {record?.ad_target?.countrys?.join(", ")}
        </Descriptions.Item>
        <Descriptions.Item label="关键词">
          {record?.ad_target?.interests?.join(", ")}
        </Descriptions.Item>
      </Descriptions>

      <Form form={form} layout="vertical">
        <Form.Item label="投放定向" name="ad_selection">
          <Select
            placeholder="可用广告"
            style={{ width: "100%" }}
            options={formatAdOptions()}
            onChange={handleAdSelectionChange}
            allowClear
          />
        </Form.Item>
      </Form>

      {/* 显示已选择的广告标签 */}
      {selectedAdIds.length > 0 && (
        <div className="mb-4">
          <div className="mb-2 font-medium">已选择的广告:</div>
          <Space wrap>
            {selectedAdIds.map((ad: Ad) => (
              <Tag
                key={ad.id}
                closable
                onClose={() => handleRemoveAd(ad.id.toString())}
                className="mb-1"
              >
                {ad.name} ${ad.adv_settle_price} {ad.bill_event_name}
              </Tag>
            ))}
          </Space>
        </div>
      )}
    </Drawer>
  );
};

export default EditTrafficDrawer;
