var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 载入路由
var index = require('./routes/index');
var data = require('./routes/data');

// 监听端口
var port = process.env.PORT || 3000

var app = new express()
app.set('views', path.resolve(__dirname, '../views'))
app.set('view engine', 'html')
app.set('view catch', false)
app.engine('html', require('ejs').renderFile)

app.use(logger('dev'));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/', data);
app.use('/', index);

app.listen(port)
console.log('Server started on ' + port)

module.exports = app;
