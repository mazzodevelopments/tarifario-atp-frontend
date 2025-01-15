import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-avenir-light)",
          "var(--font-avenir-medium)",
          "var(--font-avenir-semibold)",
          "var(--font-avenir-bold)",
        ],
      },
      colors: {
        primary: "#0076A8",
        secondary: "#274864",
        background: "#ffffff",
      },
    },
  },
  plugins: [],
} satisfies Config;
