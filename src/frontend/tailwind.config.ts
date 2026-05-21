import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-yellowtail)", "cursive"],
        body: ["var(--font-rethink)", "system-ui", "sans-serif"],
      },
      colors: {
        ocean: {
          800: "#155e75",
          900: "#0c4a6e",
          950: "#082f49",
        },
        coral: {
          DEFAULT: "#ff6b4a",
          light: "#ff8a70",
          dark: "#e85d3a",
        },
        pool: {
          DEFAULT: "#2dd4bf",
          light: "#5eead4",
          dark: "#14b8a6",
        },
        sunset: {
          DEFAULT: "#ff6b4a",
          light: "#ff8a70",
          dark: "#e85d3a",
        },
        tropical: {
          DEFAULT: "#34d399",
          light: "#6ee7b7",
          dark: "#10b981",
        },
      },
      animation: {
        pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
        pulseCoral: "pulseCoral 2s ease-in-out infinite",
        gradientShift: "gradientShift 18s ease infinite",
        float: "float 12s ease-in-out infinite",
        floatDelayed: "float 12s ease-in-out 4s infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": {
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.15), 0 0 0 0 rgba(255, 107, 74, 0.35)",
          },
          "50%": {
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.2), 0 0 28px 6px rgba(255, 107, 74, 0.55)",
          },
        },
        pulseCoral: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(30px, -20px)" },
          "66%": { transform: "translate(-20px, 15px)" },
        },
      },
      backgroundSize: {
        "300%": "300% 300%",
      },
    },
  },
  plugins: [],
};

export default config;
