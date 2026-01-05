import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slow-drift": {
          "0%, 100%": { transform: "scale(1.05) translate(0, 0)" },
          "25%": { transform: "scale(1.08) translate(-1%, 1%)" },
          "50%": { transform: "scale(1.05) translate(1%, -1%)" },
          "75%": { transform: "scale(1.08) translate(-0.5%, -0.5%)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.25" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "particle-float": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "25%": { transform: "translateY(calc(var(--float-range, 20px) * -1)) translateX(10px)" },
          "50%": { transform: "translateY(0) translateX(calc(var(--float-range, 20px) * 0.5))" },
          "75%": { transform: "translateY(calc(var(--float-range, 20px) * 0.5)) translateX(-10px)" },
        },
        "particle-spin": {
          "0%": { transform: "rotate(45deg) scale(1)" },
          "25%": { transform: "rotate(135deg) scale(1.1)" },
          "50%": { transform: "rotate(225deg) scale(1)" },
          "75%": { transform: "rotate(315deg) scale(0.9)" },
          "100%": { transform: "rotate(405deg) scale(1)" },
        },
        "particle-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.4" },
          "50%": { transform: "scale(1.3)", opacity: "0.7" },
        },
        "particle-twinkle": {
          "0%, 100%": { transform: "scale(1) rotate(0deg)", opacity: "0.3" },
          "25%": { transform: "scale(1.2) rotate(90deg)", opacity: "0.8" },
          "50%": { transform: "scale(0.8) rotate(180deg)", opacity: "0.4" },
          "75%": { transform: "scale(1.1) rotate(270deg)", opacity: "0.9" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "slow-drift": "slow-drift 20s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "particle-float": "particle-float var(--duration, 15s) ease-in-out infinite",
        "particle-spin": "particle-spin var(--duration, 20s) linear infinite",
        "particle-pulse": "particle-pulse var(--duration, 8s) ease-in-out infinite",
        "particle-twinkle": "particle-twinkle var(--duration, 6s) ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
