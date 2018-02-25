/* (2-1)  */
var express = require('express') //
var app = express()

/* (2-2)  */
app.get('/', function(req, res){
     res.send('Hello World')
})

app.get('/login', function(req, res){
res.send('please login')
})
// static page
// 폴더 putlic
// http://localhoist:3000/static
app.use('/static', express.static(__dirname + '/public'));

/* (2-3)  */
app.listen(3000, function(){
     console.log("Connected 3000 port!")
})
