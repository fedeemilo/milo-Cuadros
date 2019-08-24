require('dotenv').config();

const createError         = require('http-errors');
const express             = require('express');
const engine              = require('ejs-mate');
const path                = require('path');
const cookieParser        = require('cookie-parser');
const logger              = require('morgan');
const bodyParser          = require('body-parser');
const mongoose            = require('mongoose');
const methodOverride      = require('method-override');

const indexRouter         = require('./routes/index');
const cuadros             = require('./routes/cuadros');

const app = express();

//connect to database
mongoose.connect('mongodb://localhost:27017/milo-cuadros', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we\'re flying!');
});


// ejs template layout
app.engine('ejs', engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// setup public assets directory
app.use(express.static('public'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/cuadros', cuadros);

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
