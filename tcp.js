var net = require('net');
var chatServer = net.createServer();

chatServer.on('connection',function(client){
    client.write('Hi! \n');
    client.write('Bye! \n');
    client.end();
})

chatServer.listen(9080);
console.log('Server Start at http://127.0.0.1:9080')