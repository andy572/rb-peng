var CleanPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var path = require('path');

module.exports = {
    context: __dirname,
    entry: "./dev/frontend/entry.tsx",
    output: {
        path: __dirname + "/dist/public/js",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader",
                    options: {
                        includePaths: [path.resolve("dev/frontend/styles")]
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanPlugin([
            path.resolve('./dist/public/js')
        ]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    mode: "development",
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    performance: {
        hints: false
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.mjs', '.json', '.css']
    }
};