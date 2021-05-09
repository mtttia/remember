var express = require('express');
var router = express.Router();

/*

ERROR CODE
0 - password and checkpassword not the same
1 - username is already in use
2 - ignote error
3 - password empty

*/
const ERROR = ['the two password where different', 'this username is not avaiable', 'registration error', 'password can\'t be empty'];

/* GET home page. */
router.get('/', function(req, res, next) {
  let error = false;  
  let registrationError = ERROR[2];
  if('registerFailed' in req.query)
  {
    error = true;
    //check the registration error
    if('errorCode' in req.query)
    {      
      if(req.query.errorCode >= 0 && req.query.errorCode < 3)
        registrationError = ERROR[req.query.errorCode];
    }
  }
  
  console.log(error);
  res.render('register', {failed:error, errorString:registrationError});
});

module.exports = router;
