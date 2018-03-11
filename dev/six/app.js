
//project setup
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

const morgan = require('morgan');
const port     = process.env.PORT || 3000;

//config 정의

require('./config/dbManager');


//express application 정의
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); // 뷰 엔진 ejs

app.use(morgan('dev')) // 모든 요청 로그 콘솔에 정의
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'ambc@!vsmkv#!&*!#EDNAnsv#!$()_*#@',
    resave: false,
    saveUninitialized: true
}));


//라우터
require('./routers/route.js')(app);
//시작
app.listen(port);
console.log('using port : ' + port);
