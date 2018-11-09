var G = {};
var app = function (req,res) {
    console.log('app'+req);
    if(G['login']){
        G['login'](res,req); //执行注册方法
    }
}

//定义一个get方法
app.get = function (string,callback) {
    G[string] = callback;
}


var  http = require('http');

//只要有请求，就会触发app这个方法
http.createServer(app).listen(8080);

app.get('login',function (req,res) {
    console.log('login');
})

app.get('register',function (req,res) {
    console.log('register');
})