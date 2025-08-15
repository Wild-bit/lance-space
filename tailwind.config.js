/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* 边框和输入框颜色 - 支持透明度修饰符 */
        border: "rgb(var(--lance-border) / <alpha-value>)",
        input: "rgb(var(--lance-input) / <alpha-value>)",
        ring: "rgb(var(--lance-ring) / <alpha-value>)",

        /* 背景和前景色 - 支持透明度修饰符 */
        background: "rgb(var(--lance-background) / <alpha-value>)",
        foreground: "rgb(var(--lance-foreground) / <alpha-value>)",

        /* 主色调 - 支持透明度修饰符 */
        primary: {
          DEFAULT: "rgb(var(--lance-primary) / <alpha-value>)",
          foreground: "rgb(var(--lance-primary-foreground) / <alpha-value>)",
        },

        /* 次要色调 - 支持透明度修饰符 */
        secondary: {
          DEFAULT: "rgb(var(--lance-secondary) / <alpha-value>)",
          foreground: "rgb(var(--lance-secondary-foreground) / <alpha-value>)",
        },

        /* 危险色调 - 支持透明度修饰符 */
        destructive: {
          DEFAULT: "rgb(var(--lance-destructive) / <alpha-value>)",
          foreground:
            "rgb(var(--lance-destructive-foreground) / <alpha-value>)",
        },

        /* 静音色调 - 支持透明度修饰符 */
        muted: {
          DEFAULT: "rgb(var(--lance-muted) / <alpha-value>)",
          foreground: "rgb(var(--lance-muted-foreground) / <alpha-value>)",
        },

        /* 强调色调 - 支持透明度修饰符 */
        accent: {
          DEFAULT: "rgb(var(--lance-accent) / <alpha-value>)",
          foreground: "rgb(var(--lance-accent-foreground) / <alpha-value>)",
        },

        /* 弹出层颜色 - 支持透明度修饰符 */
        popover: {
          DEFAULT: "rgb(var(--lance-popover) / <alpha-value>)",
          foreground: "rgb(var(--lance-popover-foreground) / <alpha-value>)",
        },

        /* 卡片颜色 - 支持透明度修饰符 */
        card: {
          DEFAULT: "rgb(var(--lance-card) / <alpha-value>)",
          foreground: "rgb(var(--lance-card-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--lance-radius)",
        md: "calc(var(--lance-radius) - 2px)",
        sm: "calc(var(--lance-radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
