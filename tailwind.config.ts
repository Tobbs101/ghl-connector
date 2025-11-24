import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lumeo: "#161616",
      },
      fontFamily: {
        sans: ["Mulish", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
