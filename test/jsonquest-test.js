var http = require('http'),
    assert = require('assert'),
    cb = require('assert-called'),
    jsonquest = require('../');

var server = http.createServer(cb(function (req, res) {
  var data = '';

  assert.equal(req.method, 'PUT');
  assert.equal(req.url, '/hello');
  assert.equal(req.headers['content-type'], 'application/json');

  req.on('data', function (chunk) {
    data += chunk;
  });

  req.on('end', function () {
    assert.deepEqual(JSON.parse(data), { hello: 'world' });

    res.writeHead(201, { 'content-type': 'application/json' });
    res.write(JSON.stringify({ world: 'hello' }));
    res.end();
  });
})).listen(9999, cb(function () {
  jsonquest({
    host: 'localhost',
    port: 9999,
    path: '/hello',
    body: { hello: 'world' },
    method: 'PUT',
    protocol: 'http'
  }, cb(function (err, res, body) {
    assert.equal(res.statusCode, 201);
    assert.deepEqual(body, { world: 'hello' });
    assert.equal(res.headers['content-type'], 'application/json');

    server.close();
  }));
}));
