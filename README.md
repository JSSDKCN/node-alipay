node-alipay
===========

alipay apis for node

crypt supported:
md5, rsa(not tested)

sub module support list:
mobile wap


```javascript
var alipay = require("node-alipay");
var keys = require('./keys');
var baseUrl = "";
var partner = "";
var account = "";                        //seller_account_name

var product = "鞋子";                    //subject
var id = '1010';                        //req_id
var orderNo = "183828282822";           //out_trade_no
var fee = 0.01;                         //total_fee
var user_id = 1;                        //user_id

var data = {
  partner: partner,
  account: account,
  urls: {
    callback: baseUrl + '/alipay/callback',
    notify: baseUrl + '/alipay/notify',
    merchant: baseUrl + '/alipay/merchant'
  }
};

var auth = alipay.mobile.auth.get(data, keys);

auth.update(id, product, orderNo, fee, user_id);
auth.request(function (error, token) {
  var exec = alipay.mobile.exec.get(data, keys, token);
  exec.request(function (error, data) {
    console.log(data);
  });
});
```

keys file format:

```javascript
var privateKey = "";

var publicKey = "";

var aliPublicKey = "";

var md5Key = "";

module.exports = {
  rsa: {
    private: privateKey,
    public: publicKey
  },
  md5: md5Key,
  aliKey: aliPublicKey
}

```
