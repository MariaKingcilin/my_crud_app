/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          background: "var(--primary-bg-color)",
          blue: "var(--primary-blue-color)",
          black: "var(--primary-black-color)",
        },
        dashboard: {
          background: "var(--dashboard-bg-color)",
          active: "var(--dashboard-active-color)",
        },
        content: {
          gray: "var(--text-gray-color)",
          black: "var(--text-black-color)",
          red: "var(--red-text-color)",
          green: "var(--green-text-color)",
          orange: "var(--orange-text-color)",
          voilet: "var(--voilet-text-color)",
        },
        background: {
          profile: "var(--profile-bg-color)",
          red: "var(--red-bg-color)",
          green: "var(--green-bg-color)",
          orange: "var(--orange-bg-color)",
          voilet: "var(--voilet-bg-color)",
          card: "var(--card-bg-color)",
        },
        icon: {
          gray: "var(--icon-gray-color)",
          background: "var(--icon-bg-color)",
          focus: "var(--icon-focus-color)",
        },
        stroke: {
          border: "var(--border-stroke-color)",
          divider: "var(--divider-stroke-color)",
        },
        shadow: {
          card: "var(--shadow-card-color)",
          navbar: "var(--shadow-nav-color)",
        },
      },
    },
  },
  plugins: [],
};
