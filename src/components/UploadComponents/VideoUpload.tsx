import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { message, Upload } from "antd";
import type React from "react";
import * as tus from "tus-js-client";
import { apiClient } from "@/services/client";
import type { CreativeVideo } from "../../modules/creative/creative.types";

interface VideoUploadProps {
  label: string;
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
  onMediaChange: (media: CreativeVideo[]) => void;
  maxCount?: number;
}

const VideoUpload: React.FC<VideoUploadProps> = ({
  label,
  value,
  onChange,
  onMediaChange,
  maxCount = 1,
}) => {
  const handleGetVideoInfo = async (mediaId: string) => {
    try {
      const { data } = await apiClient.common.getTusVideoInfo({
        stream_media_id: mediaId,
      });

      return {
        readyToStream: data.readyToStream,
        cover_url: data.thumbnail,
        video_url: data.playback.hls,
        preview_url: data.preview,
        size: data.size,
        duration: data.duration,
        width: data.input.width,
        height: data.input.height,
      };
    } catch (error) {
      console.error("获取视频信息失败:", error);
      message.error("获取视频信息失败");
      return null;
    }
  };

  const customRequest: UploadProps["customRequest"] = async ({
    file,
    onSuccess,
    onError,
    onProgress,
  }) => {
    try {
      const f = file as File;

      if (!file) {
        message.error("文件不能为空");
        onError?.(new Error("文件不能为空"));
        return;
      }

      // 文件类型验证
      const validFileTypes = [
        "video/flv",
        "video/mov",
        "video/mp4",
        "video/ogg",
      ];
      if (!validFileTypes.includes(f.type.toLowerCase())) {
        message.error("请上传 mp4/ogg/flv/mov 格式视频");
        onError?.(new Error("Invalid file type"));
        return;
      }

      // 文件大小验证
      const maxSize = 80 * 1024 * 1024; // 80MB
      if (f.size > maxSize) {
        message.error("视频大小不能超过80MB");
        onError?.(new Error("File too large"));
        return;
      }

      // 1. 获取TUS上传URL
      const { data } = await apiClient.common.getTusUrl(f);
      const url = data.location;
      if (!url) {
        throw new Error("获取上传URL失败");
      }

      // 2. 使用tus-js-client上传文件，完全按照老仓库的实现
      const tusUpload = new tus.Upload(f, {
        uploadUrl: url,
        retryDelays: [0, 3000, 5000, 10_000, 20_000],
        chunkSize: 10 * 1024 * 1024,
        metadata: {
          filename: f.name,
          filetype: f.type,
        },
        uploadSize: f.size,
        onProgress: (bytesUploaded, bytesTotal) => {
          const percent = Math.round((bytesUploaded / bytesTotal) * 100);
          onProgress?.({ percent });
        },
        onError(error: Error) {
          console.error("TUS上传失败:", error);
          message.error(`上传失败,${error.message}`);
          onError?.(error);
        },
        onAfterResponse(_, res) {
          const mediaIdHeader = res.getHeader("stream-media-id");
          if (mediaIdHeader) {
            // 轮询检查视频处理状态
            const interval = setInterval(() => {
              handleGetVideoInfo(mediaIdHeader)
                .then((data) => {
                  if (data?.readyToStream) {
                    apiClient.common
                      .getTusVideoMp4Url({ id: mediaIdHeader })
                      .then((mp4) => {
                        clearInterval(interval);

                        const mediaResource: CreativeVideo = {
                          url: data.cover_url,
                          mp4url: mp4.data.result.default.url,
                          m3u8url: data.video_url,
                          w: data.width,
                          h: data.height,
                          duration: Math.round(data.duration),
                        };

                        onMediaChange([mediaResource]);
                        onSuccess?.({ url: mediaResource.url });
                        message.success("视频上传成功");
                      })
                      .catch((error) => {
                        clearInterval(interval);
                        console.error("获取MP4 URL失败:", error);
                        message.error("获取视频播放链接失败");
                        onError?.(error);
                      });
                  }
                })
                .catch((error) => {
                  clearInterval(interval);
                  console.error("获取视频信息失败:", error);
                  message.error("获取视频信息失败");
                  onError?.(error);
                });
            }, 3000);
          } else {
            message.error("未获取到媒体ID");
            onError?.(new Error("未获取到媒体ID"));
          }
        },
      });

      tusUpload.start();
    } catch (error) {
      console.error("视频上传失败:", error);
      message.error((error as Error).message || "视频上传失败");
      onError?.(error as Error);
    }
  };

  return (
    <div className="mb-4">
      <div className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </div>
      <Upload
        customRequest={customRequest}
        fileList={value || []}
        onChange={({ fileList }) => onChange?.(fileList)}
        maxCount={maxCount}
        accept="video/*"
        listType="picture-card"
      >
        {(!value || value.length < maxCount) && (
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>上传视频</div>
          </div>
        )}
      </Upload>
    </div>
  );
};

export default VideoUpload;
