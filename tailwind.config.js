/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Important: Add this to ensure Tailwind works with Ant Design
  corePlugins: {
    preflight: false,
  },
  important: true, // Add this to override Ant Design styles
} 