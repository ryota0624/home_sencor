"use strict"
var db = require("./models");
const configRoutes = (app, server) => {
  app.get("/",(request, response) => {
   response.redirect("/index.html");
  });
  
  app.post("/track",(request, response) => {
      pushTrack(request.body)
      .then((res) => response.send(res))
      .catch((s) => response.send(false))
  })
  
  app.get("/track", (request, response) => {
      allTrack().then(res => {
        const tracks = res.map(item => item.dataValues);
        response.send(tracks);
      })
  })
}

var pushTrack = (_track) => {
    return new Promise((resolve, reject) => {
        var Track = db.Track;
        if(!checkTrack(_track)) {
            reject(false);
            return false
        }
        Track.create(_track).then(res => {
            console.log(res.dataValues)
            resolve(res.dataValues);
        })
        .catch(()=>{
            reject(false);
        })  
    })
}

var allTrack = () => {
    return new Promise((resolve, reject) => {
        var Track = db.Track;
        Track.findAll().then(res => {
            resolve(res);
        }).catch(err => {
            console.log(err);
            reject(false);
        })
    })
}

function checkTrack(o) {
    return o._id && o.artworkUrl60 && o.trackName && o.previewUrl
}
module.exports = configRoutes;