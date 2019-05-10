var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var productsRouter = require('./routes/productRouter');
var categoryRouter = require('./routes/categoryRouter');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//set up db connection 
const url = 'mongodb://localhost:27017/proj'
const connect = mongoose.connect(url);
connect.then((db)=>{
  console.log('connected correctly to the DB server');
},(err)=>console.log(err));//log the error if it exists



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products',productsRouter);
app.use('/categories',categoryRouter);
const port = 3000;
app.listen(port,()=>{
  console.log('Server Started at port: '+port);
});
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
