// ES6
// import _ from 'lodash';
// ES5
// var _ = require('lodash');
// var path = require('path');

function component() {
  var element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['Hello','webpack'], ' ');
  // element.innerHTML = 'Hello webpack';

  return element;
}

document.body.appendChild(component());