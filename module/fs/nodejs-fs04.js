//文件写入流
var fs = require('fs');

var data = '我是数据库读取的数据，需要保存到文件中';
//创建写入流，写入数据到output.txt文件中
var writeStream = fs.createWriteStream('output.txt');
//
writeStream.write(data,'utf-8');
//标记写入完成
writeStream.end();
//写入完成
writeStream.on('finish',(() =>{
    console.log('写入完成');
}))
//写入报错
writeStream.on('error',((e) =>{
    console.log(`写入失败:${e.toString()}`);
}))