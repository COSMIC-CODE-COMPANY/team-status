const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: SRC_DIR + '/index',
  output: {
    path: DIST_DIR + '/assets/app',
    filename: 'bundle.js',
    publicPath: './',  // USE THIS FOR ZENDESK DEPLOYMENTS
  },

  optimization: {
    usedExports: true,
    minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: 'Team Status',
      template: './src/views/index.html',
      filename: 'index.html',
    }),
  ],
};
