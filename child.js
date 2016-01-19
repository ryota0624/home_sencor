const exec = require("child_process").exec;

const say = (text) => {
  console.log("child process")
  exec(`node main.js`, (err, hoge) => {
    console.log(err , hoge)
  })
  return true
}

module.exports = say;