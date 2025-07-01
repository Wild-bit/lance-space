import { message } from "antd";
import dayjs from "dayjs";
import { create } from "zustand";
import { apiClient } from "@/services/client";
import type { ApiError } from "../common/common.types";
import type {
  AdFormData,
  AdListItem,
  AdQueryParams,
  CreateAdRequest,
} from "./ad.types";

interface AdState {
  // 数据状态
  adList: AdListItem[];
  currentAd: AdListItem | null;
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };

  // 加载状态
  loading: boolean;
  submitting: boolean;

  // 搜索参数
  searchParams: Partial<AdQueryParams>;

  // Actions
  fetchAds: (params?: Partial<AdQueryParams>) => Promise<void>;
  createNewAd: (data: AdFormData) => Promise<boolean>;
  updateExistingAd: (id: number, data: AdFormData) => Promise<boolean>;
  deleteAdById: (id: number) => Promise<boolean>;
  getAdDetail: (id: number) => Promise<AdListItem | null>;

  // 分页和搜索
  setSearchParams: (params: Partial<AdQueryParams>) => void;
  setPagination: (pagination: Partial<AdState["pagination"]>) => void;
  resetSearch: () => void;

  // 重置状态
  reset: () => void;
}

const initialState = {
  adList: [],
  currentAd: null,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
  loading: false,
  submitting: false,
  searchParams: {},
};

export const useAdStore = create<AdState>((set, get) => ({
  ...initialState,

  // 获取广告列表
  fetchAds: async (params) => {
    set({ loading: true });
    try {
      const { pagination, searchParams } = get();
      const queryParams: AdQueryParams = {
        page_num: pagination.current,
        page_size: pagination.pageSize,
        ...searchParams,
        ...params,
      };

      const response = await apiClient.ad.getAds(queryParams);

      if (response.code === 0) {
        set({
          // ALERT: data.data 这是不合规范的接口，如果有迭代，需要修改接口让后端改回 data.items 的数据格式
          adList: response.data.data,
          pagination: {
            ...pagination,
            total: response.data.total,
          },
        });
      } else {
        message.error(response.message || "获取广告列表失败");
      }
    } catch (error) {
      console.error("获取广告列表失败:", error);
      message.error("获取广告列表失败");
    } finally {
      set({ loading: false });
    }
  },

  // 创建广告
  createNewAd: async (formData) => {
    set({ submitting: true });
    try {
      const { timeRange, target_partner, ...restValues } = formData;

      const requestData: CreateAdRequest = {
        ...restValues,
        begin_time: dayjs(timeRange[0]).format("YYYY-MM-DD HH:mm:ss"),
        end_time: dayjs(timeRange[1]).format("YYYY-MM-DD HH:mm:ss"),
        targeting: {
          partner_id: target_partner || [],
        },
      } as CreateAdRequest;

      const response = await apiClient.ad.createAd(requestData);

      if (response.code === 0) {
        message.success("创建广告成功");
        // 刷新列表
        get().fetchAds();
        return true;
      }
      message.error(response.message || "创建广告失败");
      return false;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError?.response?.data?.message || apiError?.message || "创建广告失败";
      message.error(errorMessage);
      console.error("创建广告失败:", error);
      return false;
    } finally {
      set({ submitting: false });
    }
  },

  // 更新广告
  updateExistingAd: async (id, formData) => {
    set({ submitting: true });
    try {
      const { timeRange, target_partner, ...restValues } = formData;

      const requestData: CreateAdRequest = {
        ...restValues,
        id,
        begin_time: dayjs(timeRange[0]).format("YYYY-MM-DD HH:mm:ss"),
        end_time: dayjs(timeRange[1]).format("YYYY-MM-DD HH:mm:ss"),
        targeting: {
          partner_id: target_partner || [],
        },
      } as CreateAdRequest;

      const response = await apiClient.ad.updateAd(requestData);

      if (response.code === 0) {
        message.success("更新广告成功");
        // 刷新列表
        get().fetchAds();
        return true;
      }
      message.error(response.message || "更新广告失败");
      return false;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError?.response?.data?.message || apiError?.message || "更新广告失败";
      message.error(errorMessage);
      console.error("更新广告失败:", error);
      return false;
    } finally {
      set({ submitting: false });
    }
  },

  // 删除广告
  deleteAdById: async (id) => {
    try {
      const response = await apiClient.ad.deleteAd({ id });

      if (response.code === 0) {
        message.success("删除广告成功");
        // 刷新列表
        get().fetchAds();
        return true;
      }
      message.error(response.message || "删除广告失败");
      return false;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError?.response?.data?.message || apiError?.message || "删除广告失败";
      message.error(errorMessage);
      console.error("删除广告失败:", error);
      return false;
    }
  },

  // 获取广告详情
  getAdDetail: async (id) => {
    try {
      const response = await apiClient.ad.getAdDetail({ id });

      if (response.code === 0) {
        set({ currentAd: response.data });
        return response.data;
      }
      message.error(response.message || "获取广告详情失败");
      return null;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError?.response?.data?.message || apiError?.message || "获取广告详情失败";
      message.error(errorMessage);
      console.error("获取广告详情失败:", error);
      return null;
    }
  },

  // 设置搜索参数
  setSearchParams: (params) => {
    set({
      searchParams: { ...get().searchParams, ...params },
      pagination: { ...get().pagination, current: 1 },
    });
  },

  // 设置分页
  setPagination: (pagination) => {
    set({ pagination: { ...get().pagination, ...pagination } });
  },

  // 重置搜索
  resetSearch: () => {
    set({
      searchParams: {},
      pagination: { ...get().pagination, current: 1 },
    });
  },

  // 重置状态
  reset: () => {
    set(initialState);
  },
}));
