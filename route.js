const configRoutes = (app, server) => {
  app.get("/",(request, response) => {
   response.redirect("/index.html");
  });
  
  app.post("/track",(request, response) => {
    response.send({})
  })
}

module.exports = configRoutes;