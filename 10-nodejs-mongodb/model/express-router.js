
var url = require('url');
var fs = require('fs');
//暴露的模块
var server = function () {
    var G = this; //定义一个对象用来封装路由， key是url，value是回调函数
    //处理get/post请求
    this._get = {};
    this._post = {};

    var app = function (req,res) {
        //获取路由
        var pathName = url.parse(req.url).pathname;
        //获取请求方式
        var methodType = req.method.toLocaleLowerCase();
        //处理路由
        if(!pathName.endsWith('/')){
            pathName = pathName+'/';
        }
        console.log(pathName);
        if(G['_'+methodType][pathName]){
            if(methodType == 'post'){ //post方法
                var postData = '';
                req.on('data',function(chunk){
                    postData += chunk;
                });
                req.on('end',function(){
                    console.log(postData);
                    req.body = postData;
                    G['_'+methodType][pathName](req,res);
                });
            }else{ //get方法
                //执行注册方法
                G['_'+methodType][pathName](req,res);
                var query = url.parse(req.url,true).query;
                var username = query.username;
                var password = query.password;
                // res.write('<p>username:'+username+'</p>');
                // res.write('<p>password:'+password+'</p>')
                res.end('获取 get 数据');
            }
            //执行注册方法
        }else{
            res.writeHead(200,{'Content-Type':'text/html;charset="utf-8"'});
            res.end('路由不存在');
        }
    };
    app.get = function (url,callback) {
        //处理注册的方法
        if(!url.endsWith('/')){
            url = url+'/';
        }
        if(!url.startsWith('/')){
            url = '/'+url;
        }
        console.log(`注册GET方法：${url}`);
        G._get[url] = callback;
    }
    app.post = function (url,callback) {
        //处理注册的方法
        if(!url.endsWith('/')){
            url = url+'/';
        }
        if(!url.startsWith('/')){
            url = '/'+url;
        }
        console.log(`注册POST方法：${url}`);
        G._post[url] = callback;
    }
    return app;
}

module.exports = server();