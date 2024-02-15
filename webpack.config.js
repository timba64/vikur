const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CopyPlugin = require('copy-webpack-plugin');

module.exports = function(env, argv) { 
    return {
        entry: "./src/index.js", // base file
        output:{ 
            path: path.resolve(__dirname, 'dist'), // path to output files
            filename: '[name].js',
            assetModuleFilename: 'img/[name][ext][query]',
            clean: true,
        },
        mode: argv.mode === 'production' ? 'production' : 'development',
        devtool: argv.mode === 'development' ? 'source-map' : false,  //del source-maps in production mode
        devServer: {
                static: {
                    directory: path.join(__dirname, 'dist'),
                },
                compress: true,
                port: 9000,
        },
        module:{ 
            rules:[
                { 
                    test: /\.jsx?$/, // какие файлы обрабатывать
                    exclude: /node_modules/, // какие файлы пропускать
                    use: { loader: "babel-loader" }
                },

                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        this.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            } // translates CSS into CommonJS modules
                        },
                        {
                            loader: 'postcss-loader', // Run postcss actions
                            options: {
                                sourceMap: true,
                                postcssOptions: {
                                    plugins: [
                                        [
                                            "postcss-preset-env",
                                            {
                                                //autoprefixer: { grid: true },
                                                browsers: 'last 3 versions',
                                            },
                                        ],
                                    ],
                                },
                            }
                        },
                        {
                            loader: 'sass-loader',  // compiles Sass to CSS
                            options: {
                                sourceMap: true
                            } 
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    type: 'asset/resource'
                },
            ] 
        },
        optimization: argv.mode === 'development' ? {} : {  // minimize our js
            minimizer: [
                new TerserPlugin({
                    test: /\.js(\?.*)?$/i,
                    exclude: /\.min\.js$/gi
                }),
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: argv.mode === 'development' ? 'css/[name].css' : 'css/[name].css',
            }),
            new HtmlWebpackPlugin({
                inject: 'body',
                hash: true,
                minify: false,
                template: './src/index.html',
                filename: 'index.html'
            }),
            new CopyPlugin({
                patterns: [
                    { from: 'src/fonts', to: 'fonts' },
                    { from: 'src/img/buyauto.png', to: 'img/buyauto.png' },
                    { from: 'src/img/logo_w.svg', to: 'img/logo_w.svg'},
                ]
            }),
        ]
    }
}
