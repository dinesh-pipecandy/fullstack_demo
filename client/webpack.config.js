var path = require("path");
var webpack = require('webpack');
module.exports = {
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
         loaders: [
           {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loaders: ["react-hot-loader","babel-loader"]
           },
          //  {
          //    test: /\.css$/,
          //    loaders: ["css-loader"]
          //  },
          //  {
          //    test: /\.svg$/,
          //    loaders: ["svg-url-loader"]
          //  },
          //  {
          //   test: /\.html$/,
          //   loader: "file?name=[name].[ext]",
          //  }
          {
            test : /(\.css|\.svg)$/,
            exclude : /node_modules/,
            loaders:["ignore-loader"]
          }
       ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer:{
    hot:true,
    contentBase: './build'
  }
};
