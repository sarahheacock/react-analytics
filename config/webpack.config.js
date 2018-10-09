const path = require('path');

module.exports = {
    entry: {
        background: path.resolve(__dirname, '../src/background/index.js'),
        content_script: path.resolve(__dirname, '../src/content_script/index.js'),
        devtool: path.resolve(__dirname, '../src/devtool/index.js'),
        panel: path.resolve(__dirname, '../src/panel/index.js'),
        reload: path.resolve(__dirname, '../src/reload/index.js'),
    },
    output: {
        path: path.resolve(__dirname, '../build'),
        // filename: 'devtool.js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};