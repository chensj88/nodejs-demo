//根据后缀名获取消息头
module.exports.getMime = function(extname){ 
    switch(extname){
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'text/javascript';
        default:
            return 'text/html'; 
    }
}