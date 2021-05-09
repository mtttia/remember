var express = require('express');
var mysql = require('mysql');
var mysqlData = require('./../../private/mysql')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.username && req.query.messageId)
  {
    let sql = "SELECT * FROM message WHERE username='" + req.session.username + "'";
    var conn = mysql.createConnection(mysqlData);
    conn.connect();
    conn.query(sql, (err, response, field)=>{
        if(err)
        {
          console.log(err);
          error(res)
        }
        else{
            //check if this user can delete this message
            let check = false;
            for(let i = 0; i < response.length; i++)
            {
                if(response[i].id == req.query.messageId)
                {
                    check = true;
                }
            }
            if(check == false)
            {
              error(res);
            }
            else{
                //I can remove the message
                sql = "DELETE FROM message WHERE id = '" + req.query.messageId + "'";
                conn.query(sql, (err1)=>{
                  if(err1)
                  {
                    error(res);
                  }
                  else
                  {
                    res.redirect('/profile');
                    res.end();
                  }
                })
                
            }
        }
    })
  }
  else
  {
    error(res);
  }
  
});

function error(res) {
  res.redirect('/profile/?cannotRemove');
  res.end();
}

module.exports = router;
