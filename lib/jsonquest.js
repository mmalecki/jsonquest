var protocols = {
  'http': require('http'),
  'https': require('https')
};

module.exports = function (options, callback) {
  var protocol = protocols[options.protocol || 'http'],
      req;

  req = protocol.request({
    host: options.host,
    port: options.port,
    path: options.path,
    method: options.method,
    headers: options.headers || (options.body ? { 'content-type': 'application/json' } : {}),
    agent: false
  });

  if (options.body) {
    req.write(JSON.stringify(options.body));
  }
  req.end();

  req.on('error', callback);

  req.on('response', function (res) {
    var data = '';

    res.on('data', function (chunk) {
      data += chunk;
    });

    res.on('end', function () {
      try {
        data = JSON.parse(data);
      }
      catch (ex) {
        return callback(ex);
      }

      callback(null, res, data);
    });
  });

};

module.exports.protocols = protocols;
