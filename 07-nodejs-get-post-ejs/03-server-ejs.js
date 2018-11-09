var http = require('http');
var url = require('url');
var ejs = require('ejs');

//路由：指的是针对不同的请求URL，处理不同的业务逻辑
http.createServer(((req,res) =>{

    var pathName = url.parse(req.url).pathname; /* 获取请求路径 */
    res.writeHead(200,{'Content-Type':'text/html;charset="utf-8"'});
    /*路由*/
    if(pathName == '/login'){
        var data = '你好，我是后台获取的数据';
        var list = ['1111','2222','3333','4444','5555'];
        /*使用ejs模板引擎*/
        ejs.renderFile('views/login.ejs',{
            msg:data,
            list:list
        },function(err,data){
            res.end(data);
        });
    } else {
        res.end('register');
    }
    
})).listen(8000);

console.log('Static Server Start At http://127.0.0.1:8000');