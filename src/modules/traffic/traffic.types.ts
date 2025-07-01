import type { PageParams } from "@/services/types";

/**
 * 广告信息类型
 */
export interface Ad {
  id: number;
  name: string;
  adv_settle_price: number;
  bill_event_name: string;
}

/**
 * 广告定向类型
 */
export interface AdTarget {
  sex: string;
  ages: string[];
  language: string;
  countrys: string[];
  interests: string[];
}

/**
 * 流量记录类型
 */
export interface TrafficRecord {
  id?: number;
  link_id: string;
  ad_unit_id: string;
  created_at: string;
  ad_target: AdTarget;
  ads: Ad[];
  imp: number;
  click: number;
  action: number;
  settle_money: number;
  ecpm: number;
}

/**
 * 获取流量列表参数
 */
export interface GetTrafficListParams extends PageParams {
  start_time: string;
  end_time: string;
  show_back_null: boolean;
}

/**
 * 流量查询参数
 */
export interface TrafficQueryParams extends GetTrafficListParams {
  // 可以扩展其他查询参数
}

/**
 * 更新链接广告参数
 */
export interface UpdateLinkParams {
  id: number;
  ad_ids: number[];
}

/**
 * 获取定向广告列表参数
 */
export interface GetAdListParams {
  countrys: string[];
}
