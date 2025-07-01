import { define } from "@qlj/request";
import type { PageResult } from "@/services/types";
import type {
	GetSettlementListParams,
	SettlementItem,
	UpdateSettlementAmountParams,
} from "./settlement.types";

export const apiModule = {
	/**
	 * 获取流量结算列表
	 */
	getFlowSettlementList: define.post<
		GetSettlementListParams,
		PageResult<SettlementItem>
	>("/api/adadmin/dc_link/settle/list"),
	/**
	 * 更新结算金额
	 */
	updateSettlementAmount: define.post<UpdateSettlementAmountParams, any>(
		"/api/adadmin/dc_link/settle/update_amount",
	),
};
