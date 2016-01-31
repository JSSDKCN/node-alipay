#  [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

node-alipay
===========
  
> alipay apis for node


## Install

```sh
$ npm install --save node-alipay
```


## Support
=======

crypt supported:
md5, rsa(not tested)

sub module support list:
mobile wap


## Key Generation


Private keygen:

windows/linux:

```bash
genrsa -out rsa_private_key.pem 4096
```

mac:

```bash
openssl genrsa -out rsa_private_key.pem 4096
```

Public keygen:

windows/linux:

```bash
 rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem
```

mac
```bash
openssl rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem
```

## Usage


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

## License

MIT © []()


[npm-image]: https://badge.fury.io/js/node-alipay.svg
[npm-url]: https://npmjs.org/package/node-alipay
[travis-image]: https://travis-ci.org/JSSDKCN/node-alipay.svg?branch=master
[travis-url]: https://travis-ci.org/JSSDKCN/node-alipay
[daviddm-image]: https://david-dm.org/JSSDKCN/node-alipay.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/JSSDKCN/node-alipay
