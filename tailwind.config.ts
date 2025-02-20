import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      dropShadow: {
        "custom-white": "0px 0px 120px rgba(255, 255, 255, 0.50)",
      },
      fontFamily: {
        eczar: ["Eczar", "serif"],
        workSans: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
