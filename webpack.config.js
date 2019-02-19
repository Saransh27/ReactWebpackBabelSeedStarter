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

module.exports = (env)=> {
  return {
  entry: './src/index.js',
  mode:env.mode,
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
       // CSS Files
       {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ]
  },
  resolve: {
    alias: {
      APICONFIG: path.resolve(__dirname, `config/api/${env.build_env}` ),
    },
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
  }
};

