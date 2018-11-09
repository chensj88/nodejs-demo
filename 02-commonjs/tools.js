var tools = {
    add:function (a,b) {
        return a+b;
    },
    sayHi:function (name) {
        return 'Hello ' + name + ' !';
    }
}

//module.exports.tools = tools;
//使用 tools.tools.add();
module.exports = tools;
//使用 tools.add();
