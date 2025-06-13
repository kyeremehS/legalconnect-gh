import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdf6e9",
          100: "#f9e8c3",
          200: "#f3d18d",
          300: "#edb957",
          400: "#e7a221",
          500: "#d4a017", // Our primary color
          600: "#b17d25",
          700: "#8e5f1d",
          800: "#6b4715",
          900: "#482f0d",
          950: "#241707",
        },
        secondary: {
          50: "#f0f4ff",
          100: "#dbe4ff",
          200: "#b7c9ff",
          300: "#93aeff",
          400: "#6f93ff",
          500: "#4b78ff",
          600: "#3c60cc",
          700: "#2d4899",
          800: "#1e3066",
          900: "#0f1833",
          950: "#070c1a",
        },
        text: {
          primary: "#6b7280", // gray-500
          secondary: "#6b7280", // gray-500
          tertiary: "#6b7280", // gray-500
          light: "#6b7280", // gray-500
        },
      },
    },
  },
  plugins: [],
};

export default config; 