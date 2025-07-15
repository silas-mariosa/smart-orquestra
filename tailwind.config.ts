import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#6366F1", // Indigo-500
          dark: "#4F46E5",
          light: "#A5B4FC",
        },
        secondary: {
          DEFAULT: "#06B6D4", // Cyan-500
          dark: "#0891B2",
          light: "#67E8F9",
        },
        accent: {
          DEFAULT: "#F59E42", // Orange-400
          dark: "#EA580C",
          light: "#FDE68A",
        },
        muted: {
          DEFAULT: "#F3F4F6", // Gray-100
          dark: "#6B7280",
        },
        background: "#F9FAFB",
        foreground: "#18181B",
        success: "#22C55E",
        warning: "#FACC15",
        error: "#EF4444",
        info: "#3B82F6",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
