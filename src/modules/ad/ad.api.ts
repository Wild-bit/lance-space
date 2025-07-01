// 广告模块接口

import { define } from "@qlj/request";
import type { PageResult } from "@/services/types";
import type { AdListItem, AdQueryParams, CreateAdRequest } from "./ad.types";

export const apiModule = {
  /**
   * 获取广告列表
   */
  getAds: define.post<AdQueryParams, PageResult<AdListItem>>(
    "/api/adadmin/ads/list_ad",
  ),
  /**
   * 创建广告
   */
  createAd: define.post<CreateAdRequest, any>("/api/adadmin/ads/create_ad"),
  /**
   * 更新广告
   */
  updateAd: define.post<CreateAdRequest, any>("/api/adadmin/ads/update_ad"),
  /**
   * 删除广告
   */
  deleteAd: define.post<{ id: number }, any>("/api/adadmin/ads/delete_ad"),
  /**
   * 获取广告详情
   */
  getAdDetail: define.post<{ id: number }, AdListItem>(
    "/api/adadmin/ads/get_ad",
  ),
};
