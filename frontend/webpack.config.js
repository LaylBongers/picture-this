module.exports = {
    entry: './src/index.jsx',

    output: {
        path: './target',
        filename: 'index.js'
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx', '.elm']
    },

    module: {
        loaders: [{
            test: /\.html?$/,
            exclude: [/node_modules/, /target/],
            loader: 'file?name=[name].[ext]'
        }, {
            test: /\.jsx?$/,
            exclude: [/node_modules/, /target/],
            loader: 'babel',
            query: {
                plugins: ['transform-runtime'],
                presets: ['react', 'es2015', 'stage-0'],
                cacheDirectory: true
            }
        }]
    }
};
