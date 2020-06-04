const express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
const app = express();
var db = require('./module/db');
var indexRouter = require('./routes/index');



// this shit is deprecated and costed me an hour to match the bug. fuckkkkk!!! app.use(bodyParser.urlencoded);
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Creating Express session
app.use(session({
  secret: 'barfi',
  resave: true,
  saveUninitialized: true,
  cookie: {
  maxAge : 24*60*60*1000 // 1 day(in ms)
  }
}));
app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
  });
// set up routes
//app.use('/auth', authRoutes);
app.use('/', indexRouter);

app.get('/', function (req, res, next) {
    res.render('index', {user: req.session.user});
  });

app.listen(4000, () => {
    console.log('app now listening for requests on port 4000');
});
