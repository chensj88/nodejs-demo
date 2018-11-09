//==============================事件驱动示例开始====================================
//引入events 模块
var events = require('events');
//创建 EventEmitter 对象
var eventEmitter = new events.EventEmitter();
//创建事件处理程序
var connectHandler = function connected(){
    console.log("连接成功");
    //触发 data_received 事件
    eventEmitter.emit('data_received');
}
//绑定connection 事件的处理程序
eventEmitter.on('connection',connectHandler);
//使用匿名函数处理data_received事件
eventEmitter.on('data_received',function(){
    console.log("data_received事件处理结束");
})
//触发connection事件
eventEmitter.emit("connection");

console.log("程序执行完成");
//==============================事件驱动示例结束====================================

