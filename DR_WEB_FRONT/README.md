# siDemo（简称小四）♜

一个react脚手架，用到了react v4，react-router v4， webpack v4， webpack devServer
## 开始：
### 开发工具： atom
### 环境搭建 node.js 下载地址https://nodejs.org/en/ 最新版本即可， 默认安装一路next
### 然后安装依赖包：npm install (cmd进入项目根目录，没错就是siDemo)
### 安装完毕后 npm start
### 打包命令 npm run build
注： 该脚手架可以了从dist中读取json文件来加载系统菜单，所以打包需要把dist放在tomcat（或者任意服务器）中
### 你还在为等和后台联调苦恼吗，本脚手架支持通过服务引入本地JSON数据以配合展示，引入新的JSON文件放入dist/mockData中，当然正式环境中可以去掉，不过这在开发环境中很方便
## 脚手架介绍
###组件库
##### 1、material UI
material ui 日期组件汉化 安装 intl
##### 2、antd
##
项目结构图（使用前了解一下）
####		   |------.babellrc

####       |------package.json(依赖包注册文件)

####       |------README.md

####       |------webpack.config.js(webpack 配置文件包含服务器、插件)

####       |------src（源码库）

####                |------component(自己封装的组件都放在这个文件夹)

####                |------container(容器文件夹，组件容器)

####                |------util(包含系统配置文件、公共函数)

####               |------index.js(入口文件)

####       |------dist

####               |------mockData(模拟数据存放在这的JSON文件中)

####              　|------index.html 打包后的入口文件
