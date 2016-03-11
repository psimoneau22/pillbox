var webpack = require("webpack")
var path = require("path");

module.exports = {
    entry: {
        test: "./test"
    },
    output: {
        path: __dirname,
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                loader: "babel-loader",
                query: {
                    presets: ["react"]
                }
            }
        ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    }
}