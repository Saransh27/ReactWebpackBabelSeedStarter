const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const settings = {
  publicPath: path.join(__dirname, "public"),
  srcPath: path.join(__dirname, "src")
};
const outputBundleNamePrefix = 'bundle';
function srcPathExtend(subpath) {
  return path.join(settings.srcPath, subpath)
}

module.exports = (env)=> {
  const devMode = env.mode ==='production'? false : true
  return {
    optimization: devMode ? {}:{
      minimizer: [
        new UglifyJsPlugin({
          cache: false,
          parallel: true,
          sourceMap: devMode // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
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
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: !devMode }
          }
        ]
      },
      //image files
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      //font files
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
       // CSS Files
       {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    filename: devMode ? `${outputBundleNamePrefix}.js` : `${outputBundleNamePrefix}.[hash].js`
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
    filename: devMode ? `style/${outputBundleNamePrefix}.css` : `style/${outputBundleNamePrefix}.[hash].css`
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

