var jsonquest = require('../');

jsonquest({
  host: 'localhost',
  port: 9999,
  path: '/hello',
  body: { hello: 'world' },
  method: 'PUT',
  protocol: 'http'
}, function (err, res, body) {
  console.log('/hello responded with ' + res.statusCode);
  console.dir(body);
});
