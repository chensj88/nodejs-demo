/* 非阻塞IO */
var fs = require('fs');

//非阻塞IO
// console.log(1);
// fs.readFile('./mime.json',((err,data) => {
//     if(err){
//         console.log('json文件不存在');
//         return false;
//     }else{
//         console.log(data.toString());
//         console.log(2);
//     }
// }))

// console.log(3);
/* 下面代码存在问题，异步加载导致 */
// function getData(){
//     fs.readFile('./mime.json',((err,data) => {
//         // console.log(data.toString());
//         return data.toString();
//     }))
// }
// var data = getData(); //异步加载数据，返回值为undefined
// console.log(data); //undefined

