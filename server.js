var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');
const route = require("./route.js")
var db = require("./models");

var app = express();
var server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: true}));  // POST JSON送信する場合必要
app.use(bodyParser.json());  // JSON受信する場合必要
app.use(express.static(__dirname + "/public"));

route(app, server);

db.sequelize.sync().then((conn, err) => {
    if(err) {
        console.log(err);
    } else {
        server.listen(3000);
        console.log("start server");
    }
})


module.exports = server
