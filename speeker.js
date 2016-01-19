const exec = require("child_process").exec;

const say = (text) => {
  exec(`say ${text}`, () => {
    console.log(`> ${text}`)
  })
  return true
}

const sayCels = (cels) => {
  const text = `ただいまのきおんわ${cels}ど　です`
  return say(text);
}

module.exports = sayCels;