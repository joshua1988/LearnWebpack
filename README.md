# LearnWebpack
Let's learn what is webpack and the basic of it.

## Tutorials
#### Getting-Started
1. Install webpack global

  ```js
  npm i webpack -g
  ```

2. create a package json file

  ```text
  npm init -y
  ```

3. create index.js & index.html

  ```html
  <!-- index.html -->
  <html>
    <head>
      <title>webpack 2 demo</title>
      <script src="https://unpkg.com/lodash@4.16.6"></script>
    </head>
    <body>
      <script src="app/index.js"></script>
    </body>
  </html>
  ```

  ```js
  // index.js
  function component () {
    var element = document.createElement('div');

    /* lodash is required for the next line to work */
    element.innerHTML = _.join(['Hello','webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
  ```

4. install lodash library using this command

  ```text
  npm i lodash --save
  ```

5. add the contents below into the file

  ```js
  // index.js
  // import & export is ES6 that doesn't work in the browser
  // but webpack would replace them with compatible wrapper code
  + import _ from 'lodash';
  ```

  ```html
  - <script src="https://unpkg.com/lodash@4.16.6"></script>
  - <script src="app/index.js"></script>
  + <script src="dist/bundle.js"></script>
  ```

6. run this command below and start the index.html. You will see this result on the web page.

  ```html
  webpack app/index.js dist/bundle.js
  ```

  ![getting-started-result](https://github.com/joshua1988/TIL/blob/master/webpack/images/webpack-getting-started.png?raw=true)

7. Let's add config file for more complex configuration

  ```js
  // webpack.config.js
  // `webpack` command will pick up this config setup by default
  var path = require('path');

  module.exports = {
    entry: './app/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
  ```

#### Example 1 - CSS Code Splitting
- As for CSS files, use `css-loader`for default setting. The extra option `ExtractTextWebpackPlugin` is available for better performance

```text
npm i css-loader style-loader --save-dev
npm i extract-text-webpack-plugin --save-dev
```

1. Create a new `package.json`

```
npm init -y
```

2. Install the necessary loaders and plugins using the commands above
3. Add index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>CSS & Libraries Code Splitting</title>
  </head>
  <body>
    <header>
      <h3>CSS Code Splitting</h3>
    </header>
    <div>
      <p>
        This text should be colored with blue after injecting CSS bundle
      </p>
    </div>
    <script src="dist/bundle.js"></script>
  </body>
</html>
```

4. Add `base.css`

```css
p {
  color : blue;
}
```

5. Add `app/index.js`

```js
import '../base.css';
```

6. Add `webpack.config.js`

```js
var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
}
```

7. Add ExtractPlugin to exract the bundled css filename

```js
// webpack.config.js

// ...
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// ...
{
  // ...
  module: {
    rules: [{
      test: /\.css$/,
      // Comment this out to load ExtractTextPlugin
      // use: ['style-loader', 'css-loader']
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
}
```

8. Add stylesheet link element to index.html

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>CSS & Libraries Code Splitting</title>
        <link rel="stylesheet" href="dist/styles.css">
    </head>
    <body>
        <header>
            <h3>CSS Code Splitting</h3>
        </header>
        <div>
            <p>
                This text should be colored with blue after injecting CSS bundle
            </p>
        </div>
        <script src="dist/bundle.js"></script>
    </body>
</html>
```

#### Example 2 - Libraries Code Splitting
- When using a couple of libraries, should you import them at the very beginning of bundling all files to avoid repetitively use them in every build.

```text
npm install webpack --save-dev
npm install moment lodash --save
npm i webpack-manifest-plugin --save-dev
```

1. Create a new `package.json`

```
npm init -y
```

2. Install the necessary loaders and plugins using the commands above
3. Add `index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Libraries Code Splitting</title>
  </head>
  <body>
    <header>
      <h3>Libraries Code Splitting</h3>
    </header>
    <div>
      <label for="p1"><strong>Moment JS : </strong></label>
      <p class="p1">
        not yet loaded
      </p>
      <label for="p2"><strong>Lodash JS : </strong></label>
      <p class="p2">
        not yet loaded
      </p>
    </div>
    <script src="dist/vendor.js"></script>
    <script src="dist/main.js"></script>
  </body>
</html>
```

4. Add `app/index.js`

```js
var moment = require('moment');
var _ = require('lodash');
var ele = document.querySelectorAll('p');

document.addEventListener("DOMContentLoaded", function(event) {
  ele[0].innerText = moment().format();
  ele[1].innerText = _.drop([1, 2, 3], 0);
});
```

5. Add `webpack.config.js`

```js
var webpack = require('webpack');
var path = require('path');

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
    path: path.resolve(__dirname, 'dist')
  }
}
```

optional

```js
// 1
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor' // Specify the common bundle's name.
  }),
]

// 2
plugins: [
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'manifest'] // Extract the webpack bootstrap logic into manifest.js
  }),
]

// 3
new ManifestPlugin({
  fileName: 'manifest.json',
  basePath: './dist/'
})
```

#### Example 3 - Webpack Resolve & Plugins
- Besides loader, plugins offer a wide variety of different features that Loaders don't provide

1. Create a new `package.json` and install plugins below

```
npm init -y
npm install webpack & jquery --save-dev
```

2. Add `index.html`

```html
<html>
  <head>
    <title>Webpack Plugins</title>
  </head>
  <body>
    <script src="dist/bundle.js"></script>
  </body>
</html>
```

3. Add `app/index.js`

```js
var $ = require('jquery');
console.log("loaded jQuery version is " + $.fn.jquery);
```

4. Add `webpack.config.js`

```js
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

5. run `webpack`
6. uncomments `#2` and `#3` to see how Resolve alias & Provide Plugin works

```js
// #2 - Using alias
// index.js
import $ from 'Vendor/jquery-2.2.4.min.js';
console.log("loaded jQuery version is " + $.fn.jquery);

// webpack.config.js
resolve: {
  alias: {
    Vendor: path.resolve(__dirname, './app/vendor/')
  }
}
```

```js
// #3 - Using Provide Plugin
// index.js
console.log("loaded jQuery version is " + $.fn.jquery);

// webpack.config.js
plugins: [
  new webpack.ProvidePlugin({
    $: 'jquery'
  })
]
```

#### Example 4 - Webpack Dev Server Setting
- Initial development setting to make the build process easier

```
npm install webpack webpack-dev-server --save-dev
webpack-dev-server --open
```

- or add this option to `package.json` to launch the dev server

```json
"scripts": { "start": "webpack-dev-server" }
```

1. Create a new `package.json` and type the commands above
2. Add `index.html`

```html
<html>
  <head>
    <title>Webpack Dev Server</title>
  </head>
  <body>
    <div class="container">
      hello
    </div>
    <script src="/dist/bundle.js"></script>
  </body>
</html>
```

3. Add `app/index.js`

```js
var ele = document.getElementsByClassName('container')[0];
ele.innerText = "Webpack loaded!!";
```

4. Add `webpack.config.js`

```js
var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist'
  },
  devtool: "cheap-eval-source-map",
  devServer: {
    publicPath: "/dist/",
    port: 9000
  },
};
```

5. Run `npm start` to launch the Webpack Dev Server

> Please keep in mind that the **webpack devserver compiles in memory** not emits bundled file in output.path

#### Example 5 - Webpack Dev Middleware
- Have a full control over already installed Node.js by installing the commands below

```
npm install webpack --save
npm install express webpack-dev-middleware --save-dev
```

1. Create a new `package.json` and type the commands above
2. Add `index.html`

```html
<html>
  <head>
    <title>Webpack Dev Middleware</title>
  </head>
  <body>
    <div class="container">
      hello
    </div>
    <script src="/dist/bundle.js"></script>
  </body>
</html>
```

3. Create a new `server.js` file and add Express & EJS in it

```js
var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname));

// view engine setup
// __dirname : root folder
app.set('views', path.join(__dirname));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
  res.send('index');
});

app.listen(3000);
console.log("Server running on port 3000");
```

4. Run `server.js` and make sure it doens't cause any errors
5. Add `app/index.js`

```js
var ele = document.getElementsByClassName('container')[0];
ele.innerText = "Webpack loaded!!";
```

6. Add `webpack.config.js`

```js
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:3000/dist'
  },
};
```

7. Add the codes below to `server.js`

```js
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config");
var compiler = webpack(webpackConfig);
```

```js
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {colors: true}
}));
```

## License & Copyright
**Copyright © 2017 Captain Pangyo**
<br><a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br>
This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivs 4.0 Unported License</a>.
