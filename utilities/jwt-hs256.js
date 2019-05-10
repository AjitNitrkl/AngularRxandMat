var jwt = require('jsonwebtoken');



var secretKey = 'secret-key';

var payload = {
  name: 'Alice'
};


// create a JWT
var newToken = jwt.sign(payload, secretKey, {
    algorithm: 'HS256'
});

console.log("JWT created:", newToken);

var exisitingToken ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxpY2UiLCJpYXQiOjE1NTYwNjc0NDZ9.qDqjKnZEg4iS3SasWlnVlJv0pLfFQeIddetei7VGZ5Y';

const verify = jwt.verify(exisitingToken, secretKey);

console.log("Decoded jwt "+JSON.stringify(verify));