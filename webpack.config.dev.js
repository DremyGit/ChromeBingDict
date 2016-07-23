const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = {

  app: './app',
  output: './.tmp'
};
module.exports = {
  devtool: 'cheap-module-source-map',
  //devtool: 'cheap-module-eval-source-map',
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
      { context: paths.app, from: './*', to: '.'},
      { context: paths.app, from: './_locales/**/*', to: '.'}
    ], {
      ignore: [{ glob: '**/*', dot: true }]
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

