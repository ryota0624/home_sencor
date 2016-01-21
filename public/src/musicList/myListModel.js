const m = require("mithril");
var request = require("superagent");

class MyList {
  constructor(callback) {
    this._tracks = [];
    this._callback = callback;
  }
  
  push(track) {
    console.log(track)
    track._id = track.previewUrl;
    const isValid = !this._tracks.some(item => { 
      return item._id == track._id
    });
    if (isValid) {
      this._tracks.push(track);
    }
    this._callback();
  }
  
  remove({ _id }) {
    this._tracks = this._tracks.filter(track => track._id != _id)
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