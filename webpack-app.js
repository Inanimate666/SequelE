'use strict';
const path = require('path'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      {CleanWebpackPlugin} = require('clean-webpack-plugin'),
      ManifestPlugin = require('webpack-manifest-plugin'),
      BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './Something/js/index.js',
    output: {
        path: path.resolve(__dirname, './Something/dist'),
        publicPath: './Something/',
        filename: '[name].js',
    },
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'Something/js/'),
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.s[ac]ss$/i,
                include: path.resolve(__dirname, 'Something/scss'),
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                include: [
                    path.resolve(__dirname, 'Something/fonts')
                ],
                loader: 'file-loader'
            },
            {
              test: /\.(ico|png|svg|jpg|gif)$/i,
              include: path.resolve(__dirname, 'Something/img'),
              options: {  
                publicPath: './Something/dist/'
              },
              loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BrowserSyncPlugin(
            {
              server: './Something/',
              notify: false,
              files: [
                {
                  match: ['./Something/'],
                  fn(event, file) {
                    if (event === 'change') {
                      const bs = require('browser-sync').get('bs-webpack-plugin');
                      bs.reload();
                    }
                  },
                },
              ],
            },
            {
              reload: false,
            }
          ),
    ],
};
