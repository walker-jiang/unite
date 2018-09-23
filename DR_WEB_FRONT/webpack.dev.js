const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var webpack = require('webpack'); // webpack打包工具
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin() // 热更新
  ]
});
