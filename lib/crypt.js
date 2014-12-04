var crypto = require('crypto');
var assert = require("assert");
var keys = {
  privateKey: null,
  publicKey: null,
  aliPublicKey: null
};

var rsa = {
  init: function (privateKey, publicKey, aliPublicKey) {
    keys.privateKey = privateKey;
    keys.publicKey = publicKey;
    keys.aliPublicKey = aliPublicKey;
  },
  encrypt: function (plainText) {
    assert(keys.privateKey);

    var signer = crypto.createSign("RSA-SHA256", 'utf8');
    signer.update(plainText);
    var sign = signer.sign(keys.privateKey, "hex");
    return (sign);
  },
  verify: function (plainText, sign, key) {
    key = key || keys.aliPublicKey;
    assert(key);
    var verifier = crypto.createVerify("RSA-SHA256", 'utf8');
    verifier.update(plainText);
    var result = verifier.verify(key, sign, "hex");
    return (result);
  },
  decrypt: function (encryptedText) {
    assert(this.privateKey);
    var deciper = crypto.createDecipher("RSA-SHA256", keys.privateKey, 'utf8');
    deciper.update(encryptedText, 'hex');
  }
};

module.exports = {
  init: function (privateKey, publicKey, aliPublicKey, type) {
    switch (type) {
      default :
        rsa.init(privateKey, publicKey, aliPublicKey);
        break;
    }
  },
  sign: function (text, type) {
    switch (type) {
      case '0001':
      default :
        text = rsa.encrypt(text);
        break;
    }
    var b = new Buffer(text);
    var base64 = b.toString('base64');
    return base64;
  },
  verify: function(plainText, sign, key, type) {
    switch (type) {
      case '0001':
      default :
        return rsa.verify(plainText, sign, key);
        break;
    }
  },
  decrypt: function(encryptedText, type) {
    switch (type) {
      case '0001':
      default :
        return rsa.decrypt(encryptedText);
        break;
    }
  }
};
