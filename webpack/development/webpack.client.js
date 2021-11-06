
// 客户端的webpack配置
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    mode: "development",
    entry: path.join(__dirname, '../../src/client/index.js'),
    output: {
        filename: 'js/[name].[chunkhash:8].js',
        path: path.join(__dirname, '../../dist/public/static'),
        publicPath: 'static/'
    },
    module: {
        rules: [
            {
                test: /.js?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /.(sc|sa|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                    },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]',
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin (),
        new webpack.DefinePlugin({
            '__SERVER__': false,
            "IS_PROD": false,
            "process.env": 'development'
        }),
        new WebpackManifestPlugin({
            fileName: '../manifest/dev-manifest.json',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, '../../dist'),
            watch: {
                ignored: /node_modules/,
                usePolling: false,
            },
        },
        compress: true,
        port: 3001,
        devMiddleware: {
            index: true,
            mimeTypes: { 'text/html': ['phtml'] },
            publicPath: 'http://localhost:3000/static/',
            serverSideRender: true,
            writeToDisk: true,
        },
    }
}
