var express     = require('express'),
    app         = express(),
    http        = require('http'),
    httpServer  = http.Server(app),
    port        = 3003;

app.use(express.static(__dirname+'/dist'));

app.get('/*', function(req, res){
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(port);