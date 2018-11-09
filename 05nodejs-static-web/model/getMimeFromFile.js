//根据后缀名获取消息头，从文件中获取,注意异步问题
module.exports.getMime = function(fs,extname){ 
    fs.readFile('./mime.json',((err,data) => {
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