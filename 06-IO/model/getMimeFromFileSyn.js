//根据后缀名获取消息头，从文件中获取,采用同步方法
//下面代码采用同步方法读取数据，由异步到同步
module.exports.getMime = function(fs,extname){ 
    fs.readFileSync('./mime.json',((err,data) => { /* 改成同步方法 */
        if(err){
            console.log('json文件不存在');
            return false;
        }else{
            /* console.log(data.toString()); */
            var MimeTypes = JSON.parse(data.toString());
            console.log(MimeTypes[extname]);
            return MimeTypes[extname] || 'text/html';
        }
    }))
}