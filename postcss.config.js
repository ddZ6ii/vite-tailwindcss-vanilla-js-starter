export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-nested': {},
    'postcss-uncss': {
      html: ['./src/index.html'],
    },
  },
};
