var http = require('http');
var url = require('url');
var fs = require('fs');
/**
 * 创建服务器
 */
http.createServer(function (req,res) {
    //console.log(req.url);
    var path = req.url; //获取浏览器获取的URL
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    if(path == '/favicon.ico'){ //图标ico信息
        fs.readFile('logo.ico',function(error,data){
            if(error){
                console.log(error);
            }else{
                res.write(data);
                res.end();
            }
        })
    }else if(path !== '/favicon.ico'){
        //转换url
        var result = url.parse(path,true);//第一个参数为地址，第二个参数true表示将get传值转换为对象
        console.log(result);
        console.log(result.query.aid);
        console.log(result.query.cid);
        var pathname = result.pathname;//访问路径
        var query = result.query; //get方法访问参数
        // res.write(pathname);
        // res.write(query);
        res.end();
    }
  
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080');

//cnpm install -g supervisor 改代码自动重启
