var http = require('http');
var config = require('./config'); //自定义模块

http.createServer(function (req,res) {
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    res.write(req.url);
    res.write(config.str);
    res.write('1+2='+tools.add(1,2));
    res.end();
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080');