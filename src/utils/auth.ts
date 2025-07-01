const TOKEN_KEY = "dsp_admin_token";
const USER_INFO_KEY = "dsp_admin_user_info";

/**
 * 获取token
 */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * 设置token
 */
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * 清除token
 */
export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * 获取用户信息
 */
export interface UserInfo {
  id: number;
  union_id: string;
  name: string;
  avatar: string;
}

export function getUserInfo(): UserInfo | null {
  const userInfo = localStorage.getItem(USER_INFO_KEY);
  return userInfo ? JSON.parse(userInfo) : null;
}

/**
 * 设置用户信息
 */
export function setUserInfo(userInfo: unknown): void {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
}

/**
 * 清除用户信息
 */
export function clearUserInfo(): void {
  localStorage.removeItem(USER_INFO_KEY);
}

/**
 * 检查是否已登录
 */
export function isAuthenticated(): boolean {
  const token = getToken();
  return !!token;
}

/**
 * 清除所有认证信息
 */
export function clearAuth(): void {
  clearToken();
  clearUserInfo();
}
