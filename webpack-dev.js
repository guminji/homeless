/**
 * Created by guminji on 2019/9/9.
 */
//开发环境的打包配置
var path = require("path");
var webpack = require('webpack');
var htmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
//var extracttTextWebpackPlugin = requieextract-text-webpack-plugin
var config = {
    //入口文件
    entry:{
        index:'./src/js/index.js',
        content:"./src/js/content.js",
        //vendors: ['react', "react-dom"],
    },
    //输出地址
    output:{
        filename: '[name].js',
        path: path.resolve(__dirname,'dist'),
        //publicPath:'/assest/'
        //path:path.resolve(__dirname,'fontEnd/build'),
        //filename:'newIndex.bundle.js',
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|jpeg|gif|svg|jpg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: "[name].[hash:4].[ext]",
                    outputPath: "./images",//打包后图片文件输出路径
                    publicPath:'./images'
                }
            },
            {
                test:/\.less$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader:'css-loader',
                            options:{
                                url:false,
                                importLoaders:1
                            }
                        },
                        'postcss-loader',
                        'less-loader'
                    ],
                    publicPath: '../css'
                }),
                exclude: path.resolve(__dirname,'./node_modules')
            },
            {
                test:/\.css$/,
                // loader:"style-loader!css-loader",
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    fallback: "style-loader",
                    use:[
                        {
                            loader:'css-loader',
                            options:{
                                url:false, //false  css中加载图片的路径将不会被解析 不会改变
                                importLoaders:1
                            }
                        },
                        'postcss-loader',
                    ],
                    //publicPath: '../'
                })
            },
            { //页面中会用到img标签，img引用的图片地址也需要一个loader来处理,这样再打包后的html文件下img就可以正常引用图片路径了
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'
            },
            //{
            //    test: /\.css$/,
            //    use: [
            //        {
            //            loader: 'style-loader'  // 可以把css放在页面上
            //        },
            //        {
            //            loader: 'css-loader'    // 放在后面的先被解析
            //        }
            //    ]
            //},

            //{
            //    test: /\.(png|jpg|jpeg)$/,
            //    loader: "url-loader?limit=800000000&name=images/[hash:8].[name].[ext]",
            //    options:{
            //        publicPath:'./images'
            //    }
            //    //limit参数，代表如果小于大约4k则会自动帮你压缩成base64编码的图片,否则拷贝文件到生产目录
            //    //name后面是打包后的路径；
            //    //loader 后面 limit 字段代表图片打包限制，这个限制并不是说超过了就不能打包，而是指当图片大小小于限制时会自动转成 base64 码引用
            //    //上例中大于8192字节的图片正常打包，小于8192字节的图片以 base64 的方式引用。
            //},

        ]
    },

    //webpack打包插件
    plugins:[
        //打包前先删除之前的内容
        new CleanWebpackPlugin('dist/') ,
        // 提取css文件
        new ExtractTextWebpackPlugin({
            filename: './css/[name].min.css',
            allChunks: true // 一开始所有css都打包
        }),
        //new webpack.optimize.CommonsChunkPlugin({
        //    name: 'vendors',
        //    filename: '[name].[hash:4].js'//生成的vendors文件就是以这样的形式命名
        //}),

        //new ExtractTextPlugin("css/[name].css"),
        new htmlWebpackPlugin({
            template:"./src/template/index.html",
            filename:"index.html",
            chunks:['index','content']
        }),

        new copyWebpackPlugin([
            {
                from:__dirname+'/src/static',//打包的静态资源目录地址
                to:'./static' //打包到dist下面的static
            }
        ]),

    ],
    //optimization: {
    //    splitChunks: {
    //        cacheGroups: {
    //            commons: {
    //                name: "commons",
    //                chunks: "initial",
    //                minChunks: 2
    //            }
    //        }
    //    }
    //},
    //开发环境本地服务
    devtool: 'source-map',
    devServer: {
        //contentBase: path.resolve(__dirname, "fontEnd/dist"),
        //publicPath:'/',
        open:true,
        inline:true,
        hot:true,
        port:'3001',
        proxy:{
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/api' : ''}
            }
        },
        historyApiFallback:true
    },

}

module.exports = config;
