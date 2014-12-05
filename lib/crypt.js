var crypto = require('crypto');
var assert = require("assert");

var rsa = {
  encrypt: function (plainText, key) {
    assert(key);

    var signer = crypto.createSign("RSA-SHA256", 'utf8');
    signer.update(plainText);
    var sign = signer.sign(key, "hex");
    return sign;
  },
  verify: function (plainText, sign, key) {
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

var md5 = {
  encrypt: function (plainText, key) {
    assert(key);
    plainText = plainText + key;
    return crypto.createHash('md5').update(plainText, 'utf8').digest("hex");
  },

  verify: function (plainText, sign, key) {
    assert(key);
    plainText = plainText + key;
    var mysing = crypto.createHash('md5').update(plainText).digest("hex");
    return (mysgin == sign);
  }
};

module.exports = {
  sign: function (text, key, type) {
    switch (type) {
      case 'MD5':
        return md5.encrypt(text, key);
        break;
      case 'RSA':
      case '0001':
      default :
        text = rsa.encrypt(text, key);
        return text;
        var b = new Buffer(text);
        var base64 = b.toString('base64');
        return base64;
        break;
    }
  },
  verify: function (plainText, sign, key, type) {
    switch (type) {
      case 'MD5':
        text = md5.verify(plainText, sign, key);
        break;
      case 'RSA':
      case '0001':
      default :
        return rsa.verify(plainText, sign, key);
        break;
    }
  },
  decrypt: function (encryptedText, key) {
    return rsa.decrypt(encryptedText, key);
  }
};
