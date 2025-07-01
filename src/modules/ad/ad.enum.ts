/**
 * 国家常量
 */
export const CountryEnum = {
  /** 全球 */
  WW: "WW",
  /** 巴西 */
  BR: "BR",
  /** 美国 */
  US: "US",
  /** 加拿大 */
  CA: "CA",
  /** 韩国 */
  KR: "KR",
  /** 印度 */
  IN: "IN",
  /** 德国 */
  DE: "DE",
  /** 英国 */
  GB: "GB",
  /** 法国 */
  FR: "FR",
  /** 印度尼西亚 */
  ID: "ID",
  /** 越南 */
  VN: "VN",
  /** 泰国 */
  TH: "TH",
  /** 墨西哥 */
  MX: "MX",
  /** 菲律宾 */
  PH: "PH",
  /** 马来西亚 */
  MY: "MY",
  /** 新加坡 */
  SG: "SG",
  /** 日本 */
  JP: "JP",
  /** 澳大利亚 */
  AU: "AU",
  /** 新西兰 */
  NZ: "NZ",
  /** 俄罗斯 */
  RU: "RU",
  /** 土耳其 */
  TR: "TR",
  /** 阿拉伯联合酋长国 */
  AE: "AE",
} as const;

/**
 * 平台常量
 */
export const PlatformEnum = {
  /** Android */
  ANDROID: "android",
  /** iOS */
  IOS: "ios",
} as const;

/**
 * 状态常量
 */
export const StatusEnum = {
  /** 关闭 */
  DISABLED: 0,
  /** 开启 */
  ENABLED: 1,
} as const;

// 类型定义
export type CountryType = (typeof CountryEnum)[keyof typeof CountryEnum];
export type PlatformType = (typeof PlatformEnum)[keyof typeof PlatformEnum];
export type StatusType = (typeof StatusEnum)[keyof typeof StatusEnum];

/**
 * 国家选项
 */
export const countryOptions = [
  { label: "全球 (WW)", value: CountryEnum.WW },
  { label: "巴西 (BR)", value: CountryEnum.BR },
  { label: "美国 (US)", value: CountryEnum.US },
  { label: "加拿大 (CA)", value: CountryEnum.CA },
  { label: "韩国 (KR)", value: CountryEnum.KR },
  { label: "印度 (IN)", value: CountryEnum.IN },
  { label: "德国 (DE)", value: CountryEnum.DE },
  { label: "英国 (GB)", value: CountryEnum.GB },
  { label: "法国 (FR)", value: CountryEnum.FR },
  { label: "印度尼西亚 (ID)", value: CountryEnum.ID },
  { label: "越南 (VN)", value: CountryEnum.VN },
  { label: "泰国 (TH)", value: CountryEnum.TH },
  { label: "墨西哥 (MX)", value: CountryEnum.MX },
  { label: "菲律宾 (PH)", value: CountryEnum.PH },
  { label: "马来西亚 (MY)", value: CountryEnum.MY },
  { label: "新加坡 (SG)", value: CountryEnum.SG },
  { label: "日本 (JP)", value: CountryEnum.JP },
  { label: "澳大利亚 (AU)", value: CountryEnum.AU },
  { label: "新西兰 (NZ)", value: CountryEnum.NZ },
  { label: "俄罗斯 (RU)", value: CountryEnum.RU },
  { label: "土耳其 (TR)", value: CountryEnum.TR },
  { label: "阿拉伯联合酋长国 (AE)", value: CountryEnum.AE },
];

/**
 * 平台选项
 */
export const platformOptions = [
  { label: "Android", value: PlatformEnum.ANDROID },
  { label: "iOS", value: PlatformEnum.IOS },
];

/**
 * 状态选项
 */
export const statusOptions = [
  { label: "关闭", value: StatusEnum.DISABLED },
  { label: "开启", value: StatusEnum.ENABLED },
];

/**
 * 国家标签映射
 */
export const countryLabelMap: Record<CountryType, string> = {
  [CountryEnum.WW]: "全球",
  [CountryEnum.BR]: "巴西",
  [CountryEnum.US]: "美国",
  [CountryEnum.CA]: "加拿大",
  [CountryEnum.KR]: "韩国",
  [CountryEnum.IN]: "印度",
  [CountryEnum.DE]: "德国",
  [CountryEnum.GB]: "英国",
  [CountryEnum.FR]: "法国",
  [CountryEnum.ID]: "印度尼西亚",
  [CountryEnum.VN]: "越南",
  [CountryEnum.TH]: "泰国",
  [CountryEnum.MX]: "墨西哥",
  [CountryEnum.PH]: "菲律宾",
  [CountryEnum.MY]: "马来西亚",
  [CountryEnum.SG]: "新加坡",
  [CountryEnum.JP]: "日本",
  [CountryEnum.AU]: "澳大利亚",
  [CountryEnum.NZ]: "新西兰",
  [CountryEnum.RU]: "俄罗斯",
  [CountryEnum.TR]: "土耳其",
  [CountryEnum.AE]: "阿拉伯联合酋长国",
};

/**
 * 平台标签映射
 */
export const platformLabelMap: Record<PlatformType, string> = {
  [PlatformEnum.ANDROID]: "Android",
  [PlatformEnum.IOS]: "iOS",
};

/**
 * 状态标签映射
 */
export const statusLabelMap: Record<StatusType, string> = {
  [StatusEnum.DISABLED]: "关闭",
  [StatusEnum.ENABLED]: "开启",
};
