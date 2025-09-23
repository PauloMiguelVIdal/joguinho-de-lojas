/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    // borderRadius: {
    //   'none': '0',
    //   'sm': '0.125rem',
    //   'md': '0.375rem',
    //   'lg': '0.5rem',
    //   'full': '9999px',
    //   '6xl': '40px'
    // },
    extend: {
      colors: {
        'roxo': '#6411D9',
        "roxoForte": "#331B8C",
        'marinho': '#1A1246',
        'laranja': '#F27405',
        'laranjaFraco': '#FF8F2D',
        'laranjaSuperFraco': '#FFF1E4'
      },
      width: {
        '450': '450px',
        '80': '80px',
        '110': '25rem',
      },
      heigth: {
        '150': '37.5rem',
        '128': '32rem'
      },
      fontSize: {
        "sm": '0.8rem',
        "base": '1rem',
        "xl": '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
        '5xl': '3.052rem',
        '6xl': '3.125rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      rotate: {
        '17': '17deg',
        '27': '27deg',
      },
      clipPath: {
        'losango': 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
      }
    },
  },
  plugins: [],
}

