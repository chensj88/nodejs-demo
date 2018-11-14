const url = require('url');
const fs = require('fs');
/**
 * 封装方法，在response中增加send方法，
 * 消除乱码问题
 * @param res
 */
function changeResponseHeader(res){
    res.send = function (data) {
        res.writeHead(200,{'Content-Type':'text/html;charset="utf-8"'});
        res.end(data);
    }
}

/**
 * 封装模块，用来暴露出来使用
 */
const server = function () {

    const G = this;
    /*定义get/post方法存放地址*/
    this._post = {};
    this._get = {};
    const app = function (req, res) {
        /*修改res*/
        changeResponseHeader(res);
        //获取路由
        var reqUrl = url.parse(req.url).pathname;
        //获取请求方式
        var method = req.method.toLowerCase();
        //路由url 处理
        if (!reqUrl.endsWith('/')) {
            reqUrl = reqUrl + '/';
        }
        console.log(`当前请求路径${reqUrl},请求的方法${method}`);
        if (G['_' + method][reqUrl]) {  /*判断上述路由是否存在*/
            if (method === 'post') { /*执行post请求*/
                /*post方法获取数据*/
                var postData = '';
                req.on('data', function (chunk) { /*post数据是按照块来读取的，data表示开始读取*/
                    postData += chunk;
                });
                req.on('end', function () {  /*end事件表示读取完成*/
                    req.body = postData;
                    /*封装数据到Request的body中*/
                    G['_' + method][reqUrl](req, res);
                    /*执行方法*/
                });
            } else { /*执行get请求*/
                G['_' + method][reqUrl](req, res);
                /*get方法获取数据*/
                var query = url.parse(req.url, true).query;
            }
        }else if(reqUrl === "/favicon.ico/" ){  /*读取图标*/
            fs.readFile('./static/img/logo.ico',function (err,data) {
                if(err){
                    console.log('图标文件加载失败');
                }else{
                    res.send(data);
                }
            })
        } else {
            res.send('路由不存在');
        }

    };
    /**
     * 定义app的get方法
     * @param methodName 访问url路径
     * @param callback 回调函数
     */
    app.get = function (methodName, callback) {
        //处理URL格式
        if (!methodName.endsWith('/')) {
            methodName = methodName + '/';
        }
        if (!methodName.startsWith('/')) {
            methodName = '/' + methodName;
        }
        G._get[methodName] = callback;
        /*注册方法到G._get中*/
        console.log(`get method url [${methodName}] reg`);
    };
    /**
     * 定义app的post方法
     * @param methodName
     * @param callback
     */
    app.post = function (methodName, callback) {
        //处理URL格式
        if (!methodName.endsWith('/')) {
            methodName = methodName + '/';
        }
        if (!methodName.startsWith('/')) {
            methodName = '/' + methodName;
        }
        G._post[methodName] = callback;
        /*注册方法到G._post中*/
        console.log(`post method url [${methodName}] reg`);
    };

    return app;
};

module.exports = server();


