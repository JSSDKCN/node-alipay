module.exports = {
  make: function (data, product, orderNo, fee, userId) {
    data.subject = product;
    data.out_trade_no = orderNo;
    data.total_fee = fee;
    if (userId) {
      data.out_user = userId;
    }
  }
};