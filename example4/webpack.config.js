var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist' // 아래 devServer 에도 동일한 경로를 지정해준다.
  },
  devtool: "cheap-eval-source-map",
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    publicPath: "/dist/", // 절대 경로로 지정하고 앞뒤 '/' 꼭 지정
    compress: true,
    port: 9000
  },
};
