import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        panel: "#111111",
        gold: "#FFD700",
        amber: "#F5A623"
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(255,215,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: [typography]
};

export default config;
