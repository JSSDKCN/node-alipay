var assert = require('assert');
var validator = function(config, keys) {
  for (var k in keys) {
    assert(config[k]);
  }
};

module.exports = validator;