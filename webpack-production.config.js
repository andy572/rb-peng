const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

require("shelljs/global");

rm("-rf", "./dist");

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
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '../fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new CopyPlugin([
            {
                from: path.resolve('./dev/backend'), to: path.resolve('./dist'),
            },
            {
                from: path.resolve('./dev/frontend/assets/'), to: path.resolve('./dist/public/assets'),
            }
        ])
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