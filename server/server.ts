
import * as express from 'express';
import {Application} from "express";
import {getAllCourses, getCourseById} from "./get-courses.route";
import {searchLessons} from "./lessons.route";
import {saveCourse} from './course.route';
import {getAllUsers, getUserById} from './get-users.route';
import {createUser } from './create-user-route'
import {userInfo} from './user-info.route'
import { createApplicant, getApplicant, getAllApplicant, getApplicantByEmailId } from './mogo-db';

const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwkRsa = require('jwks-rsa');


const app: Application = express();

// its an middleware
const checkIfAuthenticated =jwt({
    secret: jwkRsa.expressJwtSecret({
        cache: true,
        ratelimit: true,
        jwksUri:"https://dev-r7ui0nor.auth0.com/.well-known/jwks.json",

    }),
    algorithms:['RS256']
});

//2nd middleware for erorr handling
app.use((err,req,res, next)=>{
    if(err && err.name === "UnauthorizedError"){
        res.status(err.status).json({message: err.message})
    }
    else{
        next();
    }
});


app.use(bodyParser.json());
//app.use(checkIfAuthenticated);

app.use(function(req, res, next) {
    //res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
   // res.setHeader("Access-Control-Allow-Headers", "Authorization");
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", " Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    //res.header(“Access-Control-Allow-Headers”, “Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization”);
    next();
  });

app.route('/api/courses').get(getAllCourses);

app.route('/api/courses/:id').get(getCourseById);

app.route('/api/lessons').get(searchLessons);

app.route('/api/courses/:id').put(saveCourse);


app.route('/api/users').get(getAllUsers);

app.route('/api/user/:id').get(getUserById);

app.route('/api/signup')
    .post(createUser);

app.route('/api/userinfo')
    .put(userInfo);

app.route('/api/applicant').post(createApplicant);

app.route('/api/applicant/:id').get(getApplicant);
app.route('/api/applicant').get(getAllApplicant);
app.route('/api/applicant/email/:emailid').get(getApplicantByEmailId);




const httpServer = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});



