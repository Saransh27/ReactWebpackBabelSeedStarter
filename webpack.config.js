const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const settings = {
  publicPath: path.join(__dirname, "public"),
  srcPath: path.join(__dirname, "src")
};
const outputBundleName = 'bundle';
function srcPathExtend(subpath) {
  return path.join(settings.srcPath, subpath)
}

module.exports = (env)=> {
  const devMode = env.mode ==='production'? false : true
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
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
           'css-loader','sass-loader'],
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
    filename: devMode ? `${outputBundleName}.js` : `${outputBundleName}.[hash].js`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin([settings.publicPath], {
      verbose: true
  }),
  new HtmlWebpackPlugin({
      template: srcPathExtend("index.html")
  }),
  new MiniCssExtractPlugin({
    filename: devMode ? `${outputBundleName}.css` : `style/${outputBundleName}.[hash].css`
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

