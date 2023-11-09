// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyPlugin = require('copy-webpack-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const getClientEnvironment = require('react-scripts/config/env')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TerserPlugin = require('terser-webpack-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    style: {
      // why use postcssOptions? -> https://github.com/dilanx/craco/issues/353
      postcssOptions: {
        plugins: [require('tailwindcss'), require('autoprefixer')],
      },
    },
    configure: (webpackConfig, { paths }) => {
      const htmlWebpackPluginInstance = webpackConfig.plugins.find(
        (webpackPlugin) => webpackPlugin instanceof HtmlWebpackPlugin,
      )
      if (htmlWebpackPluginInstance) {
        htmlWebpackPluginInstance.userOptions.chunks = ['main']
      }

      const miniCssExtractPluginInstance = webpackConfig.plugins.find(
        (webpackPlugin) => webpackPlugin instanceof MiniCssExtractPlugin,
      )
      if (miniCssExtractPluginInstance) {
        miniCssExtractPluginInstance.options.filename = '[name].css'
      }

      return {
        ...webpackConfig,
        entry: {
          main: [paths.appIndexJs].filter(Boolean),
          'content-script': './src/browser/content-script/content-script.ts',
          'service-worker': './src/browser/service-worker/service-worker.ts',
          common: './src/browser/web_accessible_resources/common.ts',
        },
        output: {
          ...webpackConfig.output,
          filename: '[name].js',
        },
        optimization: {
          ...webpackConfig.optimization,
          minimizer: [
            new TerserPlugin({
              extractComments: false,
            }),
            ...webpackConfig.optimization.minimizer,
          ],
          runtimeChunk: false,
        },
      }
    },
    plugins: {
      add: [
        new CopyPlugin({
          patterns: [
            {
              from: `manifest/manifest${
                getClientEnvironment().raw.REACT_APP_BROWSER_ENGINE === 'gecko'
                  ? '.gecko'
                  : '.chromium'
              }.${getClientEnvironment().raw.REACT_APP_ENVIRONMENT}.json`,
              to: 'manifest.json',
            },
          ],
        }),
      ],
      remove: ['WebpackManifestPlugin'],
    },
  },
}
