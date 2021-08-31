const path = require('path');
const webpack = require('webpack');

const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pkg = require('./package.json');
const version = "1.0.4";

module.exports = {
    mode: process.env.NODE_ENV,
    context: __dirname + '/src',
    entry:
    {
        'index': './index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: `[name].js`,
    },

    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': path.resolve('src'),
        }
    },

    module: {
        rules: [{
            test: /\.vue$/i,
            loader: 'vue-loader',
        },
        {
            test: /\.html$/i,
            loader: 'html-loader',
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.less$/,
            use: [
                'vue-style-loader',
                'css-loader',
                'less-loader'
            ]
        },
        {
            test: /\.css$/i,
            use: [
                'style-loader', 'css-loader'
            ],
        },
        {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
            test: /\.sass$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader?indentedSyntax'],
        },
        {
            test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
            loader: 'file-loader',
            options: {
                esModule: false,
                name: '[name].[ext]',
                outputPath: 'images/',
                emitFile: true
            },
        },
        {
            test: /\.(woff2|ttf|woff|eot)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
                emitFile: true
            },
        }
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.WACRM_VERSION': `"${version}"`,
            global: 'window',
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'icons', to: 'icons' },
                { from: 'app/background.js', to: 'background.js' },
                { from: 'app/waext.js', to: 'waext.js' },
                { from: 'app/content.js', to: 'content.js' },
                {
                    from: 'manifest.json', to: 'manifest.json',
                    transform: (content, absoluteFrom) => {
                        let cobj = JSON.parse(content.toString());
                        cobj["version"] = version;

                        if (process.env.NODE_ENV == "development") {
                            cobj["host_permissions"].push("http://*/wa/WhatsApp*");
                        }

                        return JSON.stringify(cobj, null, 2);
                    }
                }
            ]
        }),
    ],
};
