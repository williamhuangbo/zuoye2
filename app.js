/**
 * Created by 15366 on 2016/12/25.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
app.use(session({
    resave : true,//每次请求的时候都会重新保存session
    saveUninitialized : true,//不管用不用session 都进行初始化
    secret : 'happy',//加密cookie
}));
app.set('view engine', 'html');
app.set('views', path.resolve('views'));
app.engine('html',require('ejs').__express);
app.use(express.static(path.resolve('public')));
var user = require('./routes/user');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/user', user);
app.listen(8080,function () {
    console.log('server is success,listing on 8080 port!!!')
});