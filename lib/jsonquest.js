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
    auth: options.auth,
    method: options.method,
    key: options.key,
    cert: options.cert,
    ciphers: 'AES128-GCM-SHA256:RC4:HIGH:!MD5:!aNULL:!EDH',
    secureProtocol: 'TLSv1_method',
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
        return callback(new Error('Invalid json'));
      }

      var err = parsed.err || parsed.error;
      if (err) return callback(new Error(err));
      
      callback(null, res, parsed);
    });
  });

};

module.exports.protocols = protocols;
