/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f8f0',
          100: '#c8ecd9',
          200: '#9dddb8',
          300: '#6fcf97',
          400: '#4ec07e',
          500: '#2ECC71',
          600: '#27AE60',
          700: '#1e8449',
          800: '#176937',
          900: '#0f4d26'
        },
        accent: {
          50: '#fef5e7',
          100: '#fde8c3',
          200: '#fbd89c',
          300: '#f9c874',
          400: '#f7ba53',
          500: '#F39C12',
          600: '#e67e22',
          700: '#d35400',
          800: '#b7472a',
          900: '#9c3b1c'
        },
        surface: {
          50: '#ffffff',
          100: '#f8f9fa',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#212529'
        }
      },
      fontFamily: {
        'display': ['Poppins', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px'
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 16px rgba(0, 0, 0, 0.12)',
        'elevated': '0 8px 32px rgba(0, 0, 0, 0.12)'
      }
    },
  },
  plugins: [],
}