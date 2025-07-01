/**
 * URL 工具
 */
export const urlUtils = {
  /**
   * 构建查询参数
   */
  buildQuery: (params: Record<string, unknown>): string => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        query.append(key, String(value));
      }
    });
    return query.toString();
  },

  /**
   * 解析查询参数
   */
  parseQuery: (search: string): Record<string, string> => {
    const params = new URLSearchParams(search);
    const result: Record<string, string> = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  },
};
