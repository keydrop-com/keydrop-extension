const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const getClientEnvironment = require('react-scripts/config/env')
const TerserPlugin = require('terser-webpack-plugin')
const path = require('path')

/** @type {import('@craco/types').CracoConfig} */
const config = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
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

module.exports = config
