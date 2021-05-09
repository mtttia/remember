var express = require('express');
var crypto = require('crypto');
var mysql = require('mysql');
var mysqlData = require('./../../private/mysql'); //mysql data object, is private
const { user } = require('./../../private/mysql');
var router = express.Router();


/*

ERROR CODE
0 - password and checkpassword not the same
1 - username is already in use
2 - ignote error
3 - password empty

*/
/* GET home page. */
router.post('/', function(req, res, next) {
  try{
      //check that login is correct then redirect to index
    //if not redirect to login
    let username = req.body.username;
    let password = req.body.password;
    let checkPassword = req.body.checkPassword;
    let makeCookie = req.body.keep_in;

    if(password == ""){
      registerFailed(res, 3);
    }

    if(password != checkPassword)
    {
      registerFailed(res, 0);
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
          registerFailed(res, 1);
        }
        else{
            //I've got a response
            //i'm logged as user
            //set il cookie
            //init the session
            req.session.username = username;
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
    registerFailed(res, 2);
  }

})

function registerFailed(res, errorCode)
{
    //redirect to login
    res.clearCookie('name');
    res.clearCookie('passwd');
    res.redirect('/register/?registerFailed&errorCode=' + errorCode);
    res.end();
}

function cryptWithSHA(code){
  var crypto = require('crypto');

  let hash = crypto.createHash('sha512').update(code).digest('hex');

  return hash;
}

module.exports = router;
