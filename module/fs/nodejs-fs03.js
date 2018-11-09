//
var fs = require('fs');

//文件流读取文件文件,适用于大文件
//数据是按照块进行读取的，不是一次性完成读取 
var readStream = fs.createReadStream('t.txt');

var str = ''; //保存数据
var count = 0;// 记录读取次数
//数据读取事件 
readStream.on('data',((chunk) => {
    str += chunk;
    count++;
}));
//数据读取完成事件
readStream.on('end',((chunk) => {
    console.log(str);
    console.log(`读取次数：${count}`);
}));
//数据读取错误事件
readStream.on('error',((error) => {
    console.log(`文件流读取文件失败，失败原因：${error.toString()}`);
}));