// webpack.config.js
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');//---根据模板动态生成Html
var cleanWebpackPlugin = require('clean-webpack-plugin');//---根据模板动态生成Html

module.exports = {
    devtool: 'eval-source-map',
    entry: path.resolve(__dirname, './src/js/app.js'),//指定webpack打包的入口是app.js
    output: {
        path: path.resolve(__dirname, './dist/'),//指定打包后js文件放置的位置
        filename: './js/bundle-[hash].js'
    },
    module: {
        rules: [
            {
                test: /.jsx$/, //使用loader的目标文件。这里是.jsx
                loader: 'babel-loader'
            },
            {
                test: /.(js)$/, //使用loader的目标文件。这里是.js
                loader: 'babel-loader',
                exclude: [
                    path.resolve(__dirname, './node_modules')  // 由于node_modules都是编译过的文件，这里我们不让babel去处理其下面的js文件
                ]
            }
        ]
    },
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    //初始化插件
    plugins:[
        new htmlWebpackPlugin({
            template:'index.html',//定义插件读取的模板文件是根目录下的index.html
            filename:'./views/index.html'//定义通过模板文件新生成的页面名称
        })
    ]
}