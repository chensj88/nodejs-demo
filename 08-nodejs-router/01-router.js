var http = require('http');
var url = require('url');
var ejs = require('ejs');
var fs = require('fs');
var model = require('./model/model');


// model['login']('a','b');
//路由：指的是针对不同的请求URL，处理不同的业务逻辑
http.createServer(((req,res) =>{
    var pathName = url.parse(req.url).pathname.replace('/','');
    console.log(pathName);
    if(pathName != 'favicon.ico'){ /*过滤图标*/
        try {
            model[pathName](req,res);
        }catch (e) {
            model['home'](req,res);
        }

        res.end(pathName);
    }

})).listen(8000);

console.log('Static Server Start At http://127.0.0.1:8000');