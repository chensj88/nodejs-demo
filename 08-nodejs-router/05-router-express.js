const http = require('http');
const app = require('./model/http-express-router');
const ejs = require('ejs');

/*创建服务*/
http.createServer(app).listen(3000);

/*注册方法*/
app.get('/login',function (req,res) {

    console.log('login');
    /*使用ejs模板引擎*/
    ejs.renderFile('views/form.ejs',{},function (err,data) {
        res.send(data);
    })
});

app.get('/register',function (req,res) {
    console.log('register');
    res.send('register');
});

app.post('/dologin',function (req,res) {
    console.log('/dologin');
    var result = req.body;
    ejs.renderFile('views/index.ejs',{msg:result},function (err,data) {
        res.send(data);
    });
})