/**
 * 创意图片类型
 */
export interface CreativeImage {
  url: string;
  w: number;
  h: number;
  type: number;
}

/**
 * 创意视频类型
 */
export interface CreativeVideo {
  url: string;
  mp4url: string;
  m3u8url: string;
  duration: number;
  w: number;
  h: number;
}

/**
 * 创意列表项类型
 */
export interface CreativeListItem {
  id: number;
  ad_id: number;
  title: string;
  description: string;
  sponsored: string;
  icon_img: CreativeImage;
  main_img: CreativeImage;
  video: CreativeVideo;
  cta: string;
  languages: string[];
  status: number;
}

/**
 * 创建创意请求类型
 */
export interface CreateCreativeRequest {
  ad_id: number;
  title: string;
  description: string;
  sponsored: string;
  cta: string;
  languages: string[];
  icon_img: CreativeImage;
  main_img: CreativeImage;
  video: CreativeVideo;
}

/**
 * 创意表单数据类型
 */
export interface CreativeFormData {
  ad_id?: number;
  title: string;
  description: string;
  sponsored: string;
  cta: string;
  languages: string[];
  main_img?: File[];
  icon_img?: File[];
  video?: File[];
}

/**
 * 创意查询参数
 */
export interface CreativeQueryParams {
  page_num: number;
  page_size: number;
  id?: number;
  title?: string;
  description?: string;
  [key: string]: any;
}

/**
 * 媒体上传状态
 */
export interface MediaUploadState {
  mainImg: CreativeImage[];
  iconImg: CreativeImage[];
  video: CreativeVideo[];
}
