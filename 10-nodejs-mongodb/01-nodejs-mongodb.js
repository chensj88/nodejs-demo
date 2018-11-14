const http = require('http');
const app = require('./model/express-router');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'nodejs';

const client = new MongoClient(url);

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
    //连接数据库
    client.connect(function (err) {
        const db = client.db(dbName);
        const collection = db.collection("nodejs_user");
        collection.insertMany(createUserData('test'),function (err,result) {
            assert.equal(err, null);
            assert.equal(50, result.result.n);
            assert.equal(50, result.ops.length);
            console.log("Inserted 50 documents into the collection");
        });
        client.close();
        res.end('res adds');
    });


});


const createUserData = function(name) {
    var data = [];
    for (var i = 0;i < 50;i++){
        var username = name+i;
        var password = name+"123";
        var age = 20+i;
        var sex = i % 2 == 0 ? "男" :"女";
        var entryDate = new Date();
        var user = {
            username:username,
            password:password,
            age:age,
            sex:sex,
            entryDate:entryDate
        };
        data[i] = user;
    }
    return data;
}