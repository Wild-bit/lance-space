import { message } from "antd";
import { create } from "zustand";
import { apiClient } from "@/services/client";
import type {
	CreateCreativeRequest,
	CreativeFormData,
	CreativeImage,
	CreativeListItem,
	CreativeQueryParams,
	CreativeVideo,
	MediaUploadState,
} from "./creative.types";

interface CreativeStore extends MediaUploadState {
	// 数据状态
	creativeList: CreativeListItem[];
	pagination: {
		current: number;
		pageSize: number;
		total: number;
	};

	// 加载状态
	loading: boolean;
	submitting: boolean;

	// 搜索参数
	searchParams: Partial<CreativeQueryParams>;

	// Actions
	fetchCreatives: (params?: Partial<CreativeQueryParams>) => Promise<void>;
	updateCreativeStatusById: (id: number, status: number) => Promise<boolean>;
	createNewCreative: (
		adId: number,
		formData: CreativeFormData,
	) => Promise<boolean>;
	setMainImg: (images: CreativeImage[]) => void;
	setIconImg: (images: CreativeImage[]) => void;
	setVideo: (videos: CreativeVideo[]) => void;
	clearMedia: () => void;

	// 分页和搜索
	setSearchParams: (params: Partial<CreativeQueryParams>) => void;
	setPagination: (pagination: Partial<CreativeStore["pagination"]>) => void;
	resetSearch: () => void;
}

export const useCreativeStore = create<CreativeStore>((set, get) => ({
	// 初始状态
	creativeList: [],
	pagination: {
		current: 1,
		pageSize: 10,
		total: 0,
	},
	loading: false,
	submitting: false,
	searchParams: {},
	mainImg: [],
	iconImg: [],
	video: [],

	// 创建新创意
	createNewCreative: async (adId: number, formData: CreativeFormData) => {
		set({ submitting: true });
		try {
			const { mainImg, iconImg, video } = get();

			// 检查必填的媒体文件
			if (!iconImg[0]) {
				message.error("请上传图标图片");
				return false;
			}
			if (!mainImg[0]) {
				message.error("请上传主图");
				return false;
			}
			if (!video[0]) {
				message.error("请上传视频");
				return false;
			}

			const data: CreateCreativeRequest = {
				ad_id: adId,
				title: formData.title,
				description: formData.description,
				sponsored: formData.sponsored,
				cta: formData.cta,
				languages: formData.languages,
				icon_img: iconImg[0],
				main_img: mainImg[0],
				video: video[0],
			};

			const response = await apiClient.creative.createCreative(data);

			if (response.code === 0) {
				message.success("创建创意成功");
				// 清空媒体文件
				set({
					mainImg: [],
					iconImg: [],
					video: [],
				});
				return true;
			}
			message.error(response.message || "创建创意失败");
			return false;
		} catch (error: any) {
			const errorMessage =
				error?.response?.data?.message || error?.message || "创建创意失败";
			message.error(errorMessage);
			console.error("创建创意失败:", error);
			return false;
		} finally {
			set({ submitting: false });
		}
	},

	// 设置主图
	setMainImg: (images: CreativeImage[]) => {
		set({ mainImg: images });
	},

	// 设置图标
	setIconImg: (images: CreativeImage[]) => {
		set({ iconImg: images });
	},

	// 设置视频
	setVideo: (videos: CreativeVideo[]) => {
		set({ video: videos });
	},

	// 获取创意列表
	fetchCreatives: async (params) => {
		set({ loading: true });
		try {
			const { pagination, searchParams } = get();
			const queryParams: CreativeQueryParams = {
				page_num: pagination.current,
				page_size: pagination.pageSize,
				...searchParams,
				...params,
			};

			const response = await apiClient.creative.getCreatives(queryParams);

			if (response.code === 0) {
				set({
					// ALERT: data.data 这是不合规范的接口，如果有迭代，需要修改接口让后端改回 data.items 的数据格式
					creativeList: response.data.data || [],
					pagination: {
						...pagination,
						total: response.data.total,
					},
				});
			} else {
				message.error(response.message || "获取创意列表失败");
			}
		} catch (error) {
			console.error("获取创意列表失败:", error);
			message.error("获取创意列表失败");
		} finally {
			set({ loading: false });
		}
	},

	// 更新创意状态
	updateCreativeStatusById: async (id, status) => {
		try {
			const response = await apiClient.creative.updateCreativeStatus({
				id,
				status,
			});

			if (response.code === 0) {
				message.success("状态更新成功");
				// 刷新列表
				get().fetchCreatives();
				return true;
			}
			message.error(response.message || "状态更新失败");
			return false;
		} catch (error: any) {
			const errorMessage =
				error?.response?.data?.message || error?.message || "状态更新失败";
			message.error(errorMessage);
			console.error("状态更新失败:", error);
			return false;
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

	// 清空媒体文件
	clearMedia: () => {
		set({
			mainImg: [],
			iconImg: [],
			video: [],
		});
	},
}));
