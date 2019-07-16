const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = { 
    entry: "./src/index.js", // основной файл приложения
    output:{ 
        path: path.resolve(__dirname, 'dist'), // путь к каталогу выходных файлов
        filename: "bundle.js"  // название создаваемого файла 
    },
    mode: 'development',
    devtool: this.mode === 'development' ? 'source-map' : false,  //отключаем source-maps на продакшн
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 4200
    },
    module:{ 
        rules:[
            { 
                test: /\.jsx?$/, // какие файлы обрабатывать
                exclude: /node_modules/, // какие файлы пропускать
                use: { loader: "babel-loader" }
            },
            {
                test: /\.css$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        // you can specify a publicPath here
                        // by default it uses publicPath in webpackOptions.output
                        hmr: process.env.NODE_ENV === 'development',
                      },
                    },
                    'css-loader',
                ],
            }            
        ] 
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ]
}