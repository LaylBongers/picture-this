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
            exclude: [/node_modules/],
            loader: 'file?name=[name].[ext]'
        }, {
            test: /\.jsx?$/,
            exclude: [/node_modules/, /bower_components/],
            loader: 'babel',
            query: {
                presets: ['react', 'es2015'],
                cacheDirectory: true
            }
        }]
    }
};
