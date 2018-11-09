/**使用回调函数解决异步加载数据 */
var fs = require('fs');

function getData(callback){
    fs.readFile('./mime.json',((err,data) => {
        // console.log(data.toString());
        //return data.toString();
        callback(data); //回调函数解决异步加载的问题
    }))
}
var data = getData(function(data){
    console.log(data.toString());
    return data.toString();
}); //异步加载数据，返回值为undefined
