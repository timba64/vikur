const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = { 
    entry: "./src/index.js", // base file
    output:{ 
        path: path.resolve(__dirname, 'dist'), // path to output files
        filename: "bundle.js"  // name of creating file
    },
    mode: 'development',
    devtool: this.mode === 'development' ? 'source-map' : false,  //del source-maps in production mode
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
    optimization: this.mode === 'development' ? {} : {  // minimize our js
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                exclude: /\.min\.js$/gi
            }),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
}