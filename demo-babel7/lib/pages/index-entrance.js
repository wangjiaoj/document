"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var a = 1;
var b = 2;
var c = a + b;
var instance = new _promise["default"](function (resolve, reject) {
  resolve(123);
});
var Person = /*#__PURE__*/(0, _createClass2["default"])(function Person(name) {
  (0, _classCallCheck2["default"])(this, Person);
  this.name = name;
});