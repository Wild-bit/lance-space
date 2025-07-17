// /**
//  * 基础信息选项类型
//  */
// export interface BaseInfoOption {
//   label: string;
//   value: string | number;
// }

// /**
//  * 基础信息类型
//  */
// export interface BaseInfo {
//   bill_type: BaseInfoOption[];
//   app_type: BaseInfoOption[];
//   language: BaseInfoOption[];
//   [property: string]: any;
// }

// /**
//  * 广告主类型
//  */
// export interface Partner {
//   id: number;
//   name: string;
//   [property: string]: any;
// }

// /**
//  * 飞书授权URL数据类型
//  */
// export interface FeishuAuthUrlData {
//   url: string;
// }

// /**
//  * 飞书授权回调参数
//  */
// export interface FeishuAuthCallbackParams {
//   code: string;
//   state: string;
// }

// /**
//  * API错误响应类型
//  */
// export interface ApiErrorResponse {
//   code: number;
//   message: string;
//   data?: unknown;
// }

// /**
//  * 通用API错误类型
//  */
// export interface ApiError {
//   message: string;
//   response?: {
//     data?: ApiErrorResponse;
//     status?: number;
//   };
//   code?: string;
//   name?: string;
// }

// /**
//  * TUS 视频详细信息
//  */
// export interface VideoInfo {
//   uid: string;
//   creator: null;
//   thumbnail: string;
//   thumbnailTimestampPct: number;
//   readyToStream: boolean;
//   readyToStreamAt: string;
//   status: {
//     state: string;
//     pctComplete: string;
//     errorReasonCode: string;
//     errorReasonText: string;
//   };
//   meta: any;
//   created: string;
//   modified: string;
//   scheduledDeletion: null;
//   size: number;
//   preview: string;
//   allowedOrigins: any[];
//   requireSignedURLs: boolean;
//   uploaded: string;
//   uploadExpiry: string;
//   maxSizeBytes: null;
//   maxDurationSeconds: number;
//   duration: number;
//   input: {
//     width: number;
//     height: number;
//   };
//   playback: {
//     hls: string;
//     dash: string;
//   };
//   watermark: null;
//   clippedFrom: null;
//   publicDetails: {
//     title: string;
//     share_link: string;
//     channel_link: string;
//     logo: string;
//   };
// }
