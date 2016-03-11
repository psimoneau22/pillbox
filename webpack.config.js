var webpack = require("webpack")
var path = require("path");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    entry: {
        vendor: ["react"],
        test: "./src/test"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                include: path.resolve(__dirname, "src"),
                test: /\.jsx/,
                loader: "babel-loader",
                query: {
                    presets: ["react"]
                }
            }
        ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    plugins: [
        new CommonsChunkPlugin({
            name: "vendor",
            filename: "[name].js"
        })
    ]
    
}