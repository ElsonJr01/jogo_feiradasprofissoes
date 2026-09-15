import type { Config } from 'tailwindcss';

/**
 * Paleta oficial do Clube de Programação, extraída dos materiais
 * institucionais (slides de apresentação). Centralizar as cores aqui
 * evita "cores mágicas" espalhadas pelo código (boa prática de UI).
 */
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        clube: {
          blue: '#136AFF', // azul primário (títulos, logo, CTA)
          'blue-dark': '#0B4FCC', // azul para hover/estado ativo
          'blue-light': '#A3C3FF', // acentos e superfícies suaves
          'blue-pale': '#E7EFFF', // fundo geral da aplicação
          green: '#6CBD3D', // verde de destaque (sucesso, headset do polvinho)
          'green-dark': '#4F9A29',
          purple: '#8D3596', // olhos do mascote / acentos lúdicos
          lavender: '#F4E2F5', // superfícies suaves e cards
          navy: '#001F57', // texto de alto contraste
        },
      },
      fontFamily: {
        // Pilhas de fontes do sistema (sem dependência de rede no build),
        // priorizando fontes arredondadas e amigáveis quando disponíveis.
        display: [
          'ui-rounded',
          '"Segoe UI Rounded"',
          '"Nunito"',
          '"Baloo 2"',
          'system-ui',
          'sans-serif',
        ],
        body: ['"Nunito"', 'ui-sans-serif', 'system-ui', '"Segoe UI"', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shake-x': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-6px)' },
          '75%': { transform: 'translateX(6px)' },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.25s ease-out',
        float: 'float 3.5s ease-in-out infinite',
        'shake-x': 'shake-x 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
};

export default config;
