const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const paths = {
  app: './app',
  output: './dist'
};
module.exports = {
  entry: {
    index: paths.app + '/scripts/entry-index.js',
    "chrome-dict": paths.app + '/scripts/entry-content.js'
  },
  output: {
    path: paths.output,
    filename: '[name].js',
    publicPath: paths.app
  },
  plugins: [
    new CopyWebpackPlugin([
      { context: paths.app, from: './*', to: '.'}
    ], {
      ignore: [{ glob: '**/*', dot: true }]
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  }
};

