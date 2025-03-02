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
        notSelected: "#8D8D8C",
        contactMe: "#4D5566",
        desciprtion: "#594F43",
      },
      dropShadow: {
        "custom-white": "0px 0px 120px rgba(255, 255, 255, 0.50)",
      },
      fontFamily: {
        eczar: ["Eczar", "serif"],
        workSans: ["Work Sans", "sans-serif"],
      },
      inset: {
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
      },
    },
  },
  plugins: [],
} satisfies Config;
