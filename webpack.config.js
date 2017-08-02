/**
 * Created by Developer39 on 7/29/2017.
 */
var path=require('path');

const webpack=require('webpack');

module.exports = {
    entry:'./src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'public')
    },
    watch:true,
    module: {
        loaders: [{
            test:/\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-1']
            }
        }]
    }
}