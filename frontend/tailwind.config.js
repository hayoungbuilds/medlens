module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'medical': {
          'stable': '#10b981',
          'warning': '#f59e0b',
          'critical': '#ef4444',
        }
      }
    },
  },
  plugins: [],
}
