/**
 * 路由文件
 */
var fs = require('fs');
var url = require('url'); //获取URL
var path = require('path'); //获取后缀名
var events = require('events'); //事件驱动
var eventEmitter  = new events.EventEmitter();
//获取文件类型mime私有方法
function getMime(extname,callback){ 
    fs.readFile('./mime.json',((err,data) => {
        if(err){
            console.log('json文件不存在');
            return false;
        }else{
            var MimeTypes = JSON.parse(data.toString());
            var result = MimeTypes[extname] || 'text/html';
            callback(result);
        }
    }))
}
/**
 * req Request
 * res Response
 * staticPath 静态资源的放置的主文件
 */
exports.statics = function(req,res,staticPath){
     var pathName = url.parse(req.url).pathname; //获取URL的值
     if(pathName == '/'){   /* 默认首页为index.html */
         pathName = '/index.html';
     }
     /* 获取后缀名 */
     var extname = path.extname(pathName);
      
     if(pathName != '/favicon.ico'){ /* 过滤图标文件 */
         fs.readFile(staticPath + pathName,((err,data) => {
             if(err){/* 没有这个文件 */
                 fs.readFile(staticPath + '/404.html',((e1,d1) => {
                     res.writeHead(404,{'Content-Type':'text/html;charset="utf-8"'});
                     res.write(d1);
                     res.end();
                 }));
             }else{ 
                 getMime(extname,function(mime){
                    res.writeHead(200,{'Content-Type':''+mime+';charset="utf-8"'});
                    res.write(data);
                    res.end(); /**结束响应 */
                 });
             }
         }))  
     }
}