import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "placeholder": "#AFA9AE",
        "neutral": "#F4F0EF",
        "normal": "#111111",
        "primary": "#FB7C37",
        "primary-light": "#FFEDE6",
        "neutral-light": "#797676",
        "primary-neutral": "#FFB693"
      }
    }
  },
  plugins: [],
};
export default config;
