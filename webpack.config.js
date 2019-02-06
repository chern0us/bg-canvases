// webpack.config.js
const path = require('path');
// eslint-disable-next-line no-undef
module.exports = {
    mode: 'production',
    entry: './src/Background.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        library: "bg-canvases",
        libraryTarget: "umd",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
};
