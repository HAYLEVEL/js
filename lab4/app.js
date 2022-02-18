var createError = require('http-errors');
var path = require('path');
var logger = require('morgan');

const mustache = require('mustache-express');

var usersRouter = require('./routes/users');
var gamesRouter = require('./routes/games');
var mediaRouter = require('./routes/media');
var developerRouter = require('./routes/developers');

const mongoose = require('mongoose');
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

//
app.use(fileUpload(
  {
    useTempFiles: true
  }
));
//
const viewDir = path.join(__dirname, 'views');

mongoose.set('useFindAndModify', false);

// view engine setup
app.engine('mst', mustache(path.join(viewDir, "partials")));

app.set('views', viewDir);
app.set('view engine', 'mst');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/games', gamesRouter);
app.use('/media', mediaRouter);
app.use('/developers', developerRouter);
//
app.get('/', (req, res) => 
{
  res.render('index');
})
//
app.get('/about', (req, res) =>
{
  res.render('about');
})
//catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8080);
/*, () =>
{
}
);*/


module.exports = app;
