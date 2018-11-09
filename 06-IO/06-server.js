/**
 * 使用nodejs提供事件驱动来解决异步加载数据问题
 */
var http = require('http');
var fs = require('fs');
var url = require('url'); //获取URL
var path = require('path'); //获取后缀名
var events = require('events'); //事件驱动
var mime = require('./model/getMimeFromFileByEvents');

var eventEmitter  = new events.EventEmitter();
http.createServer(((req,res) =>{
    /* 使用URL模块获取具体的类型*/
    var pathName = url.parse(req.url).pathname;
    // console.log(pathName);
    /* 默认首页为index.html */
    if(pathName == '/'){ 
        pathName = '/index.html';
    }
    /* 获取后缀名 */
    var extname = path.extname(pathName);
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
                fs.readFile(prefix + '/404.html',((e1,d1) => {
                    res.writeHead(404,{'Content-Type':'text/html;charset="utf-8"'});
                    res.write(d1);
                    res.end();
                }));
            }else{ /* 存在文件 */
                /* 根据文件后缀名来设置消息头 */
                /* 使用nodejs提供的事件驱动来获取数据 */
                mime.getMime(fs,eventEmitter,extname);
                eventEmitter.on('load_data',function(mimeType){
                    res.writeHead(200,{'Content-Type':''+mimeType+';charset="utf-8"'});
                    //res.write(data); 存在异步问题，与end()存在问题
                    res.end(data); /**结束响应 */
                })
              
            }
        }))  
    }
})).listen(3000);

console.log('Start server @ http://127.0.0.1:3000');