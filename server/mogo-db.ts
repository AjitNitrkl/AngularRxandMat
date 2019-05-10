import {Request, Response} from "express";

export function createApplicant(req: Request, res: Response) {

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    var applicantObj =  req.body;

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("aop");
        //var myobj = { name: "Company Inc", address: "Highway 37" };
        dbo.collection("customers").insertOne(applicantObj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
      res.sendStatus(200);

}


export function getApplicant(req: Request, res: Response){

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    const applicantId = req.params["id"];

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("aop");
        dbo.collection("customers").findOne({"id":applicantId}, function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          res.send(result);
        });
      });

}


export function getApplicantByEmailId(req: Request, res: Response){

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/";
  const emailId = req.params["emailid"];
  console.log("Email is",emailId);

  MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("aop");
      dbo.collection("customers").findOne({"email":emailId}, function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        res.send(result);
      });
    });

}

export function getAllApplicant(req: Request, res: Response){

    var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("aop");
  dbo.collection("customers").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
    res.send(result);
  });
});
}
