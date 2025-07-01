import { create } from "zustand";
import { apiClient } from "@/services/client";
import type {
	BaseInfo,
	FeishuAuthCallbackParams,
	Partner,
} from "./common.types";

/**
 * 基础信息状态接口
 */
interface BaseInfoState {
	baseInfo: BaseInfo | null;
	partners: Partner[];
	loading: boolean;
	fetchBaseInfo: () => Promise<void>;
	fetchPartners: () => Promise<void>;
	fetchAllBaseData: () => Promise<void>;
}

/**
 * 基础信息状态管理
 */
export const useBaseInfoStore = create<BaseInfoState>()((set) => ({
	baseInfo: null,
	partners: [],
	loading: false,

	fetchBaseInfo: async () => {
		set({ loading: true });
		try {
			const response = await apiClient.common.getBaseInfo();
			if (response.code === 0) {
				set({ baseInfo: response.data });
			} else {
				console.error("获取基础信息失败:", response.message);
			}
		} catch (error) {
			console.error("获取基础信息失败:", error);
		} finally {
			set({ loading: false });
		}
	},

	fetchPartners: async () => {
		set({ loading: true });
		try {
			const response = await apiClient.common.getPartners();
			if (response.code === 0) {
				set({ partners: Array.isArray(response.data) ? response.data : [] });
			} else {
				console.error("获取广告主列表失败:", response.message);
				set({ partners: [] });
			}
		} catch (error) {
			console.error("获取广告主列表失败:", error);
			set({ partners: [] });
		} finally {
			set({ loading: false });
		}
	},

	fetchAllBaseData: async () => {
		set({ loading: true });
		try {
			const [baseInfoResponse, partnersResponse] = await Promise.all([
				apiClient.common.getBaseInfo(),
				apiClient.common.getPartners(),
			]);

			const updates: Partial<BaseInfoState> = {};

			if (baseInfoResponse.code === 0) {
				updates.baseInfo = baseInfoResponse.data;
			} else {
				console.error("获取基础信息失败:", baseInfoResponse.message);
			}

			if (partnersResponse.code === 0) {
				updates.partners = Array.isArray(partnersResponse.data)
					? partnersResponse.data
					: [];
			} else {
				console.error("获取广告主列表失败:", partnersResponse.message);
				updates.partners = [];
			}

			set({ ...updates, loading: false });
		} catch (error) {
			console.error("获取基础数据失败:", error);
			set({ partners: [], loading: false });
		}
	},
}));

/**
 * 登录状态接口
 */
interface AuthState {
	feishuAuthUrl: string;
	loading: boolean;
	fetchFeishuAuthUrl: (redirectUri: string) => Promise<void>;
	handleFeishuCallback: (params: FeishuAuthCallbackParams) => Promise<boolean>;
	redirectToFeishu: () => void;
}

/**
 * 登录状态管理
 */
export const useAuthStore = create<AuthState>()((set, get) => ({
	feishuAuthUrl: "",
	loading: false,

	fetchFeishuAuthUrl: async (redirectUri: string) => {
		set({ loading: true });
		try {
			const response = await apiClient.common.getFeishuAuthorizeUrl({
				redirect_uri: redirectUri,
			});
			if (response.code === 0) {
				set({ feishuAuthUrl: response.data?.url || "" });
			} else {
				console.error("获取飞书授权链接失败:", response.message);
			}
		} catch (error) {
			console.error("获取飞书授权链接失败:", error);
		} finally {
			set({ loading: false });
		}
	},

	handleFeishuCallback: async (params: FeishuAuthCallbackParams) => {
		set({ loading: true });
		try {
			const response = await apiClient.common.feishuAuthCallback(params);
			if (response.code === 0) {
				// 这里可以处理登录成功后的逻辑，比如保存token
				// 具体的token处理逻辑需要根据后端返回的数据结构来定义
				return true;
			}
			console.error("飞书授权回调失败:", response.message);
			return false;
		} catch (error) {
			console.error("飞书授权回调失败:", error);
			return false;
		} finally {
			set({ loading: false });
		}
	},

	redirectToFeishu: () => {
		const { feishuAuthUrl } = get();
		if (feishuAuthUrl) {
			window.location.href = feishuAuthUrl;
		}
	},
}));
