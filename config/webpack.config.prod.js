/* eslint import/no-extraneous-dependencies: ['error', {'devDependencies': true}] */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const dependencies = require('../package.json').dependencies;

const serverDependencies = [];
const cdnPath = 'https://cdn.prodios.com/';

const here = (relpath) => {
  if (relpath === '') {
    return __dirname;
  }
  return path.resolve(__dirname, relpath);
};

module.exports = {
  entry: {
    app: ['./src/index.js'],
    vendor: Object.keys(dependencies).filter(
      dep => serverDependencies.indexOf(dep) === -1,
    ),
  },
  output: {
    path: here('../dist'),
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[chunkhash:8].js',
    publicPath: cdnPath,
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
        test: /\.html$/,
        loader: 'html',
      },
      {
        test: /\.(jpg|jpeg|png|gif)(\?.*)?$/,
        loader: 'image-webpack',
        mozjpeg: {
          quality: 100,
        },
        query: {
          progressive: true,
          optimizationLevel: 7,
          interlaced: false,
          pngquant: {
            quality: '65-90',
            speed: 4,
          },
        },
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'static/images/[name].[hash:8].[ext]',
          publicPath: cdnPath,
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=1!postcss', {
            publicPath: cdnPath,
          },
        ),
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
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
    new ExtractTextPlugin('static/styles/[name].[contenthash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
  ],
};
