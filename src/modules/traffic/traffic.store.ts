import { message } from "antd";
import { create } from "zustand";
import { apiClient } from "@/services/client";
import type {
	GetAdListParams,
	GetTrafficListParams,
	TrafficRecord,
	UpdateLinkParams,
} from "./traffic.types";

interface TrafficState {
	// 状态
	loading: boolean;
	submitting: boolean;
	dataSource: TrafficRecord[];
	total: number;
	current: number;
	pageSize: number;

	// 广告列表相关
	availableAds: any[];
	adListLoading: boolean;

	// 操作方法
	fetchTrafficList: (params: GetTrafficListParams) => Promise<void>;
	fetchAdList: (params: GetAdListParams) => Promise<void>;
	updateLinkAds: (params: UpdateLinkParams) => Promise<boolean>;
	setPagination: (pagination: {
		current: number;
		pageSize: number;
		total: number;
	}) => void;
	setLoading: (loading: boolean) => void;
	setSubmitting: (submitting: boolean) => void;
	reset: () => void;
}

const initialState = {
	loading: false,
	submitting: false,
	dataSource: [],
	total: 0,
	current: 1,
	pageSize: 10,
	availableAds: [],
	adListLoading: false,
};

export const useTrafficStore = create<TrafficState>((set) => ({
	...initialState,

	/**
	 * 获取流量列表
	 */
	fetchTrafficList: async (params: GetTrafficListParams) => {
		set({ loading: true });
		try {
			const response = await apiClient.traffic.getLinkList(params);

			if (response.code === 0) {
				set({
					dataSource: response.data.items || [],
					total: response.data.total || 0,
				});
			} else {
				message.error(response.message || "获取流量数据失败");
				set({ dataSource: [], total: 0 });
			}
		} catch (error) {
			message.error("获取流量数据失败");
			console.error("获取流量数据失败:", error);
			// 使用空数据进行展示
			set({ dataSource: [], total: 0 });
		} finally {
			set({ loading: false });
		}
	},

	/**
	 * 获取定向广告列表
	 */
	fetchAdList: async (params: GetAdListParams) => {
		set({ adListLoading: true });
		try {
			const response = await apiClient.traffic.getAdList(params);

			if (response.code === 0) {
				set({ availableAds: response.data?.data || [] });
			} else {
				message.error(response.message || "获取广告列表失败");
				set({ availableAds: [] });
			}
		} catch (error) {
			message.error("拉取广告列表失败");
			console.error("获取广告列表失败:", error);
			set({ availableAds: [] });
		} finally {
			set({ adListLoading: false });
		}
	},

	/**
	 * 更新链接绑定的广告
	 */
	updateLinkAds: async (params: UpdateLinkParams) => {
		set({ submitting: true });
		try {
			await apiClient.traffic.updateLink(params);
			message.success("保存成功");
			return true;
		} catch (error) {
			message.error("保存失败");
			console.error("更新链接广告失败:", error);
			return false;
		} finally {
			set({ submitting: false });
		}
	},

	/**
	 * 设置分页信息
	 */
	setPagination: (pagination: {
		current: number;
		pageSize: number;
		total: number;
	}) => {
		set({
			current: pagination.current,
			pageSize: pagination.pageSize,
			total: pagination.total,
		});
	},

	/**
	 * 设置加载状态
	 */
	setLoading: (loading: boolean) => set({ loading }),

	/**
	 * 设置提交状态
	 */
	setSubmitting: (submitting: boolean) => set({ submitting }),

	/**
	 * 重置状态
	 */
	reset: () => set(initialState),
}));
