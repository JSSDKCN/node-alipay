/**
 * Alipay apis
 * @author calidion@gmail.com
 *
 */

var signer = require("./crypt");

var alipay = {};

/**
 * Convert one dimension json object into xml formatted string
 * @param {Object} data - Json to be converted
 */

alipay.toXml = function (data) {
  var str = "";
  var values = [];
  for (var key in data) {
    values.push('<' + key + '>' + data[key] + '</' + key + '>');
  }
  return values.join('');
};

/**
 * Sending http request
 *
 * @param {String} url - url to be sent
 * @param {Object} qs - query string for object
 * @param {Function} callback - callback function
 *
 */

alipay.request = function (url, qs, callback) {
  var request = require('request');
  request({url: url, qs: qs}, function (err, response, body) {
    callback && callback(err, response, body);
  });
};

/**
 * Get marshaled string from a params object
 *
 * @param {String} url - url to be sent
 * @param {Object} qs - query string for object
 * @param {Function} callback - callback function
 *
 */

alipay.marshal = function(params) {

  var keys = Object.keys(params).sort();
  var sortedParams = {};
  for (var i = 0; i < keys.length; i++){
    var k = keys[i];
    if (['sign', 'sign_type', ''].indexOf(k) >= 0) {
      continue;
    }
    sortedParams[k] = params[k];
  }

  var kvs = [];

  for(var k in sortedParams) {
    kvs.push(k + '=' + sortedParams[k]);
  }
  return kvs.join("&");
};

alipay.signer = signer;

module.exports = alipay;