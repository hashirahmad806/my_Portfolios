/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        clash:    ['"Clash Display"', 'sans-serif'],
        cabinet: ['"Cabinet Grotesk"', 'sans-serif'],
        serif:   ['"Instrument Serif"', 'serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        obsidian: '#080810',
        void:     '#0c0c18',
        surface:  '#11111f',
        surface2: '#16162a',
        gold:     '#c9a84c',
        gold2:    '#e8c97a',
        amber:    '#f5a623',
        emerald2: '#00e5a0',
        cyan2:    '#00d4ff',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
        'marquee':    'marquee 25s linear infinite',
        'spin-slow':  'spin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-16px)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
