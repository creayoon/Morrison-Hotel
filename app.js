var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon'); // 서비스를 대표하는 아이콘
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var io = require('socket.io').listen(3030);

var index = require('./routes/index');
var users = require('./routes/users');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// routing
app.use('/', index);
app.use('/users', users);

// socket
io.sockets.on('connect', function(socket) {
	socket.on('call', function(data) {
		console.log(data);
		socket.emit('answer', 'hello php');
	});
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // public폴더에 파비콘 만들어 넣어서 사용

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
