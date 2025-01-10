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
        sans: ["var(--font-poppins)"],
      },
      colors: {
        primary: "#2795d5",
        secondary: "#274864",
        secondaryLight: "#2e5374",
        secondaryDark: "#1D3A53",
        background: "#ffffff",
      },
    },
  },
  plugins: [],
} satisfies Config;
