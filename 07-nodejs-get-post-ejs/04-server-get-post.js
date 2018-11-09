var http = require('http');
var url = require('url');
var ejs = require('ejs');
var fs = require('fs');

//路由：指的是针对不同的请求URL，处理不同的业务逻辑
http.createServer(((req,res) =>{

    var pathName = url.parse(req.url).pathname; /* 获取请求路径 */
    res.writeHead(200,{'Content-Type':'text/html;charset="utf-8"'});
  //  console.log(req);
    var methodType = req.method;
    console.log(methodType);
    if(pathName == '/login'){ //显示登录页面
        ejs.renderFile('views/form.ejs',{},((err,data)=>{
            res.end(data);
        }));
    } else if(pathName == '/dologin'){ /*get/post方法取值*/
        console.log(`方法类型：${methodType}`);
        /*处理get请求*/
        if(methodType == 'GET'){
            var query = url.parse(req.url,true).query;
            var username = query.username;
            var password = query.password;
            res.write('<p>username:'+username+'</p>');
            res.write('<p>password:'+password+'</p>')
            res.end('dologin get');
        }else{ /*处理post请求*/
            var postData = '';
            req.on('data',function(chunk){
                postData += chunk;
            });
            req.on('end',function(){
                console.log(postData);
                fs.appendFile('login.txt',postData+'\n',function(err){
                    if(err){
                        console.log(`日志书写失败${err.toString()}`);
                    }else{
                        console.log(`登录日志记录成功`);
                    }
                });
                res.end('dologin post');
            });

        }

    } else {
        var data = "这是注册页面，也是注册的路由";
        ejs.renderFile('views/index.ejs',{msg:data},((err,data)=>{
            res.end(data);
        }));
    }
    
})).listen(8000);

console.log('Static Server Start At http://127.0.0.1:8000');