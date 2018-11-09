//案例
// 1、检测目录下是否存在某个文件夹
// 2、列出指定目录下所有的文件夹
var fs = require('fs');
//检查是否存在upload文件夹，不存在则创建
// fs.stat('upload',((err,stat) => {
//     if(err){ //没有这个目录
//         console.log(`错误:${err.toString()}`);
//         fs.mkdir('upload',((e) => {  //创建目录
//             if(e){
//                 console.log(`错误:${e.toString()}`);
//             }else{
//                 console.log('创建成功');
//             }
//         }))
//         return false;
//     }else{ //已经存在目录
//         console.log(`${stat.isDirectory()}`);
//         console.log(`目录已经存在`);
//     }
// }))

//2 读取html 文件，找出所有文件及文件夹
//错误写法
// fs.readdir('html',((err,files) =>{
//     if(err){ /* 读取失败*/
//         console.log(err);
//     }else{
//         console.log(files);
//         for(var i=0;i<files.length;i++){ /**循环判断文件是文件夹，还是文件 但是这种方法是错误的写法 fs.stat是异步写法 */
//             fs.stat(files[i],((e,s)=>{
//                 console.log(files[i]);
//             }))
//         }
//     }
// }))


//正确写法
var filesArr = []; //存放文件夹信息的数组
fs.readdir('html',((err,files) =>{
    if(err){ /* 读取失败*/
        console.log(err);
    }else{
        console.log(files);
        //匿名自适应函数
        (function getFile(i){
            if(i==files.length){/*循环结束 */
                console.log(filesArr);  /**打印数据 */
                return false;
            }
            //注意文件目录
            fs.stat('html/'+files[i],((e,s)=>{
                console.log(files[i]); //全部文件包含文件夹和文件
                if(s.isDirectory()){ //目录
                    filesArr.push(files[i]); /**保存数据 */
                }
                //递归调用
                getFile(i+1);
            }))
        })(0)
    }
}))