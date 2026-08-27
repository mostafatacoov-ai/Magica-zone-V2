import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        magica: {
          bg: "#FFFAF0",
          dark: "#0B0F19",
          surface: "#111827",
          card: "rgba(17, 24, 39, 0.8)",
          border: "rgba(255, 255, 255, 0.08)",
        },
        sector: {
          courses: { DEFAULT: "#2563EB", light: "#60A5FA", dark: "#1D4ED8", accent: "#7C3AED" },
          camp: { DEFAULT: "#059669", light: "#34D399", dark: "#047857", accent: "#F59E0B" },
          supplies: { DEFAULT: "#E11D48", light: "#FB7185", dark: "#BE123C", accent: "#FDA4AF" },
          games: { DEFAULT: "#9333EA", light: "#C084FC", dark: "#7E22CE", accent: "#10B981" },
          bazar: { DEFAULT: "#EA580C", light: "#FB923C", dark: "#C2410C", accent: "#FACC15" },
          food: { DEFAULT: "#16A34A", light: "#4ADE80", dark: "#15803D", accent: "#EAB308" },
          podcast: { DEFAULT: "#4F46E5", light: "#818CF8", dark: "#3730A3", accent: "#EC4899" },
          uniform: { DEFAULT: "#1E3A8A", light: "#3B82F6", dark: "#172554", accent: "#D97706" },
          music: { DEFAULT: "#D946EF", light: "#F472B6", dark: "#A21CAF", accent: "#06B6D4" },
        },
      },
      backgroundImage: {
        "gradient-courses": "linear-gradient(135deg, #1E40AF 0%, #6D28D9 100%)",
        "gradient-camp": "linear-gradient(135deg, #065F46 0%, #D97706 100%)",
        "gradient-supplies": "linear-gradient(135deg, #9F1239 0%, #E11D48 100%)",
      },
      boxShadow: {
        "glow-courses": "0 10px 30px -10px rgba(37, 99, 235, 0.35)",
        "glow-camp": "0 10px 30px -10px rgba(5, 150, 105, 0.35)",
        "glow-supplies": "0 10px 30px -10px rgba(225, 29, 72, 0.35)",
        "glow-games": "0 10px 30px -10px rgba(147, 51, 234, 0.35)",
        "glow-bazar": "0 10px 30px -10px rgba(234, 88, 12, 0.35)",
        "glow-food": "0 10px 30px -10px rgba(22, 163, 74, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;