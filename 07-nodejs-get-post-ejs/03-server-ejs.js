var http = require('http');
var url = require('url');
var ejs = require('ejs');

//路由：指的是针对不同的请求URL，处理不同的业务逻辑
http.createServer(((req,res) =>{
    var pathName = url.parse(req.url).pathname; /* 获取请求路径 */
    if(pathName == '/login'){
        //res.end('login');
        ejs.renderFile();
    } else {
        res.end('register');
    }
    
})).listen(8000);

console.log('Static Server Start At http://127.0.0.1:8000');