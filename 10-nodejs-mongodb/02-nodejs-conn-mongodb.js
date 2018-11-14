/**
 * @author chensj
 * @title nodejs 连接MongoDB
 * @email chensj@winning.com.cn
 * @package
 * @date: 2018-11-14 10:46
 */
const http = require('http');
const ejs = require('ejs');
const MongoClient = require('mongodb').MongoClient;
//导入querystring模块（解析post请求数据）
var querystring = require('querystring');
const app = require('./model/express-router');

const dbUrl = "mongodb://localhost:21017";
const dbName = "nodejs";

const client = new MongoClient(dbUrl);

http.createServer(app).listen(3000);


app.get('/',function (req,res) {
    var data = "这是Nodejs + Ejs 项目首页";
    ejs.renderFile('views/index.ejs',{msg:data},function (err,data) {
        res.send(data);
    })
})

app.get('/login',function (req,res) {
    ejs.renderFile('views/form.ejs',{},function (err,data) {
        res.send(data);
    })
})

app.get('/register',function (req,res) {
    ejs.renderFile('views/register.ejs',{},function (err,data) {
        res.send(data);
    })
})



app.post('/dologin',function (req,res) {
    var data = req.body;
    data = decodeURI(data);
    var dataObject = querystring.parse(data);
    console.log(dataObject);
    ejs.renderFile('views/index.ejs',{msg:data},function (err,data) {
        res.send(data);
    })
})

app.post('/doregister',function (req,res) {
    var data = req.body;
    data = decodeURI(data);
    var dataObject = querystring.parse(data);
    console.log(dataObject);
    ejs.renderFile('views/index.ejs',{msg:data},function (err,data) {
        res.send(data);
    })
})
