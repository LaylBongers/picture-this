module.exports = {
    entry: './src/index.jsx',

    output: {
        path: './target',
        filename: 'index.js'
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
    },

    module: {
        loaders: [{
            test: /\.html$/,
            include: [/src/],
            loaders: ['file?name=[name].[ext]']
        }, {
            test: /\.scss$/,
            include: [/src/],
            loaders: ['file?name=[name].css', 'sass']
        }, {
            test: /\.jsx$/,
            include: [/src/],
            loader: 'babel',
            query: {
                plugins: ['transform-runtime'],
                presets: ['react', 'es2015', 'stage-0'],
                cacheDirectory: true
            }
        }]
    }
};
