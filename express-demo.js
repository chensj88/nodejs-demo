var express = require('express');

var app = express();

app.get('/',function (req,res) {
    res.send('Welcome To Node World!');
})


app.listen(9800);
var tweets = [];

app.post('/send',express.bodyParser(),function(req,res){
    if(req.body && req.body.tweet){
        tweets.push(req.body.tweet)
        res.send({status:'OK',message:'Tweet received'})
    }else{
        res.send({status:'NOK',message:'No Tweet received'})
    }
})

app.get('/tweets',function (req,res) {
    res.send(tweets);
})