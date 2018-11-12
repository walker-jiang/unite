const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var webpack = require('webpack'); // webpack打包工具
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new ProgressBarPlugin(), // 显示打包进度条
    // new BundleAnalyzerPlugin(), // 打包分析插件
    new webpack.HotModuleReplacementPlugin() // 热更新
  ]
});
