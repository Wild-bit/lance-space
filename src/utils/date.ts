import { format, parseISO } from "date-fns";
import { zhCN } from "date-fns/locale";

/**
 * 日期格式化工具
 */
export const dateUtils = {
  /**
   * 格式化日期
   */
  format: (date: string | Date, formatStr = "yyyy-MM-dd") => {
    try {
      const dateObj = typeof date === "string" ? parseISO(date) : date;
      return format(dateObj, formatStr, { locale: zhCN });
    } catch {
      return "";
    }
  },

  /**
   * 格式化日期时间
   */
  formatDateTime: (date: string | Date) => {
    return dateUtils.format(date, "yyyy-MM-dd HH:mm:ss");
  },

  /**
   * 格式化时间
   */
  formatTime: (date: string | Date) => {
    return dateUtils.format(date, "HH:mm:ss");
  },

  /**
   * 获取相对时间
   */
  fromNow: (date: string | Date) => {
    // 这里可以使用 date-fns 的 formatDistanceToNow 函数
    // 或者自己实现相对时间逻辑
    return dateUtils.format(date);
  },
};
