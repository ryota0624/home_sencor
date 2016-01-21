const m = require("mithril");
var request = require("superagent");

class MyList {
  constructor(callback) {
    this._tracks = [];
    this._callback = callback;
    this.fetch();
  }
  
  push(track) {
    console.log(track)
    track._id = track.previewUrl;
    const isValid = !this._tracks.some(item => { 
      return item._id == track._id
    });
    if (isValid) {
      this._tracks.push(track);
      pushTrack(track).then(r => console.log(r));
    }
    this._callback();
  }
  
  remove({ _id }) {
    this._tracks = this._tracks.filter(track => track._id != _id)
  }
  
  fetch() {
      fetchTrack().then(r => {
          console.log(r);
          this._tracks = r.body
            .filter(track => checkTrack(track))
            .map(track => myListParse(track));
          this._callback();
      }).catch(r => {
          console.log(r);
      })
  }
  
  all() {
    return this._tracks;
  }
}

const redraw = (s) => {
  console.log(s)
  m.redraw();
}

module.exports = new MyList(redraw)

function fetchTrack() {
    return new Promise((resolve, reject) => {
        request.get("/track").end((err, res) => {
            if(res) {
                resolve(res);
            } else {
                reject(false);
            }
        })
    })
}

function pushTrack(o) {
  return new Promise((resolve, reject) => {
    request
      .post("/track")
      .send(o)
      .end((err, res) => {
        if(res) {
            resolve(res);
        } else {
            reject(false);
        }
      })
  })
}

function checkTrack(o) {
    return o._id && o.artworkUrl60 && o.trackName && o.previewUrl
}

function myListParse(o) {
  const {
    _id, 
    artistName,
    artworkUrl60,
    trackName,
    previewUrl
  } = o;
  return {
    _id,
    artworkUrl60,
    trackName,
    artistName,
    previewUrl
  }
}