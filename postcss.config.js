module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    'postcss-nested': {},
    'postcss-flexbugs-fixes': {},
    'postcss-hexrgba': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
    cssnano: {},
  },
}