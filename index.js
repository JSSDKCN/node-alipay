var alipay = require('./lib/alipay');
var config = require('./lib/config');
var mobile = require('./lib/mobile');

alipay.config = config;
alipay.mobile = mobile;
module.exports = alipay;







