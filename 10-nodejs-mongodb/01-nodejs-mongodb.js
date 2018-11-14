const http = require('http');
const ejs = require('ejs');
const url = require('url');
const querystring = require('querystring');
const app = require('./model/express-router');
const MongoClient = require('mongodb').MongoClient;

const dbUrl = 'mongodb://localhost:27017';

const dbName = 'nodejs';

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


/*首页*/
app.get('/', function (req, res) {
    var data = "这是Nodejs + Ejs 项目首页";
    ejs.renderFile('views/index.ejs', {msg: data}, function (err, data) {
        res.send(data);
    })
})
/*登录*/
app.get('/login', function (req, res) {
    ejs.renderFile('views/form.ejs', {}, function (err, data) {
        res.send(data);
    })
})
/*注册*/
app.get('/register', function (req, res) {
    ejs.renderFile('views/register.ejs', {}, function (err, data) {
        res.send(data);
    })
});
/*登录结果*/
app.post('/dologin', function (req, res) {
    var data = req.body;
    data = decodeURI(data);
    var dataObject = querystring.parse(data);
    console.log(dataObject);
    ejs.renderFile('views/index.ejs', {msg: data}, function (err, data) {
        res.send(data);
    })
});
/*注册结果*/
app.post('/doregister', function (req, res) {
    var data = req.body;
    data = decodeURI(data);
    var dataObject = querystring.parse(data);
    console.log(dataObject);
    ejs.renderFile('views/index.ejs', {msg: data}, function (err, data) {
        res.send(data);
    })
});
//增加数据
app.get('/add', function (req, res) {
    console.log('add');
    //连接数据库
    MongoClient.connect(dbUrl, function (err, client) {
        if (err) {
            console.log('数据库连接失败');
            return;
        }
        const db = client.db(dbName);
        insertObject("test-de", "nodejs_user", db, function (result) {
            assert.equal(50, result.result.n);
            assert.equal(50, result.ops.length);
            client.close();
            res.send('数据新增成功');
        });

    });


});
/*修改数据*/
app.get('/edit', function (req, res) {
    MongoClient.connect(dbUrl, function (err, client) {
        const db = client.db(dbName);
        if (err) {
            console.log('数据库连接失败。。。。');
            return;
        }
        updateOneObjdct({username: "test7"}, {$set: {age: 32}}, "nodejs_user", db, function (result) {
            assert.equal(1, result.result.ok)
            client.close();
            res.send('数据修改成功');
        });

    });
});
/*删除数据*/
app.get('/delete', function (req, res) {
    var query = url.parse(req.url, true).query;
    var username = query.username;
    var content = {username: username};
    MongoClient.connect(dbUrl, function (err, client) {
        if (err) {
            console.log('数据库连接失败。。。。');
            return;
        }
        const db = client.db(dbName);
        deleteOneObejct(content, "nodejs_user", db, function (result) {
            assert.equal(1, result.result.ok);
            assert.equal(1, result.result.n);
            client.close();
            res.send('数据删除成功');
        });

    });
});
/*查询数据库*/
app.get('/find', function (req, res) {
    MongoClient.connect(dbUrl, function (err, client) {
        if (err) {
            console.log('数据库连接失败。。。。');
            return;
        }
        const db = client.db(dbName);
        selectObjectList({}, "nodejs_user", db, function (result) {
            console.log(result);
            ejs.renderFile('views/list.ejs', {usrList: result}, function (e, data) {
                if (e) {
                    console.log('模板渲染失败');
                } else {
                    client.close();
                    res.send(data);
                }
            })
        });
    });
});

const deleteOneObejct = function (content, table, db, callback) {
    const collection = db.collection(table);
    collection.deleteOne(content, function (err, result) {
        if (err) {
            console.log('删除数据失败');
        } else {
            callback(result);
        }
    })
}
const updateOneObjdct = function (content1, content2, table, db, callback) {
    const collection = db.collection(table);
    collection.updateOne(content1, content2, function (err, result) {
        if (err) {
            console.log('修改数据失败');
        } else {
            callback(result);
        }
    })
};
const selectObjectList = function (content, table, db, callback) {
    const collections = db.collection(table);
    collections.find(content).toArray(function (err, dataList) {
        if (err) {
            console.log("数据查询失败");
        } else {
            callback(dataList);
        }
    });
}
const insertObject = function (username, table, db, callback) {
    const collection = db.collection(table);
    collection.insertMany(createUserData(username), function (err, result) {
        assert.equal(err, null);
        console.log("Inserted 50 documents into the collection");
        callback(result);
    });
}
const createUserData = function (name) {
    var data = [];
    for (var i = 0; i < 50; i++) {
        var username = name + i;
        var password = name + "123";
        var age = 20 + i;
        var sex = i % 2 == 0 ? "男" : "女";
        var entryDate = new Date();
        var user = {
            username: username,
            password: password,
            age: age,
            sex: sex,
            entryDate: entryDate
        };
        data[i] = user;
    }
    return data;
}