/**使用事件驱动解决异步加载数据 */
var fs = require('fs');
var events = require('events');
var eventEmitter  = new events.EventEmitter();
function getData(){
    fs.readFile('./mime.json',((err,data) => {
        eventEmitter.emit('loadData',data);
    }))
}
getData();
var data = '';
//监听广播数据
eventEmitter.on('loadData',((data) => {
    console.log(data.toString());
}))
