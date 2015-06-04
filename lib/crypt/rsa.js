/**
 * Alipay rsa crypt support
 * @author calidion@gmail.com
 *
 */

var crypto = require('crypto');
var assert = require("assert");

module.exports = {
  encrypt: function (plainText, key) {
    assert(key);
    var signer = crypto.createSign("RSA-SHA256", 'utf8');
    signer.update(plainText);
    var sign = signer.sign(key, "hex");
    return sign;
  },
  verify: function (sign, plainText, key) {
    assert(key);
    var verifier = crypto.createVerify("RSA-SHA256", 'utf8');
    verifier.update(plainText);
    var result = verifier.verify(key, sign, "hex");
    return result;
  },
  decrypt: function (encryptedText, key) {
    assert(key);
    var deciper = crypto.createDecipher("RSA-SHA256", key, 'utf8');
    deciper.update(encryptedText, 'hex');
  }
};