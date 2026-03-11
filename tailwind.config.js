/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-black-base": "#020617",
        "deep-shadow": "#05091E",
        "muted-slate": "rgba(255, 255, 255, 0.7)",
        cyan: "hsl(190, 85%, 65%)",
        purple: "hsl(260, 85%, 65%)",
        magenta: "hsl(320, 85%, 65%)",
      },
      fontFamily: {
        "dancing-script": ["Dancing Script", "cursive"],
        "space-grotesk": ["Space Grotesk", "sans-serif"],
      },
      keyframes: {
        rippling: {
          "0%": { transform: "scale(0)", opacity: "0.3" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "scale-in": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        rippling: "rippling 600ms ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out",
      },
      spacing: {
        grid: "4px",
      },
    },
  },
  plugins: [],
};
