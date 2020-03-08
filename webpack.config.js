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
    writeToDisk: true,
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
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
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
      filename: 'some.html',
      template: './src/some.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.pug'
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: '[id].css',
    }),
  ]
};