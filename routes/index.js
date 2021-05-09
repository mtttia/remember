var express = require('express');
var checkCookie = require('./login/checkCoockie')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let logged = false;
  let username = "";
  //check if user is logged
  if(req.session.username)
  {
    //user is logged
    //check if login is ok
    username = req.session.username;
    logged = true;
    res.render('index', {logged:logged, username:username});
    res.end();
  }
  else if(req.cookies.name && req.cookies.passwd)
  {
    //login with cookie
    checkCookie(req.cookies.name, req.cookies.passwd).then((value)=>{
      if(value)
      {
        //use the login with cookie
        req.session.username = req.cookies.name;
        logged = true;
        res.render('index', {logged:logged, username:req.cookies.name});
        res.end();
      }
      else
      {
        res.render('index', {logged:logged, username:username});
        res.end();
      }
    })
  }
  else
  {
    
    res.render('index', {logged:logged, username:username});
    res.end();
  }
    
});

module.exports = router;
