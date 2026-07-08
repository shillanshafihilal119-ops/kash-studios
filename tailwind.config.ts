import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#08110f",
        obsidian: "#111917",
        marble: "#ede7d7",
        vellum: "#c7bfae",
        brass: "#b89655",
        cypress: "#1d3a34",
        wine: "#4b1f2f"
      },
      boxShadow: {
        stage: "0 24px 90px rgba(0, 0, 0, 0.55)"
      },
      fontFamily: {
        display: ["Georgia", "Times New Roman", "serif"],
        body: ["Segoe UI", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
