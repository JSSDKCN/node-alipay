var alipay = require("./alipay");
var qs = require("querystring");

module.exports = {
  makeAuth: function (data, product, orderNo, fee, userId) {
    data.subject = product;
    data.out_trade_no = orderNo;
    data.total_fee = fee;
    if (userId) {
      data.out_user = userId;
    }
  },
  updateAuth: function (config, id, data, keys) {
    config.setId(id);
    config.setData(alipay.toXml(data));
    var signStr = alipay.marshal(config.get());
    var sign = alipay.signer.sign(signStr, keys.md5, config.get().sec_id);
    config.setSign(sign);
  }
};