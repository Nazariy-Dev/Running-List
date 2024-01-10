const path = require("path")
const { default: test } = require("node:test");
const PugLoader = require("pug-loader")

module.exports = {
    entry: {
        main: "./src/scripts/index.js",
        // vendor: "./src/vendor.js"
    },

    module: {
        rules: [
            {
                test: /\.pug$/,
                use: ["pug-loader"]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]'
                  }
          
            },
        ]
    },
}