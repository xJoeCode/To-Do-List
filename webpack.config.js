const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
plugins: [
    new CopyPlugin({
        patterns: [
        {from: "src/index.html", to: "index.html" },
        {from: "src/README.md", to: path.resolve(__dirname, 'dist')},
        ],
    }),
    ],
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean:true
  },
  module:{
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ['style-loader', 'css-loader', "postcss-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },
  devServer:{
    static:{
      directory:path.resolve(__dirname, 'dist')
    },
    watchFiles:["src/**/*"],
    port: 3000,
    open: true,
    hot: true,
    compress:true,
    historyApiFallback: true,
  },
  mode: 'development',
  
};