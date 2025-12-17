/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      keyframes: {
        flickerHover: {
          "0%": {
            backgroundColor: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
          },
          "12%": {
            backgroundColor: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(8px)",
          },
          "24%": {
            backgroundColor: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(18px)",
          },
          "36%": {
            backgroundColor: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(5px)",
          },
          "48%": {
            backgroundColor: "rgba(255,255,255,0.25)",
            backdropFilter: "blur(15px)",
          },
          "60%": {
            backgroundColor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(3px)",
          },
          "72%": {
            backgroundColor: "rgba(255,255,255,0.3)",
            backdropFilter: "blur(12px)",
          },
          "84%": {
            backgroundColor: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(2px)",
          },
          "100%": {
            backgroundColor: "rgba(255,255,255,1)",
            backdropFilter: "blur(0px)",
          },
        },

        contentFlickerHover: {
          "0%": { color: "#fff", opacity: "1" },
          "12%": { color: "#333", opacity: "0.4" },
          "24%": { color: "#fff", opacity: "0.9" },
          "36%": { color: "#333", opacity: "0.3" },
          "48%": { color: "#fff", opacity: "0.8" },
          "60%": { color: "#333", opacity: "0.2" },
          "72%": { color: "#fff", opacity: "0.7" },
          "84%": { color: "#333", opacity: "0.1" },
          "100%": { color: "#000", opacity: "1" },
        },
      },

      animation: {
        flickerHover: "flickerHover 350ms ease-in-out forwards",
        contentFlickerHover: "contentFlickerHover 350ms ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
