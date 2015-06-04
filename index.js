'use strict';

var alipay = require('./lib/alipay');
var config = require('./lib/config');
var mobile = require('./lib/mobile');
var v3 = require('./lib/v3');

alipay.config = config;
alipay.mobile = mobile;
alipay.v3 = v3;
module.exports = alipay;
