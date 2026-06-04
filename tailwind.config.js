/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // BU SATIR ÇOK ÖNEMLİ: Tailwind'in senin stillerini ezmesini engeller.
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
