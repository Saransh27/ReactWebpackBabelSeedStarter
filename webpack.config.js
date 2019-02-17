const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const settings = {
    publicPath: path.join(__dirname, "public"),
    srcPath: path.join(__dirname, "src")
};

function srcPathExtend(subpath) {
    return path.join(settings.srcPath, subpath)
}

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  output: {
    path: settings.publicPath,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin([settings.publicPath], {
      verbose: true
  }),
  new HtmlWebpackPlugin({
      template: srcPathExtend("index.html")
  })
  ],
  
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    publicPath: '/',
    host: 'localhost',
    port: 8080,
    open: true,
  },
};

