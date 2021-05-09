var express = require('express');
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
    res.render('message', {logged:logged, username:username});
    res.end();
  }
  else
    res.render('message', {logged:logged, username:username});
});

module.exports = router;
