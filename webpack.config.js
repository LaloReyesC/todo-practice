const babelPlugin            = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const copyPlugin             = require('copy-webpack-plugin');
const htmlPlugin             = require('html-webpack-plugin');
const miniCssPlugin          = require('mini-css-extract-plugin');
const optimizeAssetsPlugin   = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'development',
    optimization: {
        minimizer: [new optimizeAssetsPlugin()]
    },
    output: {
        filename: '[name].[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false
                }
            },
            {
                test: /\.css$/,
                exclude: /style\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /style\.css$/,
                use: [
                    miniCssPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new babelPlugin(),
        new CleanWebpackPlugin(),
        new copyPlugin({
            patterns: [
                {
                    from: 'src/assets/',
                    to: 'assets/'
                }
            ]
        }),
        new htmlPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new miniCssPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        })
    ]
}