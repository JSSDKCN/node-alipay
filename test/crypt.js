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
});
