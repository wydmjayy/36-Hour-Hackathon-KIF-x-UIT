/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm Finance Theme
        primary: {
          50: '#f0f9f7',
          100: '#e0f3ef',
          500: '#1F7A63',
          600: '#18654e',
          700: '#125240',
        },
        accent: {
          50: '#fff8f3',
          500: '#F4A261',
          600: '#e89349',
        },
        warmBg: '#F8F5F0',
        textDark: '#4A4A4A',
        error: '#E8585C',
        success: '#4CAF50',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
      },
      transitionDuration: {
        250: '250ms',
      },
    },
  },
  plugins: [],
}
