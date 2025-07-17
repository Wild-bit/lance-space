import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { message, Upload } from "antd";
import type React from "react";
import { apiClient } from "@/services/client";
// import type { CreativeImage } from "../../modules/creative/creative.types";

interface ImageUploadProps {
  label: string;
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
  onMediaChange: (media: CreativeImage[]) => void;
  maxCount?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  value,
  onChange,
  onMediaChange,
  maxCount = 1,
}) => {
  const customRequest: UploadProps["customRequest"] = async ({
    file,
    onSuccess,
    onError,
  }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await apiClient.common.uploadImage(formData);

      // 获取图片尺寸
      const dimensions = await new Promise<{ w: number; h: number }>(
        (resolve) => {
          const img = new Image();
          img.src = URL.createObjectURL(file as File);
          img.onload = () => {
            resolve({
              w: img.width,
              h: img.height,
            });
          };
        }
      );

      const mediaResource: CreativeImage = {
        url: data.url,
        w: dimensions.w,
        h: dimensions.h,
        type: label.includes("Icon") ? 3 : 1,
      };

      onMediaChange([mediaResource]);
      onSuccess?.(data);
    } catch (error) {
      console.error("图片上传失败:", error);
      message.error("图片上传失败");
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
        accept="image/*"
        listType="picture-card"
      >
        {(!value || value.length < maxCount) && (
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>上传</div>
          </div>
        )}
      </Upload>
    </div>
  );
};

export default ImageUpload;
