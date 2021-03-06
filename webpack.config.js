const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname + '/docs',
    filename: 'bundle.js'
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    port: 3000,
    writeToDisk: false,
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        loaders: ["style-loader","css-loader"]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include: [
          path.resolve(__dirname, "src/fonts/")
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        exclude: [
          path.resolve(__dirname, "src/fonts/")
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'uikit1.html',
      template: './src/uikit1.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'uikit2.html',
      template: './src/uikit2.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'uikit3.html',
      template: './src/uikit3.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'uikit4.html',
      template: './src/uikit4.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'uikit5.html',
      template: './src/uikit5.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'landing.html',
      template: './src/landing.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'filter.html',
      template: './src/filter.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'jquery.html',
      template: './src/jquery.pug'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};