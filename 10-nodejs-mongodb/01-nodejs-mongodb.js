const http = require('http');
const app = require('./model/express-router');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/nodejs';
const assert = require('assert');
/**
 * 1、配置依赖 cnpm install mongodb --save
 * 2、引入MongoClient 和创建数据库url
 *  const mongoClient = require('mongodb').$MongoClient;
 *  const url = 'mongodb://localhost:27017';
 *  const dbName = 'nodejs';
 *  const client = new MongoClient(url);
 * 3、连接数据库
 * client.connect(function (err) {
 * })
 * 4、GUID数据
 * client.connect(function(err) {
 *   const db = client.db(dbName);
 *   const username = "aaa";
 *   const table = "test_user";
 *   const collection = db.collection(table);
 *   collection.insertOne({"username":"demo",age:25},function(err,result){
 *
 *   })
 *   client.close();
 * })
 *
 */


http.createServer(app).listen(3000);

app.get('/login',function (req,res) {
    console.log('login');
    res.end('res login');
})
//增加数据
app.get('/add',function (req,res) {
    console.log('add');
    MongoClient.connect(url,{useNewUrlParser:true},function (err,client) {
        const db = client.db("nodejs");
        if(err){
            console.log(err);
            console.log("数据库连接失败");
        }else{
            db.collection('user').insertOne(
                {
                    name:"zhangsan",
                    age:25,
                    password:"zhangsan123"
                },function(er){
                    if(er){
                        console.log('增加数据失败');
                    }else{
                        console.log('增加数据成功');
                    }
                });
        }
        client.close();
    })
    res.end('res adds');
})

app.get('/find',function (req,res) {
    console.log('find');
    MongoClient.connect(url,{useNewUrlParser:true},function (err,client) {
        const db = client.db("nodejs");
        if(err){
            console.log(err);
            console.log("数据库连接失败");
        }else{
            var data = db.collection('user').find();
            data.forEach(iterateFunc, errorFunc);
        }
        client.close();
    })

})

function iterateFunc(doc) {
    console.log(JSON.stringify(doc, null, 4));
}

function errorFunc(error) {
    console.log(error);
}