'use strict';
var alipay = require('./lib/alipay');
var mobile = require('./lib/mobile');

alipay.mobile = mobile;
module.exports = alipay;