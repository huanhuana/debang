var webpack = require('webpack');
// var CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin('common');//提取公共模块
var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({minimize: true});//代码压缩插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");//css独立打包
var providePlugin = new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery'});//挂载全局的jquery

//输入、输出是对应的，[name].js --> 对应entry中的文件名即index \ index2
module.exports = {
    entry : {index:'./src/js/entry.js'},
    output : {
        filename: '[name].js',
        publicPath: __dirname + '/out',//公共资源路径
        path: __dirname + '/out'
    },
    module:{
        rules:[
            {test: /.js$/, use: ['babel-loader']},//正则表达式的匹配，结尾是.js的用babel-loader处理   ，处理js     
            // {test: /.css$/, use: ['style-loader', 'css-loader']},//不是css独立打包，下面的是css独立打包
            {test: /.css$/, use: ExtractTextPlugin.extract({fallback: 'style-loader',use: 'css-loader'})},//处理CSS
            {test: /.(png|jpg|svg|gif)$/, use: ['url-loader?limit=8192&name=./[name].[ext]']},//处理图片
            {test: /.less$/, use:['style-loader', 'css-loader', 'less-loader']}
        ]
    },
    //下面的都是插件
    plugins: [uglifyPlugin, new ExtractTextPlugin('[name].css'), providePlugin]
}