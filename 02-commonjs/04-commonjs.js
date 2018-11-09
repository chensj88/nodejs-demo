var nav = require('nav');
//上述文件在直接找，是找不到的，但是在文件夹下面使用npm init -yes 生成package.json，这样就可以找到文件
//使用npm init -yes  进入目录执行上述命令，定义入口等信息
//nav 在根目录不存在，去node_modules中，找到nav文件夹，在文件夹下面找到package.json
// 找到入口文件 "main": "nav.js"

console.log(nav);
