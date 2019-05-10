import {Request, Response} from "express";
import {db} from "./database";
//import * as argon2 from 'argon2';
import {DbUser} from "./db-user";
import {createCsrfToken, createSessionToken}  from './security.util'
import {verifyPassword} from "./create-user-route"



export function login(req: Request, res: Response) {
const credentials = req.body;
const user = db.findUserByEmail(credentials.email);
if (!user) {
        res.sendStatus(403);
    }
    else {
        loginAndBuildResponse(credentials, user, res);
    }
}


async function loginAndBuildResponse(credentials:any, user:DbUser,  res: Response) {
try {
const sessionToken = await attemptLogin(user, credentials.password);

const csrfToken = await createCsrfToken();
console.log("Login successful");
res.cookie("SESSIONID", sessionToken, {httpOnly:true, secure:true});
res.cookie("XSRF-TOKEN", csrfToken);
res.status(200).json({id:user.id, email:user.email, roles: user.roles});
    }
catch(err) {
console.log("Login failed:", err);
res.sendStatus(403);
    }
}
async function attemptLogin(user, password) {
const isPasswordValid = await verifyPassword(user.passwordDigest, password);
if (!isPasswordValid) {
    throw new Error("Password Invalid");
    }
    return createSessionToken(user);
}



export function loginAsUser(req, res) {
    const impersonatedUserEmail = req.body.email;
    const impersonatedUser = db.findUserByEmail(impersonatedUserEmail);
    createSessionToken(impersonatedUser)
            .then(sessionToken => {
    res.cookie("SESSIONID", sessionToken,
                    {httpOnly:true, secure:true});
    res.status(200).json({
                    id:impersonatedUser.id,
                    email: impersonatedUser.email,
                    roles: impersonatedUser.roles
                });
            })
            .catch(err => {
    console.log("Error trying to login as user",err);
    res.sendStatus(500);
                });
    }