export default {
  plugins: {
    'postcss-uncss': {
      html: ['./src/index.html'],
    },
    'tailwindcss/nesting': {},
    tailwindcss: {},
  },
};
