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
        "brand-red": "var(--brand-red)",
        "brand-blue": "var(--brand-blue)",
        "brand-red-light": "var(--brand-red-light)",
        "brand-blue-light": "var(--brand-blue-light)",
        base: "#050C1A",
        card: "#0B1628",
        "card-hover": "#0F1E36",
        "border-subtle": "#1A2E4A",
        "border-active": "#C8102E",
        "text-primary": "#E8EDF5",
        "text-secondary": "#5A7A9E",
        "text-muted": "#2E4A6B",
        "red-primary": "#C8102E",
        "red-hover": "#E8132F",
        "red-subtle": "#1A0810",
        "blue-accent": "#1E6FD4",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
