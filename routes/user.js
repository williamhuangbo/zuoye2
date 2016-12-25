/**
 * Created by 15366 on 2016/12/25.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
//注册
router.get('/signup',function(req,res){
    res.render('signup',{title:'用户注册',error: req.session.error,success: req.session.success});
});
router.post('/signup',function(req,res){
    var userCur = req.body;
    var users= JSON.parse(fs.readFileSync('./users.json','utf8'));
    if(userCur.username && userCur.password){
        var user = users.find(function (item){
            return item.username == userCur.username ;
        });
        if(user){
            req.session.error = '用户名已存在';
            res.redirect('/user/signup');
        }else{
            users.push(userCur);
            fs.writeFileSync('./users.json',JSON.stringify(users));
            res.redirect('/user/signin');
        }
    }else{
        req.session.error = '用户名或者密码不能为空';
        res.redirect('/user/signup');
    }
});
//登录
router.get('/signin',function(req,res){
    res.render('signin',{title:'用户登录',error: req.session.error,success: req.session.success});
});
router.post('/signin',function(req,res){
    var userCur = req.body;
    var users= JSON.parse(fs.readFileSync('./users.json','utf8'));
    var user = users.find(function(item){
        return userCur.username == item.username && userCur.password == item.password;
    });
    if(user){
        req.session.success = '登录成功';
        req.session.username = user.username;
        res.redirect('/user/welcome');
    }else{
        req.session.error = '用户登录失败';
        res.redirect('/user/signin');
    }
});
//欢迎页
router.get('/welcome',function(req,res){
    res.render('welcome',{title:'欢迎页',username:req.session.username,success:req.session.success});
});
module.exports = router;