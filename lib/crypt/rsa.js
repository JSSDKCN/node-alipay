/**
 * Alipay rsa crypt support
 * @author calidion@gmail.com
 *
 */

var crypto = require('crypto');
var assert = require("assert");

var ursa = require('ursa');
var fs = require('fs');

var key, crt;

module.exports = {
  init: function(pems) {
    key = ursa.createPrivateKey(fs.readFileSync(pems.private));
    crt = ursa.createPublicKey(fs.readFileSync(pems.public));
  },
  encrypt: function (plainText) {
    return key.encrypt(plainText, 'utf8', 'base64');
  },
  verify: function (sign, plainText, key) {
    assert(key);
    var verifier = crypto.createVerify("RSA-SHA256", 'utf8');
    verifier.update(plainText);
    var result = verifier.verify(key, sign, "hex");
    return result;
  },
  decrypt: function (encryptedText) {
    return key.decrypt(encryptedText, 'utf8', 'base64');
  }
};