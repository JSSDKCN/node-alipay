// 'use strict';
// var assert = require('assert');
// var crypto = require('crypto');
// var alipay = require('../index');
//
//
// describe('node-alipay mobile v3', function () {
//
//   var config = require('./fixtures/config');
//   var _ = require('lodash');
//
//   describe('v3', function() {
//     it('should be able to send a request', function (done) {
//       var data = _.clone(config.alipay.config);
//       data.out_trade_no = '20150529142335-EJTG';
//       data.subject = '田一块小卖店的订单';
//       data.total_fee = '25.80';
//       data.body = "没有什么可以更多的了";
//       data.show_url = '';
//       data.it_b_pay = '90m';
//       data.extern_token = '';
//       data.otherfee = '';
//       data.airticket = '';
//       var marshaled = alipay.marshal(data);
//
//       var rsa = alipay.v3.rsa;
//       rsa.init(config.alipay.pems);
//
//       var str = rsa.encrypt(marshaled);
//       data.sign = str;
//       data.sign_type = 'RSA';
//
//       alipay.request('https://mapi.alipay.com/gateway.do',
//         data, function (error, response, text) {
//           console.log('returne');
//           if (error) {
//             console.log(error);
//           }
//           var Iconv = require('iconv').Iconv;
//           var iconv = new Iconv('GBK', 'UTF-8//TRANSLIT//IGNORE');
//           console.log(iconv.convert(text).toString());
//           done();
//         });
//     });
//
//   });
// });
