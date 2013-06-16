# jsonquest [![Build Status](https://secure.travis-ci.org/mmalecki/jsonquest.png)](http://travis-ci.org/mmalecki/jsonquest)
A simple HTTP(S) client for JSON APIs.

## Installation
```sh
npm install jsonquest
```

## Usage
```js
var jsonquest = require('jsonquest');

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
```
