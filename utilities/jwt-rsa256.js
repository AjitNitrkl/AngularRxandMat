var jwt = require('jsonwebtoken');
var fs = require('fs');


var privateKey = fs.readFileSync('./utilities/private.key');
var publicKey = fs.readFileSync('./utilities/public.key');

var payload = {
  name: 'Alice'
};


var token = jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: 120,
    subject: "1"
});


console.log('RSA 256 JWT', token);

var exisitingToken ='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxpY2UiLCJpYXQiOjE1NTYwNzM3MjQsImV4cCI6MTU1NjA3Mzg0NCwic3ViIjoiMSJ9.nfoELJlmy82MVTFdXhBDGxOw02_D6CZsjEih6nOoLQhQUBmUITxw1SHblU8p3lkAvzElvpJc6kpf3p6lqKkQvus4f_m-aJA-oNqGqX3N1stR1a3tRzHJYIxmU5Yms7WRZJIcXFZwvEb5gVwj2TmjFfkfTJyKnDWpAJs7rt-5WIFO9xybDrr-1x_UeBa7gzscewsT6oMb7MNgRJtLJ9ixPy4VN43fNMhG-ccDPZGCzmseM3boaUxv1sI9Eq_cFMd-xw-gNvxZYQ4TwZ6GsYlJikl19ifGYXWpowJeJCZQbBae6V3qdHQJxddYpEysEmDIQ7S2zcfUvfBjTwMCwZLR7A';

const verify = jwt.verify(exisitingToken, publicKey);

console.log("Decoded jwt "+JSON.stringify(verify));