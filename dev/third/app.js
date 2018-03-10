const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const router = require('./routes/route.js');
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
　
app.use(expressLayouts);
app.use(router);
　
app.listen(3000);
