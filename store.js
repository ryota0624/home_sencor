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

module.exports = st