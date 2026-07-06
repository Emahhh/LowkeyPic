/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './how-to-make-low-opacity-overlay-trend/index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 80px rgba(147, 197, 253, 0.18)',
        panel: '0 24px 90px rgba(0, 0, 0, 0.42)',
        soft: '0 18px 70px rgba(0, 0, 0, 0.28)',
        preview: '0 28px 90px rgba(0, 0, 0, 0.48), 0 0 80px rgba(167, 139, 250, 0.12)',
      },
    },
  },
  plugins: [],
};
