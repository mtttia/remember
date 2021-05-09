var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login/login');
var checkLoginRouter = require('./routes/login/checkLogin');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register/register');
var checkRegisterRouter = require('./routes/register/checkRegister');
var messageRoute = require('./routes/message/message');
var messageLoginErrorRouter = require('./routes/message/messageLoginError');
var addMessageRoute = require('./routes/message/addMessage');
var myMessageRoute = require('./routes/message/myMessage');
var removeMessageRoute = require('./routes/message/removeMessage');
var profileRouter = require('./routes/profile/profile');

var app = express();

app.use(session({
  secret: 'my-super-extra-mega-secret-so-super-that-you-cant-know-me',
  resave:true,
  saveUninitialized:true,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/login/checkLogin', checkLoginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/register/checkRegister', checkRegisterRouter);
app.use('/message', messageRoute);
app.use('/message/addMessage', addMessageRoute);
app.use('/message/myMessage', myMessageRoute);
app.use('/message/removeMessage', removeMessageRoute);
app.use('/messageLoginError', messageLoginErrorRouter);
app.use('/profile', profileRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
