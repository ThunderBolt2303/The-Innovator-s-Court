/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a", // slate-900
        card: "#1e293b", // slate-800
        primary: "#38bdf8", // sky-400
        secondary: "#818cf8", // indigo-400
        accent: "#2dd4bf", // teal-400
        danger: "#f43f5e", // rose-500
        warning: "#fbbf24", // amber-400
        success: "#10b981", // emerald-500
      }
    },
  },
  plugins: [],
}
