var createError = require('http-errors');
var express = require('express'); // Importerar Express
var cors = require('cors'); // Importerar CORS
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var surfspotsRouter = require('./routes/surfspots');

var app = express(); // Skapar Express-applikationen
app.use(cors()); // Aktiverar CORS efter att app har skapats

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const mongoose = require('mongoose');
// Anslut till MongoDB Atlas
mongoose.connect('mongodb+srv://josefinesoderholm:Josefine1234@cluster0.sfg8q.mongodb.net/surfDB?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('Kopplingen till MongoDB lyckades!'))
    .catch(err => console.error('Kunde inte ansluta till MongoDB:', err));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/surfspots', surfspotsRouter);

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
