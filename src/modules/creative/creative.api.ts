import { define } from "@qlj/request";
import type { PageResult } from "@/services/types";
import type {
  CreateCreativeRequest,
  CreativeListItem,
  CreativeQueryParams,
} from "./creative.types";

export const apiModule = {
  /**
   * 获取创意列表
   */
  getCreatives: define.post<CreativeQueryParams, PageResult<CreativeListItem>>(
    "/api/adadmin/ads/list_creative",
  ),
  /**
   * 创建创意
   */
  createCreative: define.post<CreateCreativeRequest, any>(
    "/api/adadmin/ads/create_creative",
  ),
  /**
   * 更新创意状态
   */
  updateCreativeStatus: define.post<{ id: number; status: number }, any>(
    "/api/adadmin/ads/update_creative_status",
  ),
  /**
   * 删除创意
   */
  deleteCreative: define.post<{ id: number }, any>(
    "/api/adadmin/ads/delete_creative",
  ),
};
