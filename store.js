"use strict"
const NCMB = require("ncmb")
const ni = require("./config.js")
const ncmb = new NCMB(ni.key,ni.pass)
const TempClass = ncmb.DataStore("Temp")

class Store {
  push(cel) {
    let instance = new TempClass();
    instance.set("celsius",cel);
    instance.save().then(() => {
      console.log("done")
    }).catch((err) => console.log(err))
  }
}

const st = new Store()
// const scr = (cel) => {
//   if(cel > 30) return 0;
//   st.push(cel);
//   scr(cel + 2);
// }

// scr(20);

module.exports = st