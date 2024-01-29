import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: {
          100: "#FFFFFF",
          200: "#F0F0F0"
        },
        blue: {
          100: "#1D1D2E",
          200: "#101026"
        },
        gray: {
          100: "#8A8A8A"
        },
        red: {
          100: "#FF3F4B"
        },
        green: {
          100: "#3FFFA3"
        }
      }
    },
  },
  plugins: [],
};
export default config;
