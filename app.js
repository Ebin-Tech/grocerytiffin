var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');
mongoose.connect('mongodb+srv://ebin:test123@cluster0.e6emc.mongodb.net/TiffinApp?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
},(err)=>{console.log("connected to database")})
var indexRouter = require('./routes/index');
var registerRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/user');
var logoutRouter = require('./routes/logout');
const cors = require('cors');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  credentials:true,
  origin:['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200'],
  optionSuccessStatus:200
  
}))
app.use('/', indexRouter);
app.use('/signup', registerRouter);
app.use('/login', loginRouter);
app.use('/user',usersRouter);
app.use('/logout',logoutRouter);

app.get('*', (req, res, next)=>{
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

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
