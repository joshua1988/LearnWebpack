webpackJsonp([0],{

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

var moment = __webpack_require__(0);
var _ = __webpack_require__(117);
var ele = document.querySelectorAll('p');

document.addEventListener("DOMContentLoaded", function(event) {
  ele[0].innerText = moment().format();
  ele[1].innerText = _.drop([1, 2, 3], 0);
});


/***/ })

},[118]);