import type { CountryType, PlatformType, StatusType } from "./ad.enum";

/**
 * 定向-流量主
 */
export interface Targeting {
  partner_id: number[];
  [property: string]: any;
}

/**
 * 广告列表项类型
 */
export interface AdListItem {
  id: number;
  name: string;
  begin_time: string;
  end_time: string;
  price: number;
  bill_type: string;
  daily_cap: number;
  total_cap: number;
  status: StatusType;
  landing_url: string;
  bill_event_name: string;
  countrys: CountryType[];
  owner_id: number;
  platforms: PlatformType[];
  app_url: string;
  app_type: number;
  adv_settle_price: number;
  adv_settle_bill_event_name: string;
  targeting: Targeting;
}

/**
 * 创建广告请求类型
 */
export interface CreateAdRequest {
  /**
   * 广告ID (编辑时使用)
   */
  id?: number;
  /**
   * 广告名称
   */
  name: string;
  /**
   * 结算事件
   */
  adv_settle_bill_event_name: string;
  /**
   * 结算价格
   */
  adv_settle_price: number;
  /**
   * APP类型
   */
  app_type: number;
  /**
   * APP链接
   */
  app_url: string;
  /**
   * 开始时间
   */
  begin_time: string;
  /**
   * 事件名称
   */
  bill_event_name: string;
  /**
   * 计费方式
   */
  bill_type: string;
  /**
   * 国家列表
   */
  countrys: CountryType[];
  /**
   * 每日限额
   */
  daily_cap: number;
  /**
   * 结束时间
   */
  end_time: string;
  /**
   * 落地页
   */
  landing_url: string;
  /**
   * 广告主ID
   */
  owner_id: number;
  /**
   * 平台列表
   */
  platforms: PlatformType[];
  /**
   * 价格
   */
  price: string;
  /**
   * 状态
   */
  status: StatusType;
  /**
   * 定向-流量主
   */
  targeting: Targeting;
  /**
   * 总限额
   */
  total_cap: number;
  [property: string]: any;
}

/**
 * 广告查询参数
 */
export interface AdQueryParams {
  page_num: number;
  page_size: number;
  name?: string;
  begin_time?: string;
  end_time?: string;
  price?: number;
  status?: StatusType;
  owner_id?: number;
  [key: string]: any;
}

/**
 * 广告表单数据
 */
export interface AdFormData
  extends Omit<CreateAdRequest, "begin_time" | "end_time" | "targeting"> {
  timeRange: [string, string];
  target_partner?: number[];
}
