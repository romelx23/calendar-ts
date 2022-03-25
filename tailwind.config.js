module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // auto-columns
        "cards": "repeat(auto-fit, minmax(300px, 1fr))",
      },
    },
  },
  plugins: [],
}