var express = require('express');
const session = require('express-session');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //clear the coockie, the session and rediret to home
  req.session.destroy();
  res.clearCookie('name');
  res.clearCookie('passswd');
  res.redirect('/');
});

module.exports = router;
