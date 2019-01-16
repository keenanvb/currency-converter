const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  entry: path.resolve(__dirname, 'src') + '/client/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundled.js'
  },
  module: {
    rules: [{
        test: /\.jsx$|\.es6$|\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },

      {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ]
      }
    ]
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    port: 3001
  }
};