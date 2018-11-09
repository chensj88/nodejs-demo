//node js fs 模块
//模块fs的基本操作方法
// fs.stat  检测文件是否存在，文件或文件夹
// fs.mkdir  创建文件夹
// fs.writeFile() 写入文件
// fs.appendFile() 追加文件
// fs.readFile 读取文件  path,options,callback
// fs.readdir 读取文件夹
// fs.rename 重命名 剪切文件
// fs.rmdir  删除文件夹 只能删除目录
// fs.unlink 删除文件 只能删除文件

// fa.stat  检测文件是否存在，文件或文件夹
var fs = require('fs');
/*
//检测文件
fs.stat('demo.js',(err,status) =>{
    if(err){
        console.log(err.toString());
    }else{
        console.log(status);
        console.log(`文件：${status.isFile()}`);
        console.log(`目录：${status.isDirectory()}`);
    }
})
//检测文件夹
fs.stat('html',(err,status) =>{
    if(err){
        console.log(err.toString());
    }else{
        console.log(status);
        console.log(`文件：${status.isFile()}`);
        console.log(`目录：${status.isDirectory()}`);
    }
})

//fs.mkdir  创建文件夹
// path,mode,callback  目录路径，目录权限，回调函数

fs.mkdir('css',(err) =>{
     if(err){
         console.log(`文件夹创建失败，错误原因：${err}`);
         return false;
     }else{
         console.log('创建成功');
     }
})


//fs.writeFile() 写入文件
// path 文件路径
// data  数据
// options 参数
// encoding 编码
// mode 目录权限
// flag 默认值w
//callback 回调函数

fs.writeFile('t.txt','Nodejs FileSystem write file','utf-8',(err => {
    if(err){
        console.log(`文件写入失败，错误原因：${err}`);
    }else{
        console.log('文件写入成功');
    }
}));

fs.appendFile('t.txt','\t这是追加的内容\t',(err => {
    if(err){
        console.log(`追加内容写入失败，错误原因：${err}`);
    }else{
        console.log('追加内容写入成功');
    }
}))

// fs.readFile 读取文件  path,options,callback

fs.readFile('t.txt','utf-8',((err,data) => {
    if(err){
        console.log(`文件内容读取失败，错误原因：${err}`);
        return false;
    }else{
        console.log(`文件内容是:${data.toString()}`);
    }
}));

//fs.readdir 读取文件夹
fs.readdir('html',(err,data) =>{
    if(err){
        console.log(`读取文件夹失败，错误原因：${err}`);
        return false;
    }else{
        console.log(`读取文件夹内容是:${data.toString()}`);
    }
});*/

//fs.rename 重命名 剪切文件
//重命名
// fs.rename('html/b.html','html/new.html',((err) =>{
//     if(err){
//         console.log(`重命名文件失败，错误原因：${err}`);
//         return false;
//     }else{
//         console.log(`重命名文件成功`);
//     }
// }));
//剪切文件
// fs.rename('html/new.html','html/demo/new.html',((err) =>{
//     if(err){
//         console.log(`剪切文件失败，错误原因：${err}`);
//         return false;
//     }else{
//         console.log(`剪切文件成功`);
//     }
// }));

//fs.rmdir  删除文件夹 只能删除目录
// fs.rmdir('de', ((err) => {
//     if (err) {
//         console.log(`删除文件夹失败，错误原因：${err}`);
//         return false;
//     } else {
//         console.log(`删除文件夹成功`);
//     }
// }))

//fs.unlink 删除文件 只能删除文件
fs.unlink('t',((err) => {
    if (err) {
        console.log(`删除文件失败，错误原因：${err}`);
        return false;
    } else {
        console.log(`删除文件成功`);
    }
}))