/**
 * @author chensj
 * @title nodejs 连接 mongodb
 * @email chensj@winning.com.cn
 * @package
 * @date: 2018-11-14 8:45
 */

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'nodejs';
// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    // const db = client.db(dbName);
    // const collections = db.collection('user');
    // const userData = createUserData("bbb");
    // collections.insertMany(userData,function (err,result) {
    //     assert.equal(err,null);
    //     assert.equal(50,result.result.n);
    //     assert.equal(50,result.ops.length);
    //     console.log('Inserted 50 user data into the collections');
    // }); //插入数据
    // client.close();
    //升级版
    const db = client.db(dbName);
    const username = "aaa";
    const table = "test_user";
    //数据加载
    // insertDocument(username,table,db,function (err) {
    //     client.close();
    // })

    const content = {age:{$gt:25}}; //查询条件
    queryInterface(content,table,db,function (data) {
        //console.log(data);
        for(var i=0;i<data.length;i++){
            console.log(data[i]);
        }
        client.close();
    })
});
/**
 * 数据查询接口
 * @param content 查询条件
 * @param tableName 文档名称
 * @param db 数据库
 * @param callback 回调函数
 */
const queryInterface = function (content,tableName,db,callback) {
    const collection = db.collection(tableName);
    collection.find(content).toArray(function (err,data) {
        assert.equal(err, null);
        console.log(`${tableName} find by content:${content} for ${data.length} records.`);
        //console.log(data);
        callback(data);
    })
}
/**
 * 插入数据
 * @param username 用户名生成
 * @param table 文档集合名称
 * @param db 数据库连接
 * @param callback 回调函数
 */
const insertDocument = function (username,table,db,callback) {
    const userData = createUserData(username);
    const collection = db.collection(table);
    collection.insertMany(userData, function(err, result) {
        assert.equal(err, null);
        assert.equal(50, result.result.n);
        assert.equal(50, result.ops.length);
        console.log("Inserted 50 documents into the collection");
        callback(result);
    });
}

/**
 * 数据生成
 * @param name  用户名
 * @returns {Array}
 */
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
