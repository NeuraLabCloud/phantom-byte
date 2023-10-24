import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{jsx,tsx,mdx}",
    "./components/**/*.{jsx,tsx,mdx}",
    "./app/**/*.{jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors:{
      primary: "#1fb6ff"
    }
  },
  plugins: [],
};
export default config;
