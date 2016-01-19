const connect = require('connect'),
  serveStatic = require('serve-static');
const server = () => {
  const app = connect();
  app.use(serveStatic(__dirname + "/page/"));
  app.listen(3000);
  console.log(__dirname + "page/")
  console.log("server start")
}
server()
module.exports =server
