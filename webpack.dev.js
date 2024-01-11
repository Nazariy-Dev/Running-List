const path = require("path")
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/templates/template.pug",
        inject: 'body',
    })],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",// 3. Injects styles into dom
                    "css-loader",  // 2. Turns css into commonJS
                    "sass-loader"  // 1. Turns sass into css
                ]
            },
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 3000,
        open: {
            app: {
                name: 'Google Chrome'
              }
        }
        
    },

})