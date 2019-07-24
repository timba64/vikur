const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = { 
    entry: "./src/index.js", // base file
    output:{ 
        path: path.resolve(__dirname, 'dist'), // path to output files
        filename: this.mode === 'development' ? 'bundle.js' : 'bundle.[hash].js',  // name of creating file
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
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                    },
                    {
                        loader: 'postcss-loader', // Run postcss actions
                        options: {
                            plugins: function () { // postcss plugins, can be exported to postcss.config.js
                                if(this.mode === 'production') {
                                    return [
                                        require('autoprefixer'),
                                        require('cssnano')({ preset: 'default' }),
                                    ];
                                }

                                return [
                                    require('autoprefixer'),
                                ];
                            }
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
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 75,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                        }
                    }

                ],
            },
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
            filename: this.mode === 'development' ? 'css/[name].css' : 'css/[name].[hash].css',
            chunkFilename: this.mode === 'development' ? 'css/[id].css' : 'css/[id].[hash].css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin([
            { from: 'src/fonts', to: 'fonts' },
            { from: 'src/img/buyauto.png', to: 'img/buyauto.png' },
            { from: 'src/img/logo.svg', to: 'img/logo.svg'},
        ]),
    ]
}