/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tactical/HUD color palette
        'tactical': {
          'primary': '#00ff88',
          'secondary': '#0088ff',
          'accent': '#ff4444',
          'warning': '#ffaa00',
          'dark': '#0a0a0a',
          'darker': '#050505',
          'gray': '#1a1a1a',
          'light-gray': '#2a2a2a',
        },
        // Holographic effects
        'holo': {
          'blue': '#00ccff',
          'green': '#00ff88',
          'purple': '#cc00ff',
          'orange': '#ff8800',
        },
        // Glass/transparency
        'glass': {
          'dark': 'rgba(0, 0, 0, 0.8)',
          'light': 'rgba(255, 255, 255, 0.1)',
          'tactical': 'rgba(0, 255, 136, 0.1)',
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'display': ['Orbitron', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
        'flicker': 'flicker 0.15s infinite linear',
        'holo-shimmer': 'holo-shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00ff88, 0 0 10px #00ff88, 0 0 15px #00ff88' },
          '100%': { boxShadow: '0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'holo-shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'tactical': '0 0 20px rgba(0, 255, 136, 0.3)',
        'holo': '0 0 30px rgba(0, 204, 255, 0.4)',
        'glow': '0 0 40px rgba(255, 68, 68, 0.3)',
        'inner-tactical': 'inset 0 0 20px rgba(0, 255, 136, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'holo-gradient': 'linear-gradient(45deg, #00ccff, #00ff88, #cc00ff, #ff8800)',
        'scan-line': 'linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.5), transparent)',
      },
    },
  },
  plugins: [],
}
