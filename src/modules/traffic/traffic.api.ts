import { define } from "@qlj/request";
import type { PageResult } from "@/services/types";
import type {
	GetAdListParams,
	GetTrafficListParams,
	TrafficRecord,
	UpdateLinkParams,
} from "./traffic.types";

export const apiModule = {
	/**
	 * 获取流量列表
	 */
	getLinkList: define.post<GetTrafficListParams, PageResult<TrafficRecord>>(
		"/api/adadmin/dc_link/link/list",
	),
	/**
	 * 获取定向广告列表
	 */
	getAdList: define.post<GetAdListParams, any>(
		"/api/adadmin/ads/list_targeting_ad",
	),
	/**
	 * 流量编辑 - 更新链接绑定的广告
	 */
	updateLink: define.post<UpdateLinkParams, any>(
		"/api/adadmin/dc_link/link/update_ads",
	),
};
