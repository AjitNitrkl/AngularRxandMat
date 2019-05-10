import moment = require("moment");
const util = require('util');
const crypto = require('crypto');
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";
import { DbUser } from "./db-user";



export const randomBytes = util.promisify(crypto.randomBytes);
//we dont want to waith jwt which is a sync function
//util.promisifyconverts a regular function into an async function, i.e. a function that returns a promise
//Promisified functions can be used with await and async to help avoid messy promise chains and introduce a cleaner, saner, way to do asynchronous programming.
export const signJwt = util.promisify(jwt.sign);
const RSA_PRIVATE_KEY = fs.readFileSync('./utilities/private.key');
const RSA_PUBLIC_KEY = fs.readFileSync('./utilities/public.key');
const SESSION_DURATION = 1000;

export  async function createSessionToken(user:DbUser) {
//jwt.sign
return signJwt({}, RSA_PRIVATE_KEY, {
    algorithm: 'RS256',
    expiresIn: 240,
    subject: user.id.toString()
});
}
export async function decodeJwt(token:string) {
const payload = await jwt.verify(token, RSA_PUBLIC_KEY);
console.log("decoded JWT payload", payload);
return payload;
}


export async function createCsrfToken() {
return await randomBytes(32).then(bytes => bytes.toString("hex"));
}