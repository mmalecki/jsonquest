var http = require('http'),
    assert = require('assert'),
    cb = require('assert-called'),
    jsonquest = require('../');
var querystring = require('querystring');

var server = http.createServer(cb(function (req, res) {
  var data = '';

  assert.equal(req.method, 'PUT');
  assert.equal(req.url, '/hello');
  assert.equal(req.headers['content-type'], 'application/json');
  assert.equal(req.headers.authorization, 'Basic dXNlcjpwYXNz');

  req.on('data', function (chunk) {
    data += chunk.toString('utf8');
  });

  req.on('end', function () {
    assert.deepEqual(JSON.parse(data), { hello: 'world', witaj: 'świecie' });

    res.writeHead(201, { 'content-type': 'application/json' });
    res.write(JSON.stringify({ world: 'hello', świecie: 'witaj' }));
    res.end();
  });
})).listen(9999, cb(function () {
  jsonquest({
    host: 'localhost',
    port: 9999,
    path: '/hello',
    body: { hello: 'world', witaj: 'świecie' },
    method: 'PUT',
    protocol: 'http',
    auth: 'user:pass'
  }, cb(function (err, res, body) {
    assert.equal(res.statusCode, 201);
    assert.deepEqual(body, { world: 'hello', świecie: 'witaj' });
    assert.equal(res.headers['content-type'], 'application/json');

    server.close();
  }));
}));

var server3 = http.createServer(cb(function (req, res) {
  var data = '';

  assert.equal(req.method, 'PUT');
  assert.equal(req.url, '/hello');
  assert.equal(req.headers['content-type'], 'application/json');
  assert.equal(req.headers.authorization, 'Basic dXNlcjpwYXNz');

  req.on('data', function (chunk) {
    data += chunk.toString('utf8');
  });

  req.on('end', function () {
    assert.deepEqual(JSON.parse(data), { hello: 'world', witaj: 'świecie' });

    res.writeHead(201, { 'content-type': 'application/json' });
    res.write('This is a string');
    res.end();
  });
})).listen(9997, cb(function () {
  jsonquest({
    host: 'localhost',
    port: 9997,
    path: '/hello',
    body: { hello: 'world', witaj: 'świecie' },
    method: 'PUT',
    protocol: 'http',
    auth: 'user:pass'
  }, cb(function (err, res, body) {
    assert(err);
    server3.close();
  }));
}));

var server4 = http.createServer(cb(function (req, res) {
  var data = '';

  assert.equal(req.method, 'PUT');
  assert.equal(req.url, '/hello');
  assert.equal(req.headers['content-type'], 'application/x-www-form-urlencoded');
  assert.equal(req.headers.authorization, 'Basic dXNlcjpwYXNz');

  req.on('data', function (chunk) {
    data += chunk.toString('utf8');
  });

  req.on('end', function () {
    assert.deepEqual(querystring.parse(data), { hello: 'world', witaj: 'świecie' });

    res.writeHead(201, { 'content-type': 'application/json' });
    res.write(JSON.stringify({ world: 'hello', świecie: 'witaj' }));
    res.end();
  });
})).listen(9996, cb(function () {
  jsonquest({
    host: 'localhost',
    port: 9996,
    path: '/hello',
    body: { hello: 'world', witaj: 'świecie' },
    method: 'PUT',
    protocol: 'http',
    auth: 'user:pass',
    requestEncoding: 'queryString'
  }, cb(function (err, res, body) {
    assert.equal(res.statusCode, 201);
    assert.deepEqual(body, { world: 'hello', świecie: 'witaj' });
    assert.equal(res.headers['content-type'], 'application/json');
    server4.close();
  }));
}));

