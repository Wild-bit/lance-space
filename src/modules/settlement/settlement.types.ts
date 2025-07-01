/**
 * 流量结算项类型
 */
export interface SettlementItem {
  id: number;
  date: string;
  link_id: string;
  imp: number;
  click: number;
  action: number;
  income: number;
  ecpm: number;
  settle_money: number;
}

/**
 * 获取流量结算列表参数
 */
export interface GetSettlementListParams {
  status: number;
}

/**
 * 更新结算金额参数
 */
export interface UpdateSettlementAmountParams {
  id: number;
  settle_money: number;
}

/**
 * 结算查询参数
 */
export interface SettlementQueryParams extends GetSettlementListParams {
  // 可以扩展其他查询参数
}
