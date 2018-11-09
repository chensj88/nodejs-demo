var http = require('http');
var url = require('url');

//路由：指的是针对不同的请求URL，处理不同的业务逻辑
http.createServer(((req,res) =>{
    var pathName = url.parse(req.url).pathname; /* 获取请求路径 */
    //路由转换 硬编码模式
    if(pathName == '/login'){
        res.end('login');
    }else if(pathName =='/admin'){
        res.end('admin');
    }else if(pathName =='/register'){
        res.end('register');
    }else if(pathName =='/order'){
        res.end('order');
    }else{
        res.end('index');
    }
    
})).listen(8000);

console.log('Static Server Start At http://127.0.0.1:8000');