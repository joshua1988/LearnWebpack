var webpack = require('webpack');
var path = require('path');
var ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: {
    main: './app/index.js',
    vendor: [
      'moment',
      'lodash'
    ]
  },
  output: {
    filename: '[name].js',
    // filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  // plugins: [
  //   // #1 - 모든 번들에 외부 라이브러리가 중복으로 로딩되지 않도록 CommonsChunkPlugin 사용
  //   new webpack.optimize.CommonsChunkPlugin({
  //     name: 'vendor' // Specify the common bundle's name.
  //     // #2 - 외부 라이브러리 자동 인식 옵션
  //     // minChunks: function (module) {
  //     //    // node_modules 안에 들어간 3rd 파티 라이브러리는 모두 외부 라이브러리로 간주
  //     //    return module.context && module.context.indexOf('node_modules') !== -1;
  //     // }
  //   }),
  //   // #3 - 비즈니스 앱 로직이 변경될 때 마다 vendor 까지 불필요하게 번들링 하므로, manifest 로 분리
  //   //      매번 번들링에서 생성되는 런타임 코드도 manifest 에 별도로 분리하여 overhead 를 줄임
  //   // new webpack.optimize.CommonsChunkPlugin({
  //   //   names: ['vendor', 'manifest'] // Specify the common bundle's name.
  //   // })
  //   // #3.1 - 라이브러리에 대한 정보를 manifest.json 에 저장하여 생성
  //   // new ManifestPlugin({
  //   //   fileName: 'manifest.json',
  //   //   basePath: './dist/'
  //   // })
  // ]
}
