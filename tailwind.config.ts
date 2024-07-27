/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      blur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#513DEB",
          "primary-content": "#fff",
          secondary: "#D7EB3D",
          "secondary-content": "#202020",
          accent: "#A75050",
          "accent-content": "#0c0a00",
          neutral: "#848c9c",
          "neutral-content": "#ced0d6",
          "base-100": "#f6fefa",
          "base-200": "#d6ddd9",
          "base-300": "#b7bdba",
          "base-content": "#161415",
          info: "#00b3e8",
          "info-content": "#000c13",
          success: "#30B73D",
          "success-content": "#fff",
          warning: "#ff6f00",
          "warning-content": "#160400",
          error: "#dc506a",
          "error-content": "#f3f4f6",
        },
      },
      "dracula",
    ],
  },
};
