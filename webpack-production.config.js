const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

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
            }
        ]
    },
    plugins: [
        new CopyPlugin([{
            from: path.resolve('./dev/backend'), to: path.resolve('./dist')
        }]),
        new CleanPlugin([
            path.resolve('./dist')
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