import { type Config } from "tailwindcss";
import { fontFamily } from 'tailwindcss/defaultTheme'

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-raleway)', ...fontFamily.sans],
        lato: ['var(--font-lato)', ...fontFamily.sans]
      }
    },
  },
  plugins: [],
} satisfies Config;
