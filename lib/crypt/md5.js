/**
 * Alipay rsa crypt support
 * @author calidion@gmail.com
 * @lincense MIT
 */

var crypto = require('crypto');
var assert = require("assert");

module.exports = {
  encrypt: function (plainText, key) {
    assert(key);
    plainText = plainText + key;
    return crypto.createHash('md5').update(plainText, 'utf8').digest("hex");
  },
  verify: function (sign, plainText, key) {
    assert(key);
    plainText = plainText + key;
    return (crypto.createHash('md5').update(plainText).digest("hex") === sign);
  }
};