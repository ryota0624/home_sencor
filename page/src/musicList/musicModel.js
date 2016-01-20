"use strict"
const m = require("mithril");
var request = require("superagent");

const url = "http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/wa/wsSearch";
let initalConfig = {
      term: "紅",
      country: "JP",
      entry: "musicTrack",
      limit: 5
}
    
class Music {
  constructor(callback) {
    console.log(callback)
    this._url = url;
    this._tracks = [];
    this._callback = callback;
  }
  
  search(keyword) {
    const callback = this._callback;
    searchMusic(keyword).then(res => this._tracks = res).then(callback).catch(res => console.log(res));
  }
  
  all() {
    return this._tracks;
  }
}

function searchMusic(name) {
  return new Promise((resolve, reject) => {
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
          reject("no match");
        }
      })
  })
}
const redraw = (s) => {
  console.log(s)
  m.redraw();
}
module.exports = new Music(redraw);

// const test = () => {
//   const mu = new Music(redraw);
//   mu.search("bump");
// }
// test();