var http = require('http'),
    https = require('https');
    
var protocols = {
  'http': http,
  'http:': http,
  'https': https,
  'https:': https
};

module.exports = function (options, callback) {
  var protocol = protocols[options.protocol || 'http'],
      req;

  req = protocol.request({
    host: options.hostname || options.host,
    port: options.port,
    path: options.path,
    auth: options.auth,
    method: options.method,
    key: options.key,
    cert: options.cert,
    headers: options.headers || (options.body ? { 'content-type': 'application/json' } : {}),
    rejectUnauthorized: options.rejectUnauthorized,
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
      data += chunk.toString('utf8');
    });

    res.on('end', function () {
      var parsed;
      try {
        parsed = JSON.parse(data);
      }
      catch (ex) {
        parsed = data;
      }

      callback(null, res, parsed);
    });
  });

};

module.exports.protocols = protocols;
