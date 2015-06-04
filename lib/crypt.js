/**
 * Alipay crypt support
 * @author calidion@gmail.com
 *
 */

var rsa = require('./crypt/rsa');
var md5 = require('./crypt/md5');

module.exports = {
  sign: function (text, keys, type) {
    switch (type) {
      case 'MD5':
        return md5.encrypt(text, keys.md5);
        break;
      case 'RSA':
      case '0001':
      default :
        text = rsa.encrypt(text, keys.rsa);
        return text;
        break;
    }
  },
  verify: function (plainText, sign, keys, type) {
    switch (type) {
      case 'MD5':
        text = md5.verify(sign, plainText, keys.md5);
        break;
      case 'RSA':
      case '0001':
      default :
        return rsa.verify(sign, plainText, keys.rsa);
        break;
    }
  },
  decrypt: function (encryptedText, keys) {
    return rsa.decrypt(encryptedText, keys.rsa);
  }
};
