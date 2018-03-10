
// 셋업 부분 - 해당 프로젝트에 사용될 npm
var express  = require('express');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app      = express();
var port     = process.env.PORT || 8080;

var passport = require('passport');
var flash    = require('connect-flash');
// passport 사용에 필요한 부분 따로 정리 대신 이곳에서 사용됨
require('./config/passport')(passport);



app.use(morgan('dev')); // 모든 요청이 콘솔에 명시됨
app.use(cookieParser()); // 쿠키사용 (사용자 필요)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');


app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } ));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



require('./routes/route.js')(app, passport);


app.listen(port);
console.log('server on port' + port);
