const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          }
        },
        {
          test: /\.html$/,
          use: [
            {
                loader: "html-loader"
            }
          ]
        },
        {
        test: /\.css$/,
          loader: 'style-loader!css-loader'
          //loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' 
        }
      ]

    },
    plugins: [
      new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html"
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.css']      
    }
  };