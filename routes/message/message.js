var express = require('express');
var mysql = require('mysql');
const { response, report } = require('../../app');
const { user } = require('./../../private/mysql');
var mysqlData = require('./../../private/mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let addMessageError = false;
  let logged = false;
  let username = "";

  if('addMessageFailed' in req.query)
  {
    addMessageError = true;
  }
  //check if user is logged
  if(req.session.username)
  {
    //user is logged
    //check if login is ok
    username = req.session.username;
    logged = true;

    //load the message

    let messages = [];
    let sql = "SELECT * FROM message"; //to optimize
    let allMessage = [];
    let users = [];
    var conn = mysql.createConnection(mysqlData);
    conn.connect();
    conn.query(sql, (err, response, fields)=>{
      
      if(err)
      {
        res.render('internalError');
        res.end();
      }
      else
      {
        for(let i = 0; i < response.length; i++)
        {
          let obj = {
            id         : response[i].id,
            text       : response[i].message,
            username   : response[i].username,
            like       : response[i].iLike,
            dislike    : response[i].dislike,
            reports    : response[i].reports
          };
          messages.push(obj);
        }
        //we have allMessage that is full
        //we have to search all the username
        //we'll load anather sql query

        res.render('message', {logged:logged, username:username, addMessageError: addMessageError, messages:messages});
        res.end();

      }
    })

    
  }
  else
    res.redirect('/messageLoginError');
});



module.exports = router;
