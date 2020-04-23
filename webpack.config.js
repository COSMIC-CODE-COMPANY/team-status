const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: SRC_DIR + '/index',
  output: {
    path: DIST_DIR + '/assets/app',
    filename: 'bundle.js',
    // publicPath: './',  // USE THIS FOR ZENDESK DEPLOYMENTS
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
  optimization: {
    usedExports: true,
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
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          // 'css-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: 'Status Tracker',
      template: './src/views/index.html',
      filename: 'index.html',
    }),
  ],
};
