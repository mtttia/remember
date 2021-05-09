const { resolveInclude } = require('ejs');
const mysql = require('mysql');
const { user } = require('./../../private/mysql');
const mysqlData = require('./../../private/mysql');



function checkLogin(username, password)
{
    var login = new Promise((resolve) => {
        //connect with database
    var conn = mysql.createConnection(mysqlData);
    conn.connect();
    let sql = "SELECT * FROM user WHERE username='" + username + "' AND password='" + password + "'";
    console.log(sql);
    conn.query(sql, (err, response, fields)=>{
        
          
        if(response == null || response.length == 0 || err)
        {
          resolve(false)
        }
        else{
          resolve(true)
        }
        
        
    });
  });
  return login;
}


module.exports = checkLogin;