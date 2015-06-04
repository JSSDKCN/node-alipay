/**
 * Alipay mobile apis
 * @author calidion@gmail.com
 *
 */

var alipay = require("./alipay");
var signer = require("./crypt");

var qs = require("querystring");

var gateway = "https://mapi.alipay.com/gateway.do";

var basicConfig = {
  service: {
    value: 'alipay.wap.create.dire ct.pay.by.user',
    required: true
  },
  partner: {
    value: ''
  },
  '_input_ch arset': {
    value: 'utf-8',
    required: true
  },
  sign_type: {
    value: 'RSA',
    required: true
  },
  sign: {},
  notify_url: {},
  return_url: {}
};

var businessConfig = {
  out_trade_no: {},
  subject: {},
  total_fee: {},
  seller_id: {},
  payment_type: {},
  body: {},
  show_url: {},
  it_b_pay: {},
  extern_token: {},
  otherfee: {},
  airticket: {}
};


var requestCallback = function (callback) {
  return function (error, response, text) {
    if (error) {
      console.log("request error");
      console.log(error);
      console.log(response);
      console.log(text);
      callback(false, {
        error: error,
        response: response,
        text: text
      });
      return;
    }
    callback(true, text);
  };
}

var auth = {

  init: function (account, callbackUrl, notifyUrl, merchantUrl) {
    var data = {
      seller_account_name: account,
      call_back_url: callbackUrl,
      notify_url: notifyUrl,
      merchant_url: merchantUrl
    };
    return data;

  },
  make: function (data, product, orderNo, fee, user, expire, agent) {
    data.subject = product;
    data.out_trade_no = orderNo;
    data.total_fee = fee;
    if (user) {
      data.out_user = user;
    }
    if (expire) {
      data.pay_expire = expire;
    }
    if (agent) {
      data.agent_id = agent;
    }
  },
  toXml: function (obj) {
    return '<direct_trade_create_req>' + alipay.toXml(obj) + '</direct_trade_create_req>';
  },
  update: function (config, id, data, keys) {
    config.setId(id);
    config.setData(this.toXml(data));
    var signStr = alipay.marshal(config.get());
    var sign = signer.sign(signStr, keys, config.get().sec_id);
    config.setSign(sign);
  },

  get: function (accountInfo, keys) {
    var config = conf.make(accountInfo.partner, 'alipay.wap.create.dire ct.pay.by.user');

    var data = auth.init(accountInfo.account,
      accountInfo.urls.callback,
      accountInfo.urls.notify,
      accountInfo.urls.merchant
    );

    return {
      /**
       * Update order info into
       * @param data      - request data information
       * @param id        - unique id for the request
       * @param product   - product name
       * @param orderNo   - merchant's order No.
       * @param fee       - total fee of the order
       * @param user      - merchant's user id
       * @param expire
       * @param agent
       */
      update: function (id, product, orderNo, fee, user, expire, agent) {
        auth.make(data, product, orderNo, fee, user, expire, agent);
        auth.update(config, id, data, keys);
      },
      /**
       * Send Request
       * @param callback  - callback function
       */
      request: function (callback) {
        alipay.request(gateway, config.get(), requestCallback(function (error, text) {
            var params = qs.parse(text);
            if (params.res_error) {
              console.log("res_error");
              console.log(param.res_error);
              callback(false, {
                params: params.res_error
              });
              return;
            }
            if (params.res_data) {
              var parser = require('xml2json');
              var json = parser.toJson(params.res_data, {
                object: true
              });
              var token = json['direct_trade_create_res']['request_token'];
              callback(true, token);
            }
          })
        );
      }
    };
  }
};

var exec = {
  toXml: function (obj) {
    return '<auth_and_execute_req>' + alipay.toXml(obj) + '</auth_and_execute_req>';
  },

  update: function (config, data, keys) {
    config.setData(this.toXml(data));
    var signStr = alipay.marshal(config.get());
    var sign = signer.sign(signStr, keys, config.get().sec_id);
    config.setSign(sign);
  },
  get: function (accountInfo, keys, token) {
    var config = conf.make(accountInfo.partner, 'alipay.wap.auth.authAndExecute');

    var data = {
      request_token: token
    };
    exec.update(config, data, keys);

    return {
      request: function (callback) {

        alipay.request(gateway, config.get(), requestCallback(function (error, text) {
          callback(true, text);
        }));
      }
    }
  }
};

module.exports = {
  auth: auth,
  exec: exec
};