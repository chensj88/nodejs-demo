/**使用events模块处理异步
 * 主要利用事件驱动来实现异步加载数据的获取
 */
var fs = require('fs');
var events = require('events');

console.log(events);
//创建事件广播
var eventEmitter = new events.EventEmitter();

//广播和接受广播
//接收广播
eventEmitter.on('to_parent',function(data){
    console.log('接收到这个广播');
    console.log(`接收到的数据:${data}`);
})

setTimeout(function(){
    console.log('开始广播了');
    //广播to_parent事件
    eventEmitter.emit('to_parent','发送数据'); 
},2000);