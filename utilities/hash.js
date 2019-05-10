var crypto = require('crypto');

var password = '123456789';

var aliceSalt = 1;

var bobSalt = 2;



// we will use another hash other SHA-256 during the course, this is just for demo purposes
var hash = crypto.createHash('sha256').update(password).digest('hex');

console.log("The result of hashing " + password + " is:\n\n" + hash + "\n\n");