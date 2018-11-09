/**
 * 静态文件托管服务器
 * 主要通过路由来实现
 */
var http = require('http');
//引入路由文件
var router = require('./model/router');

http.createServer(((req,res) =>{

    router.statics(req,res,'static');
    
})).listen(8000);

console.log('Static Server Start At http://127.0.0.1:8000');