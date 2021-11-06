
// 客户端的webpack配置
const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

process.env.BABEL_ENV = 'node';

module.exports = {
    mode: "development",
    target: 'node',
    entry: path.join(__dirname, '../../src/server/app.js'),
    output: {
        filename: 'app.js',
        path: path.join(__dirname, '../../dist/server')
    },
    externals: [nodeExternals()],
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
                        loader: 'ignore-loader',
                    },
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'ignore-loader',
                    },
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "__SERVER__": true,
            "IS_PROD": false,
            "process.env": 'development'
        }),
        new CleanWebpackPlugin(),
    ]
}