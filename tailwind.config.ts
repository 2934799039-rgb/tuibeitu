import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        mystic: {
          950: "#0a0808",
          900: "#0f0d0c",
          800: "#1a1513",
          700: "#2a2119",
          600: "#3d3023",
          500: "#5a4630",
          400: "#8b7355",
          300: "#b8956e",
          200: "#d4b88c",
          100: "#eddcc8",
          50: "#faf6f0",
        },
        gold: {
          950: "#1a1405",
          900: "#2d2208",
          800: "#4a370d",
          700: "#6b4f12",
          600: "#8f6a18",
          500: "#b8891e",
          400: "#d4a12c",
          300: "#e8be4f",
          200: "#f0d478",
          100: "#f8e9a8",
          50: "#fdf5d6",
        },
        ink: {
          950: "#0a1a14",
          900: "#0d2119",
          800: "#123325",
          700: "#184a35",
          600: "#1f6347",
          500: "#27805b",
          400: "#349d72",
          300: "#4db88c",
          200: "#78d0a9",
          100: "#a8e6c8",
          50: "#daf5e6",
        },
        seal: {
          DEFAULT: "#c23b2a",
          light: "#d45342",
          dark: "#8b2215",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        calligraphy: ["var(--font-calligraphy)", "serif"],
      },
      backgroundImage: {
        "mystic-gradient":
          "radial-gradient(ellipse at center, rgba(184,137,30,0.15) 0%, rgba(10,8,8,0.95) 70%)",
        "bagua-pattern":
          "url('/images/bagua-bg.svg')",
        "scroll-gradient":
          "linear-gradient(to bottom, rgba(15,13,12,0), rgba(184,137,30,0.08), rgba(15,13,12,0))",
      },
      boxShadow: {
        gold: "0 0 20px rgba(184,137,30,0.3)",
        "gold-lg": "0 0 40px rgba(184,137,30,0.4), 0 0 80px rgba(184,137,30,0.1)",
        mystic: "0 4px 30px rgba(0,0,0,0.6)",
        card: "0 2px 20px rgba(0,0,0,0.4), 0 0 0 1px rgba(184,137,30,0.1)",
        "card-hover":
          "0 4px 30px rgba(0,0,0,0.5), 0 0 20px rgba(184,137,30,0.2), 0 0 0 1px rgba(184,137,30,0.3)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-gold": "pulse-gold 3s ease-in-out infinite",
        "rotate-slow": "rotate-slow 40s linear infinite",
        "rotate-slower": "rotate-slower 80s linear infinite",
        "fade-in": "fade-in 1s ease-out",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "reveal": "reveal 1.2s ease-out",
        "scroll": "scroll 2s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-gold": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        "rotate-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "rotate-slower": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        reveal: {
          from: { opacity: "0", clipPath: "inset(0 100% 0 0)" },
          to: { opacity: "1", clipPath: "inset(0 0% 0 0)" },
        },
        scroll: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(4px)" },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "200% 0" },
          "50%": { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
