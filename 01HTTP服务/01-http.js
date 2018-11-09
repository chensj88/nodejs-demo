
var http = require('http');
var url = require('url');
/**
 * 创建服务器
 */
http.createServer(function (req,res) {

    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    res.write("Hello world<br>");
    res.write("你好，Nodejs!");
    res.end();
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080');

