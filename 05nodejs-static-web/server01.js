var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(((req,res) =>{

    //指定消息头
    res.writeHead(200,{'Content-Type':'text/html;charset="utf-8"'});
    var pathName = req.url;
    console.log(pathName);
    /* 默认首页为index.html */
    if(pathName == '/'){ 
        pathName = '/index.html';
    }
     /* 图标文件 */
    if(pathName == '/favicon.ico'){ 
        fs.readFile('./static/img/logo.ico',((e,d)=>{ /* 注意文件读取时异步进行的 */
            if(e){ /* 读取文件失败 */
                console.log(`logo读取失败:${e.toString()}`);
                return false;
            }else{
                res.write(d);
                res.end();
            }
        }))
    }else{
        var prefix = 'static';
        fs.readFile(prefix + pathName,((err,data) => {
            if(err){/* 没有这个文件 */
                console.log('404');
            }else{ /* 存在文件 */
                res.write(data);
                res.end(); /**结束响应 */
            }
        }))
       
    }
   
})).listen(3000);

console.log('Start server @ http://127.0.0.1:3000');