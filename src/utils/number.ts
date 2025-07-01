/**
 * 数值格式化工具
 */
export const numberUtils = {
  /**
   * 格式化文件大小
   */
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / k ** i).toFixed(2)} ${sizes[i]}`;
  },

  /**
   * 格式化数字（添加千分位分隔符）
   */
  formatNumber: (num: number): string => {
    return num.toLocaleString("zh-CN");
  },

  /**
   * 格式化百分比
   */
  formatPercent: (num: number, decimals = 2): string => {
    return `${(num * 100).toFixed(decimals)}%`;
  },
};
