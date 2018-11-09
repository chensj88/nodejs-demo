//使用 npm i silly-datetime --save 安装包

//2.引入模块
var sd = require('silly-datetime');
var da = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
console.log(da);
var d = sd.fromNow(+new Date() - 2000);
console.log(d);