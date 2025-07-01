/** biome-ignore-all lint/suspicious/noExplicitAny: x */

import { define } from "@qlj/request";
import { ErrorCode } from "@/services/client/error";
import type { VideoInfo } from "./common.types";

export const apiModule = {
  /**
   * 获取基础信息
   */
  getBaseInfo: define.get<void, any>("/api/adadmin/base/info"),
  /**
   * 获取广告主列表
   */
  getPartners: define.get<void, any>("/api/adadmin/partner/list"),
  /**
   * 获取飞书授权链接
   */
  getFeishuAuthorizeUrl: define.get<any, any>("/api/admin/feishu/authUrl"),
  /**
   * 飞书授权回调
   */
  feishuAuthCallback: define.post<any, any>("/api/admin/feishu/authCallback"),
  /**
   * 上传图片
   */
  uploadImage: define.post<FormData, any>("/api/adadmin/material/upload_img", {
    interceptors: {
      request: (config) => {
        config.headers ||= {};
        config.headers["Content-Type"] = "multipart/form-data";

        return config;
      },
    },
  }),
  /**
   * 获取TUS视频上传URL
   */
  getTusUrl: define.post<File, { location: string }>(
    "https://tus.shortyes.com/api/upload-url",
    {
      interceptors: {
        request: (config) => {
          config.headers ||= {};
          const tusToken =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEsImFjY291bnQiOiJsdW9nZW5nQHB1c2hwbHVzLmNvbSIsImV4cGlyZWRfYXQiOjE3MzU2ODk2MDB9.ZcMEexyR5Q_GKGBCwC5Ungt97sX4frtTCnMaar9Emh8";

          config.headers["Upload-Creator"] = "0";
          config.headers["Upload-Length"] = config.data.size.toString();
          config.headers["Upload-Metadata"] =
            `name ${btoa(encodeURIComponent(config.data.name))},filetype ${btoa(config.data.type)}`;
          config.headers["Authorization"] = `Bearer ${tusToken}`;
          config.headers["Content-Type"] = "multipart/form-data";
          config.timeout = 10000;

          return config;
        },
        response: (response) => {
          response.data = {
            data: {
              location: response.headers.location,
            },
            code: ErrorCode.SUCCESS,
          };

          return response;
        },
      },
    },
  ),
  /**
   * 获取TUS视频详细信息
   */
  getTusVideoInfo: define.get<any, VideoInfo>(
    "https://admin-api-prod.shortyes.com/index/short/video/getVideoInfo",
    {
      interceptors: {
        request: (config) => {
          const tusToken =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEsInByb2plY3RfaWQiOjEsImFjY291bnQiOiJsdW9nZW5nQHB1c2hwbHVzLmNvbSIsImV4cGlyZWRfYXQiOjQxMDIyNzIwMDB9.t-uHHjiA0DF7CZejobeZJJucYk_bMKKxADmnKx_KId8";

          config.headers ||= {};
          config.headers["Authorization"] = `Bearer ${tusToken}`;
          return config;
        },
      },
    },
  ),
  /**
   * 获取TUS视频MP4 URL
   */
  getTusVideoMp4Url: define.post<{ id: string }, any>(
    "https://tus.shortyes.com/api/videos/:id/mp4url",
    {
      interceptors: {
        request: (config) => {
          const tusToken =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEsInByb2plY3RfaWQiOjEsImFjY291bnQiOiJsdW9nZW5nQHB1c2hwbHVzLmNvbSIsImV4cGlyZWRfYXQiOjQxMDIyNzIwMDB9.t-uHHjiA0DF7CZejobeZJJucYk_bMKKxADmnKx_KId8";

          config.headers ||= {};
          config.headers["Authorization"] = `Bearer ${tusToken}`;
          return config;
        },
        response: (response) => {
          response.data = {
            data: {
              result: response.data?.result,
            },
            code: response.data.success
              ? ErrorCode.SUCCESS
              : ErrorCode.INTERNAL_ERROR,
          };

          return response;
        },
      },
    },
  ),
};
