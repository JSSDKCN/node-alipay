'use strict';

var alipay = require('./lib/alipay');
var config = require('./lib/config');
var mobile = require('./lib/mobile');
var v3 = require('./lib/mobile-v3');

alipay.config = config;
alipay.mobile = mobile;
alipay.v3 = {
  mobile: v3
};
module.exports = alipay;
