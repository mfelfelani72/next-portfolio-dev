/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-18 15:31:51
 * @Description:
 */

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        "yekan-bakh": ["var(--font-yekan-bakh)", "system-ui", "sans-serif"],
        "space-grotesk": ["var(--font-space-grotesk)", "monospace"],
        satoshi: ["var(--font-satoshi)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
