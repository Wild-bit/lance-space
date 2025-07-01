import { message } from "antd";
import { create } from "zustand";
import { apiClient } from "@/services/client";
import type {
	GetSettlementListParams,
	SettlementItem,
	UpdateSettlementAmountParams,
} from "./settlement.types";

interface SettlementState {
	// 状态
	loading: boolean;
	submitting: boolean;
	dataSource: SettlementItem[];
	total: number;

	// 操作方法
	fetchSettlementList: (params: GetSettlementListParams) => Promise<void>;
	updateAmount: (params: UpdateSettlementAmountParams) => Promise<boolean>;
	setLoading: (loading: boolean) => void;
	setSubmitting: (submitting: boolean) => void;
	reset: () => void;
}

const initialState = {
	loading: false,
	submitting: false,
	dataSource: [],
	total: 0,
};

export const useSettlementStore = create<SettlementState>((set) => ({
	...initialState,

	/**
	 * 获取结算列表
	 */
	fetchSettlementList: async (params: GetSettlementListParams) => {
		set({ loading: true });
		try {
			const response = await apiClient.settlement.getFlowSettlementList(params);

			if (response.code === 0) {
				set({
					dataSource: response.data.items || [],
					total: response.data.total || 0,
				});
			} else {
				message.error(response.message || "获取结算数据失败");
				set({ dataSource: [], total: 0 });
			}
		} catch (error) {
			message.error("获取结算数据失败");
			console.error("获取结算数据失败:", error);
			set({ dataSource: [], total: 0 });
		} finally {
			set({ loading: false });
		}
	},

	/**
	 * 更新结算金额
	 */
	updateAmount: async (params: UpdateSettlementAmountParams) => {
		set({ submitting: true });
		try {
			await apiClient.settlement.updateSettlementAmount(params);
			message.success("结算金额更新成功");
			return true;
		} catch (error) {
			message.error("更新结算金额失败");
			console.error("更新结算金额失败:", error);
			return false;
		} finally {
			set({ submitting: false });
		}
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
