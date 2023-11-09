/** @type {import("prettier").Config} */
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 100,
  endOfLine: 'auto',
  tailwindConfig: 'tailwind.config.js',
  plugins: ['prettier-plugin-tailwindcss'],
  pluginSearchDirs: false,
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}

module.exports = config
