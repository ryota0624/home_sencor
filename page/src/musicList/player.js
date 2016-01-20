"use strict"
const m = require("mithril");
    
class Player {
  constructor(callback) {
    this._now;
  }
  
  search(keyword) {
    const callback = this._callback;
    searchMusic(keyword).then(res => this._tracks = res).then(callback);
  }
  
  all() {
    return this._tracks;
  }
}

function searchMusic(name) {
  return new Promise(resolve => {
    request
      .get(url)
      .query({
        term: name,
        country: 'JP',
        entry: 'musicTrack'
      }).end((err, res) => {
        const result = JSON.parse(res.text);
        if (result.resultCount > 0) {
          const tracks = result.results;
          resolve(tracks)
        } else {
          resolve("no match");
        }
      })
  })
}
const redraw = (s) => {
  console.log(s)
  m.redraw();
}
module.exports = new Music(redraw);
