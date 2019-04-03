const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

require("shelljs/global");

rm("-rf", "./dist/js");

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