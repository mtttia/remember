var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let username = "";
  let password = "";
  let failed = false;
  if('loginFailed' in req.query)
    failed = true;
  if('name' in req.cookies)
    username = req.cookies.name;
  console.log('username : ' + username + ', password : ' + password);
  res.render('login', {username : username, password: password, failed : failed});
});

module.exports = router;
