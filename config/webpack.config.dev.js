/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const here = (relpath) => {
  if (relpath === '') {
    return __dirname;
  }
  return path.resolve(__dirname, relpath);
};

module.exports = {
  entry: {
    app: ['./src/index.js', 'webpack/hot/dev-server'],
  },
  output: {
    path: here('../dist'),
    filename: 'bundle.js',
  },
  devServer: {
    inline: true,
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
          plugins: ['transform-flow-strip-types'],
        },
      },
      {
        test: /\.css$/,
        loader: `style!css-loader?modules&importLoaders=1
          &localIdentName=[name]__[local]___[hash:base64:5]!postcss`,
      },
      {
        test: /\.html$/,
        loader: 'html',
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'static/images/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  postcss: () => ([
    autoprefixer({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9',
      ],
    }),
  ]),
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
