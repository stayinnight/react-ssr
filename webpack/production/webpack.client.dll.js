
// 分离基础库的配置文件
const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'production',
    entry: {
        library: [
            'react',
            'react-dom',
            'react-router',
            'axios'
        ]
    },
    output: {
        filename: '[name].lib.js',
        path: path.join(__dirname, '../../dist/public/library'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: "[name]",
            path: path.join(__dirname, "../../dist/public/library/manifest.json"),
        })
    ]
}