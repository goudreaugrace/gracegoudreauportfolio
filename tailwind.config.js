/** Scans every page and script for Tailwind classes. Run `npm run build:css` after adding new classes. */
module.exports = {
  content: ['./*.html', './assets/**/*.js'],
  theme: { extend: {} },
  plugins: [],
};
