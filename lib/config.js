module.exports = {
  make: function(partner, service, sec_id) {
    var config = {
      service: service,
      format: 'xml',
      v: '2.0',
      partner: partner,
      sec_id: sec_id || 'MD5'
    };
    return {
      get: function() {
        return config;
      },
      setId: function(id) {
        config.req_id = id;
      },
      setSign: function(sign) {
        config.sign = sign;
      },
      setData: function(data) {
        config.req_data = data;
      }
    }
  }
};