var express = require('express');
var crypto = require('crypto');
var mysql = require('mysql');
var mysqlData = require('./../../private/mysql'); //mysql data object, is private
var router = express.Router();

var conn = mysql.createConnection(mysqlData);

conn.connect();

/* GET home page. */
router.post('/', function(req, res, next) {
  try{
      //check that login is correct then redirect to index
    //if not redirect to login
    let username = req.body.username;
    let password = req.body.password;
    let checkPassword = req.body.password;
    let makeCookie = req.body.keep_in;
    if(password != checkPassword)
    {
        registerFailed(res);
    }
    //crypt the password
    password = cryptWithSHA(password);

    //connect with database
    var conn = mysql.createConnection(mysqlData);
    conn.connect();
    let sql = "INSERT INTO user (username, password) VALUES ('"+ username +"', '" + password +"')"
    console.log(sql);
    conn.query(sql, (err, response, fields)=>{
        
            
        if(err)
        {
            registerFailed(res, makeCookie);
        }
        else{
            //I've got a response
            //i'm logged as user
            //set il cookie
            if(makeCookie)
            {
                res.cookie('name', username);
                res.cookie('passwd', password);
            }
            res.redirect('/');
        }
        
        
    })
  }catch(ex)
  {
    req.redirect('/register/?registerFailed');
  }

})

function registerFailed(res)
{
    //redirect to login
    res.clearCookie('name');
    res.clearCookie('passwd');
    res.redirect('/login/?registerFailed');
}

function cryptWithSHA(code){
  var crypto = require('crypto');

  let hash = crypto.createHash('sha512').update(code).digest('hex');

  return hash;
}

module.exports = router;
