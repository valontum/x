const express = require('express');
const router = express.Router();
var db=require('../../dbconnection');


var randomstring = require("randomstring");








var Task={
 
    getQuestionById:function(id,callback){
     
        return db.query("Select * from questions where question_id=?",[id],callback);
     
    }
}










router.get('/getquestion', (req, res, next) => {



if(req.query !== {}){

    question_id = req.query.chapter+""+req.query.lesson+""+req.query.question;
    
    console.log(question_id);

    Task.getQuestionById(question_id,function(err,rows){
     
    if(err)
      {
        res.json(err);
      }
      else{
        res.json(rows);
      }
      });
     }
     else{
     
        res.status(404).send('Not found');
     }



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
