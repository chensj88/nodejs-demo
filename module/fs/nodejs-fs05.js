//管道流
var fs = require('fs');
//文件流读取文件文件,适用于大文件
var readStream = fs.createReadStream('t.txt');
//创建写入流，写入数据到output.txt文件中
var writeStream = fs.createWriteStream('output.txt');
//管道流写入
readStream.pipe(writeStream);