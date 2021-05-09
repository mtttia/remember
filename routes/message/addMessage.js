var express = require('express');
var mysql = require('mysql');
const { response } = require('../../app');
var mysqlData = require('./../../private/mysql');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  let text;
  let username;
  if('text' in req.body)
  {
    //POST REQUEST WITH text
    text = req.body.text;
    if('username' in req.session)
    {
        username = req.session.username;
        let sql = "INSERT INTO message (username, message, iLike, dislike, reports) VALUES ('" + username +"', '" + text +"', '0', '0', '0')";
        let conn = mysql.createConnection(mysqlData);
        conn.query(sql, (err, response, fields)=>{
            if(err)
            {
                error(res);
            }
            else{
                //redirect to /message
                res.redirect('/message');
                res.end();
            }
        })
    }
    else
    {
        error(res);
    }
    //insert into database


  }
  else{
      error(res);
  }
});

function error(res)
{
    res.redirect('/message/?addMessageFailed');
    res.end();
}

module.exports = router;
