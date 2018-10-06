var path = require('path'); // node内置path模块
var webpack = require('webpack'); // webpack打包工具
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    // vendor: [
    //   'react',
    //   'react-dom',
    //   'react-router'
    // ],
    // antd: [
    //   'antd/lib/button',
    //   'antd/lib/icon'
    // ]
  },
  output: {
    path: path.resolve(__dirname, 'ROOT'), // 打包输出目录
    publicPath: '/',
    chunkFilename: '[name].[chunkhash].js',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      /**
      Babel 通过语法转换器支持最新版本的 JavaScript 。
      这些插件允许你立刻使用新语法（ES6\ES5），无需等待浏览器支持。
      ./babelrc属于babel的配置文件
      transform-class-properties想要在class中使用箭头函数等语法需要这个
      **/
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015'],
          plugins: [
            'transform-class-properties',
            ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }, { libraryName: "antd-mobile", style: "css" }]
          ]
        }
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      /**
      使用html模板并且压缩到最小
      **/
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      /**
      css-loader提取css的加载器配合插件使用
      style-loader注入style标签使用
      **/
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      /*
        图片加载器
      */
      {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'img/[hash]-[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|ttf|gif)$/,
        use: [
          {
            loader: 'file-loader',
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          "babel-loader",
          {
            loader: "react-svg-loader",
            options: {
              svgo: {
                plugins: [
                  { removeTitle: false }
                ],
                floatPrecision: 2
              }
            }
          }
        ]
      },
      /*
        可以将图片打包到执行文件夹并且对于小文件打包为数据 地址
      */
      //less加载器
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader", // compiles Less to CSS
            options: { javascriptEnabled: true }
        }]
      }]
  },
  devServer: {
    compress: true,
    // hot: true,
    host: '0.0.0.0', // 配置可以让同一局域网的ip访问
    historyApiFallback: true, // 当路由不匹配时自动找到dist/index.html， 如果使用其它服务器也需要配置404匹配dist/index.html
    port: 8987
  },
  plugins: [
    new HtmlWebPackPlugin({ // 自动生成html
      template: "./src/util/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({ // 提取css的插件配合加载器使用
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([ // 项目配置文件：项目的显示名称、后台服务地址、、、
      {
        from: 'src/util/configuration.js',
        to: './configuration.js'
      },
      {
        from: 'src/util/jspdf.js',
        to: './jspdf.js'
      }],{copyUnmodified: true}
    ),
    new webpack.NamedModulesPlugin(), //显示模块的相对路径
  ],
  resolve: {
    alias: { // 对间隔比较远的文件可以进行重命名
      components: path.resolve(__dirname, 'src/component/'),
      commonFunc: path.resolve(__dirname, 'src/util/commonFunction/'),
      roots: path.resolve(__dirname, 'src/container/'),
    }
  }
};
