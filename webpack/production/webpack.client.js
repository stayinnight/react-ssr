
// 客户端的webpack配置
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

module.exports = {
    mode: "production",
    entry: path.join(__dirname, '../../src/client/index.js'),
    output: {
        filename: 'js/[name].[chunkhash:8].js',
        path: path.join(__dirname, '../../dist/public/static'),
        publicPath: 'static/'
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.optimize\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
                canPrint: true
            }),
        ],
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
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[contenthash:8].[ext]',
                            publicPath: '/'
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            '__SERVER__': false,
            "IS_PROD": true,
            "process.env": 'production'
        }),
        require('autoprefixer'),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        }),
        new webpack.DllReferencePlugin({
            manifest: require(
                path.join(__dirname, '../../dist/public/library/manifest.json')
            ),
        }),
        new WebpackManifestPlugin({
            fileName: '../manifest/prod-manifest.json',
        })
    ]
}
