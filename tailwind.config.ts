import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
  },
  darkMode: 'class',
  plugins: [
    require("flowbite/plugin")
  ],
}
export default config
