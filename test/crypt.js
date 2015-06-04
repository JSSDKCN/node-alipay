'use strict';
var assert = require('assert');
var crypto = require('crypto');


describe('node-alipay crypt module', function () {

  describe('MD5 crypt tools', function() {
    var md5 = require('../lib/crypt/md5');
    it('should encrypt a string with a key', function() {
      var s = 'hello world!';
      var key = crypto.createHash('md5').update('1', 'utf8').digest("hex");
      assert.equal(true, '74dbc1c23ba3388d257089257a620f39' === md5.encrypt(s, key));
    });

    it('should verify a sign with a string and a key', function() {
      var s = 'hello world!';
      var key = crypto.createHash('md5').update('1', 'utf8').digest("hex");
      var sign = '74dbc1c23ba3388d257089257a620f39';
      var signBad = '74dbc1c23ba3388d257089257a620f31';

      assert.equal(true, md5.verify(sign, s, key));
      assert.equal(true, !md5.verify(signBad, s, key));
    });
  });

  describe('RSA crypt tools', function() {
    var rsa = require('../lib/crypt/rsa');
    var privateKey = '-----BEGIN PRIVATE KEY-----\n' +
      'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBALWrEpJroysVW0RZ\n' +
      's1hEzFUpMF9AwQMM9iM69PZEbtwf9IbRwacMZ9S181XiAQMKaUZunQZu0ckW8KBk\n' +
      '6wZXi5H0jGswIkep+STdVaBFe7Q9kU8UWNL+cdtYNzRvrzfmS6ZcJK/cU6VxQuR5\n' +
      '02aq4dB1OSUyRGqu7rfDjHHOYpxDAgMBAAECgYAj/0Ps03s/fDnbb1LEOM2sSj8V\n' +
      'gMU+D4FuNa54ZdL5tzNCy6ltql2gnnUbHW9J5PQ7Sou+zJKxH+SKQ7T2Sr6S1cVY\n' +
      'OxQ17bJYIBryaWOsVc3TagpP9WXvXkiw8Jj8cVuXKOufR//60YZPbI9z6yyLHiuT\n' +
      'xUDobBpEyqYgSjn5sQJBANgh29fqyOdVcVCdGyhbOMR3+pcsxNrocnzH11wbNq4S\n' +
      '790rQ1BkPo7e12H3d0DRI+c+xtS/Qh68trJQjwt7ZrcCQQDXLcNrXqBaoB30Wnno\n' +
      '7HvCZAU0KJXubjqvCfjyGyPonhvuiZrXacR0XfXurhJz35TiYK7b6PRrti9+jA/b\n' +
      '5QrVAkEAxc1/EUXMJoO5GCkgsLeD5bNUgUS0yQ/Rr8eJnr89NOUZ51Vv3sRPyJvD\n' +
      'jOJZntWJQVrfx9deoRjfL6SwtbZzUwJAAKCKhEKXVwxGahLlbg9aYPunpDpGDZbW\n' +
      'pvHxfssjdKcZT72o7N3LC8fGUrbBKQNKzMoZWFy6caHrS4Qe+7YULQJAUwSkgKJg\n' +
      'eYecCH/71ba4559R5ThUY5G9osOVxB0h0uvVgaaUnRE5UtX7fDX2drZurEzvGCwm\n' +
      '+UX2UmMR3uS93w==\n' +
      '-----END PRIVATE KEY-----';

    var publicKey = '-----BEGIN PUBLIC KEY-----\n' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC1qxKSa6MrFVtEWbNYRMxVKTBf\n' +
    'QMEDDPYjOvT2RG7cH/SG0cGnDGfUtfNV4gEDCmlGbp0GbtHJFvCgZOsGV4uR9Ixf\n' +
    'MCJHqfkk3VWgRXu0PZFPFFjS/nHbWDc0b6835kumXCSv3FOlcULkedNmquHQdTkf\n' +
    'MkRqru63w4xxzmKcQwIDAQAB\n' + 
    '-----END PUBLIC KEY-----';
    var s = 'hello world';
    var encS = '569bb9f4b4e0dc166125cae4d22ebe13f0975c89e4b19b1ecfeeab255' +
      '79ec364997dafc19bdeef7b741fde3c4785e66fa81b4bb1afd1b00f8a2dea93dee' +
      '344200cb8747007d4df5040f4ff92c2f7478e931c0841110160a50b0392ccb6daa' +
      '92aac4e4ef1c2132303f6b9158e755bcf7533cdc14bbb544df4e2a54a8a6991e2bf';

    var encSBad = encS + '1';
    it('should encrypt a string with a key', function() {
      console.log(rsa.encrypt(s, privateKey));
      assert.equal(true, encS === rsa.encrypt(s, privateKey));
    });
  });
});
