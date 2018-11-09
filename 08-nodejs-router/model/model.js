var app = {
    login:function(res,req){
        console.log('login');
    },
    register:function(res,req){
        console.log('register');
    },
    home:function(res,req){ /*默认路由*/
        console.log('home');
    }
}
module.exports=app;
/*
执行方法的两种方式
app.login('a','b');
app['login']('a','b');*/
