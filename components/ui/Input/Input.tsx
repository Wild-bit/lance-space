import * as React from 'react';
import { cn } from '@/lib/utils';
import styles from './Input.module.css';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 输入框尺寸 */
  size?: 'small' | 'default' | 'large';
  /** 输入框状态 */
  status?: 'default' | 'error' | 'success';
}

/**
 * 获取输入框的 CSS 类名
 * @param size 输入框尺寸
 * @param status 输入框状态
 * @param className 额外的 CSS 类名
 * @returns 合并后的 CSS 类名
 */
const getInputClassName = (
  size: InputProps['size'] = 'default',
  status: InputProps['status'] = 'default',
  className?: string
): string => {
  return cn(
    styles.input,
    {
      [styles.small]: size === 'small',
      [styles.large]: size === 'large',
      [styles.error]: status === 'error',
      [styles.success]: status === 'success',
    },
    className
  );
};

/**
 * 输入框组件
 * 基于原生 HTML input 元素构建
 * @param className 额外的 CSS 类名
 * @param type 输入框类型
 * @param size 输入框尺寸
 * @param status 输入框状态
 * @param props 其他 HTML input 属性
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size = 'default', status = 'default', ...props }, ref) => {
    return (
      <input
        type={type}
        className={getInputClassName(size, status, className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
export default Input;