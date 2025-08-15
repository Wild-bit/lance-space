import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./Card.module.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 卡片变体 */
  variant?: "default" | "elevated" | "flat" | "outline";
  /** 卡片尺寸 */
  size?: "compact" | "default" | "large";
  /** 是否可悬停 */
  hoverable?: boolean;
  /** 是否可点击 */
  clickable?: boolean;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 头部尺寸 */
  size?: "compact" | "default" | "large";
}

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  /** 标题尺寸 */
  size?: "compact" | "default" | "large";
}

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  /** 描述尺寸 */
  size?: "compact" | "default" | "large";
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 内容尺寸 */
  size?: "compact" | "default" | "large";
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 底部尺寸 */
  size?: "compact" | "default" | "large";
  /** 对齐方式 */
  align?: "start" | "center" | "end" | "between";
}

/**
 * 获取卡片的 CSS 类名
 * @param variant 卡片变体
 * @param size 卡片尺寸
 * @param hoverable 是否可悬停
 * @param clickable 是否可点击
 * @param className 额外的 CSS 类名
 * @returns 合并后的 CSS 类名
 */
const getCardClassName = (
  variant: CardProps["variant"] = "default",
  size: CardProps["size"] = "default",
  hoverable: boolean = false,
  clickable: boolean = false,
  className?: string
): string => {
  return cn(
    styles.card,
    {
      [styles.elevated]: variant === "elevated",
      [styles.flat]: variant === "flat",
      [styles.outline]: variant === "outline",
      [styles.compact]: size === "compact",
      [styles.large]: size === "large",
      [styles.hoverable]: hoverable,
      [styles.clickable]: clickable,
    },
    className
  );
};

/**
 * Card 组件
 * 卡片容器组件
 * @param className 额外的 CSS 类名
 * @param variant 卡片变体
 * @param size 卡片尺寸
 * @param hoverable 是否可悬停
 * @param clickable 是否可点击
 * @param props 其他 HTML div 属性
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      hoverable = false,
      clickable = false,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={getCardClassName(
        variant,
        size,
        hoverable,
        clickable,
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

/**
 * CardHeader 组件
 * 卡片头部
 * @param className 额外的 CSS 类名
 * @param size 头部尺寸
 * @param props 其他 HTML div 属性
 */
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, size = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        styles["card-header"],
        {
          [styles.compact]: size === "compact",
          [styles.large]: size === "large",
        },
        className
      )}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

/**
 * CardTitle 组件
 * 卡片标题
 * @param className 额外的 CSS 类名
 * @param size 标题尺寸
 * @param props 其他 HTML h3 属性
 */
const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, size = "default", ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        styles["card-title"],
        {
          [styles.compact]: size === "compact",
          [styles.large]: size === "large",
        },
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

/**
 * CardDescription 组件
 * 卡片描述
 * @param className 额外的 CSS 类名
 * @param size 描述尺寸
 * @param props 其他 HTML p 属性
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, size = "default", ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      styles["card-description"],
      {
        [styles.compact]: size === "compact",
        [styles.large]: size === "large",
      },
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/**
 * CardContent 组件
 * 卡片内容
 * @param className 额外的 CSS 类名
 * @param size 内容尺寸
 * @param props 其他 HTML div 属性
 */
const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, size = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        styles["card-content"],
        {
          [styles.compact]: size === "compact",
          [styles.large]: size === "large",
        },
        className
      )}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

/**
 * CardFooter 组件
 * 卡片底部
 * @param className 额外的 CSS 类名
 * @param size 底部尺寸
 * @param align 对齐方式
 * @param props 其他 HTML div 属性
 */
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, size = "default", align = "start", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        styles["card-footer"],
        {
          [styles.compact]: size === "compact",
          [styles.large]: size === "large",
          [styles.center]: align === "center",
          [styles.end]: align === "end",
          [styles.between]: align === "between",
        },
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};

export default Card;
