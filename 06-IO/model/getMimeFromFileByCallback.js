//使用回调函数来解决异步加载问题
module.exports.getMime = function(fs,extname,callback){ 
    fs.readFile('./mime.json',((err,data) => {
        if(err){
            console.log('json文件不存在');
            return false;
        }else{
            /* console.log(data.toString()); */
            var MimeTypes = JSON.parse(data.toString());
            console.log(MimeTypes[extname]);
            var result = MimeTypes[extname] || 'text/html';
            callback(result);

        }
    }))
}