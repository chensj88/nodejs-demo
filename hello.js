// 使用http 模块
var http = require('http');
//创建服务，并监听8124端口
http.createServer(function(request,response){
    var url = request.url;
    response.writeHead('200',{'Content-Type':'text/palin'});
    response.write(url+'\n');
    response.end('Hello World\n');
}).listen(8124);

console.log('Node Server Start At http://127.0.0.1:8124');