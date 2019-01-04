module.exports = {
    entry: './src/js/app.jsx',
    output: {
        path: `${__dirname}/dist/js`,
        filename: 'script.min.js'
    },
    devServer: {
        historyApiFallback: true,
    },
    watch: true,
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["es2015", "stage-2", "react"]
                    }
                }
            }
        ]
    }
}
