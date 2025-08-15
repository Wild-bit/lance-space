import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import styles from "./Button.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 按钮变体 */
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  /** 按钮尺寸 */
  size?: "default" | "sm" | "lg" | "icon";
  /** 是否作为子元素渲染 */
  asChild?: boolean;
  /** 是否显示加载状态 */
  loading?: boolean;
}

/**
 * 获取按钮的 CSS 类名
 * @param variant 按钮变体
 * @param size 按钮尺寸
 * @param loading 是否加载中
 * @param className 额外的 CSS 类名
 * @returns 合并后的 CSS 类名
 */
const getButtonClassName = (
  variant: ButtonProps["variant"] = "default",
  size: ButtonProps["size"] = "default",
  loading: boolean = false,
  className?: string
): string => {
  return cn(
    styles.button,
    {
      [styles.default]: variant === "default",
      [styles.destructive]: variant === "destructive",
      [styles.outline]: variant === "outline",
      [styles.secondary]: variant === "secondary",
      [styles.ghost]: variant === "ghost",
      [styles.link]: variant === "link",
      [styles["default-size"]]: size === "default",
      [styles.small]: size === "sm",
      [styles.large]: size === "lg",
      [styles.icon]: size === "icon",
      [styles.loading]: loading,
    },
    className
  );
};

/**
 * 按钮组件
 * 基于 Radix UI Slot 构建，支持多种变体和尺寸
 * @param className 额外的 CSS 类名
 * @param variant 按钮变体
 * @param size 按钮尺寸
 * @param asChild 是否作为子元素渲染
 * @param loading 是否显示加载状态
 * @param disabled 是否禁用
 * @param children 子元素
 * @param props 其他 HTML button 属性
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={getButtonClassName(variant, size, loading, className)}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className={styles["loading-spinner"]}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 11-6.219-8.56" />
          </svg>
        )}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
export default Button;
