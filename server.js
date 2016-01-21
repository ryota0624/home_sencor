// const connect = require('connect'),
//   serveStatic = require('serve-static');
// const server = () => {
//   const app = connect();
//   app.use(serveStatic(__dirname + "/page/"));
//   app.listen(3000);
//   console.log(__dirname + "page/")
//   console.log("server start")
// }

var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');
const route = require("./route.js")

var app = express();
var server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: true}));  // POST JSON送信する場合必要
app.use(bodyParser.json());  // JSON受信する場合必要
app.use(express.static(__dirname + "/public"));

route(app, server);
server.listen(3000);

console.log("start server");

module.exports = server
