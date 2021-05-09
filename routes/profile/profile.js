const { response } = require('express');
var express = require('express');
var mysql = require('mysql');
const { user } = require('./../../private/mysql');
var mysqlData = require('./../../private/mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let logged = false;
  let username = "";
  //check if user is logged
  if(req.session.username)
  {
    var conn = mysql.createConnection(mysqlData);
    conn.connect();
    username = req.session.username;
    logged = true;
    if(req.query.username && req.query.username != req.session.username)
    {
        //it asked for a user that is not us
        let usernameAnsked = req.query.username;
        let sql = "SELECT * FROM message WHERE username='" + usernameAnsked +"'";
        conn.query(sql, (err, response)=>{
            if(err)
            {
                error(res);
            }
            else
            {
                let messages = [];
                for(let i = 0; i < response.length; i++)
                {
                    messages.push({
                
                        id         : response[i].id,
                        text       : response[i].message,
                        username   : response[i].username,
                        like       : response[i].iLike,
                        dislike    : response[i].dislike,
                        reports    : response[i].reports
                        
                    });
                }

                res.render('profile', {logged:logged, username:username, usernameAnsked:usernameAnsked, messages:messages});
            }
        })
    }
    else{
        //he want his profile
        
        let sql = "SELECT * FROM message WHERE username='" + username + "'";
        //catch just his message
        conn.query(sql, (err, response)=>{
            if(err)
            {
                error(res);
            }
            let messages = [];
            for(let i = 0; i < response.length; i++)
            {
                messages.push({
                
                    id         : response[i].id,
                    text       : response[i].message,
                    username   : response[i].username,
                    like       : response[i].iLike,
                    dislike    : response[i].dislike,
                    reports    : response[i].reports
                    
                });
            }
            
            res.render('profile', {logged:logged, username:username, usernameAnsked:username, messages:messages});
            res.end();
        })
        
    }
    
  }
  else
    res.render('index', {logged:logged, username:username});
});

function error(res)
{
    res.redirect('/');
}

module.exports = router;
