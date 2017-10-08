var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');

module.exports = {
  entry: {
    main: './app/index.js',
    vendor: [
      'moment',
      'lodash'
    ]
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'] // Extract the webpack bootstrap logic into manifest.js
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: './dist/'
    })
  ]
}
