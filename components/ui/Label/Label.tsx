import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cn } from '@/lib/utils';
import styles from './Label.module.css';

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  /** 标签尺寸 */
  size?: 'small' | 'default' | 'large';
  /** 标签样式变体 */
  variant?: 'default' | 'secondary' | 'muted';
  /** 是否为必填字段 */
  required?: boolean;
  /** 是否为错误状态 */
  error?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
}

/**
 * 获取标签的 CSS 类名
 * @param size 标签尺寸
 * @param variant 标签样式变体
 * @param required 是否必填
 * @param error 是否错误状态
 * @param disabled 是否禁用
 * @param className 额外的 CSS 类名
 * @returns 合并后的 CSS 类名
 */
const getLabelClassName = (
  size: LabelProps['size'] = 'default',
  variant: LabelProps['variant'] = 'default',
  required: boolean = false,
  error: boolean = false,
  disabled: boolean = false,
  className?: string
): string => {
  return cn(
    styles.label,
    {
      [styles.small]: size === 'small',
      [styles.large]: size === 'large',
      [styles.secondary]: variant === 'secondary',
      [styles.muted]: variant === 'muted',
      [styles.required]: required,
      [styles.error]: error,
      [styles.disabled]: disabled,
    },
    className
  );
};

/**
 * Label 组件
 * 基于 Radix UI Label 构建
 * @param className 额外的 CSS 类名
 * @param size 标签尺寸
 * @param variant 标签样式变体
 * @param required 是否为必填字段
 * @param error 是否为错误状态
 * @param disabled 是否禁用
 * @param props 其他 Radix UI Label 属性
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ 
  className, 
  size = 'default', 
  variant = 'default', 
  required = false, 
  error = false, 
  disabled = false, 
  ...props 
}, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={getLabelClassName(size, variant, required, error, disabled, className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
export default Label;