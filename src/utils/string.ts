/**
 * 字符串工具
 */
export const stringUtils = {
  /**
   * 首字母大写
   */
  capitalize: (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
   * 驼峰转下划线
   */
  camelToSnake: (str: string): string => {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  },

  /**
   * 下划线转驼峰
   */
  snakeToCamel: (str: string): string => {
    return str.replace(/_[a-z]/g, (letter) => letter.slice(1).toUpperCase());
  },

  /**
   * 截断字符串
   */
  truncate: (str: string, length: number, suffix = "..."): string => {
    if (str.length <= length) return str;
    return str.slice(0, length) + suffix;
  },
};
