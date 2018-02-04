const express = require('express');
const router = express.Router();
var fs = require('file-system');
var MongoClient = require('mongodb').MongoClient , assert = require('assert');
var randomstring = require("randomstring");
const http = require('http');
// Connection URL
var url = 'mongodb://fin:leavemealone@ds121726.mlab.com:21726/finpredict';

var mongodb;


MongoClient.connect(url, {
        poolSize: 10
        // other options can go here
    },function(err, db) {
        //assert.equal(null, err); to fix it later
        mongodb=db;

    }
)




var auth = function(req, res, next) {







    var token = req.get("authorization");
    console.log(token+"--"+global.session.user);
    if(token=='' || token==null)
    {
        res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");
        // If the user cancels the dialog, or enters the password wrong too many times,
        // show the Access Restricted error message.
        return res.status(401).send("Authorization Required");

    }else
    {

        if(global.session.user==token)
        {
            next();
        }else
        {
            return res.status(401).send("Authorization Required");
        }
    }


};













router.post('/authenticate', (req, res, next) => {


    let formData = req.body;

    var query = {email: formData.email};

    mongodb.collection("users").find(query).toArray(function (err, result) {
        if (err) throw err;

        if (result.length == 0) {
            res.json({status: 2});


        } else {
            if (result[0].password == formData.password) {
                var token = randomstring.generate();

                var myobj = {session: token , id: result[0].id};

                mongodb.collection("sessions").insertOne(myobj, function (err, res) {
                    if (err) throw err;

                });
                global.session.user = token;
                global.session.name = result[0].name;

                res.json({
                    status: 3,
                    user: {id: result[0].id, name: result[0].name, email: formData.email, token: token}
                });

                console.log("login "+ global.session.user);




            } else {

                res.json({status: 1});
            }
        }


    });

});



router.get('/churninfo',auth, (req, res, next) => {






mongodb.collection("churnprediction").find({userid : 12345678},{_id: 0,userid : 0}).toArray(function (err, result) {
    if (err) throw err;



    res.json(result);

});


});


router.get('/readerchurninfo',auth, (req, res, next) => {






    mongodb.collection("readerchurn").find({userid : 12345678},{_id: 0,userid : 0}).toArray(function (err, result) {
        if (err) throw err;
    
    
    
        
        res.json(result);
    
    });
    
    
});


router.get('/transactionslist',auth, (req, res, next) => {






    mongodb.collection("transactions").find({userid : 12345678},{_id: 0,userid : 0}).toArray(function (err, result) {
        if (err) throw err;
    
    
    
        
        res.json(result);
    
    });
    
    
});



router.get('/overdueinfo',auth, (req, res, next) => {






    mongodb.collection("overdueprediction").find({userid : 12345678},{_id: 0,userid : 0}).toArray(function (err, result) {
    if (err) throw err;



    res.json(result);

});


});


router.get('/baddebtinfo', auth, (req, res, next) => {






    mongodb.collection("baddebt").find({userid : 12345678},{_id: 0,userid : 0}).toArray(function (err, result) {
    if (err) throw err;



    res.json(result);

});


});





router.get('/nlpanalyse', auth, (req, res, next) => {



  
    


    http.get('http://ec2-18-194-232-155.eu-central-1.compute.amazonaws.com:1234/api/stat?polarity='+req.query.polarity+'&query='+req.query.query+'&page=1', (resp) => {
        let data = '';
       
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });
       
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          
            res.json(data);
        });
       
      }).on("error", (err) => {
      
        console.log("Error: " + err.message);
      
      });
      
      


    


});






// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users


module.exports = router;
