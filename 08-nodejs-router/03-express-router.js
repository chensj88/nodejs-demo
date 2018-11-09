var url = require('url');
var G = {};
var app = function (req,res) {
    var pathName = url.parse(req.url).pathname;
    if(!pathName.endsWith('/')){
        pathName = pathName+'/';
    }
    if(!pathName.startsWith('/')){
        pathName = '/'+pathName;
    }
    if(G[pathName]){
        G[pathName](req,res); //执行注册方法
    }else{
        res.writeHead(200,{'Content-Type':'text/html;charset="utf-8"'});
        res.end('路由不存在');
    }
}

//定义一个get方法
app.get = function (string,callback) {
    //处理注册的方法
    if(!string.endsWith('/')){
        string = string+'/';
    }
    if(!string.startsWith('/')){
        string = '/'+string;
    }
    console.log(`注册方法：${string}`);
    G[string] = callback;
}

var  http = require('http');

//只要有请求，就会触发app这个方法
http.createServer(app).listen(8080);

app.get('login',function (req,res) {
    console.log('login');
    res.end('res login');
})

app.get('register',function (req,res) {
    console.log('register');
    res.end('res register');
})