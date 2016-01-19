const Rx = require("rx");
const five = require("johnny-five");
const board = new five.Board();
const temporal = require("temporal");
const store = require("./store.js");
const say = require("./speeker.js");
const server = require("./server.js");
server();
const Player = require('player');
  var player = new Player('/Users/ryota/Documents/Dropbox/xperia_pic/Skyfall-007.mp3');

const infrared$ = new Rx.Subject();
const motionStream = new Rx.Subject();
infrared$.subscribe((s) => console.log(s));
var tempStack = [];

board.on("error", (er) => console.log(er));

const boardReadyStream = Rx.Observable.fromEvent(board,"ready");

boardReadyStream.subscribe((s) => {
  console.log("readyBoard");
  board.repl.inject({
    tv: () => {
      requestBoard(board,"TV");
    }
  });
  
  // const temperature = new five.Thermometer({
  //   controller: "LM35",
  //   pin: "A0"
  // })
  // temperature.on("data", () => {
  //   console.log(this.celsius + "℃");
  //   tempStack.push(this.celsius);
  // });
  
  const irMotion = new five.IR.Motion(7);
  irMotion.on("motionstart", () => motionStream.onNext(true));
  irMotion.on("motionend", () => motionStream.onNext(false));
  board.on('string', (data) => onString(board, data));
  
  temporal.loop(1000 * 60 * 30, () => {
    sendLastTemp(tempStack);
    tempStack = [];
  });
  
});

const sendIrStream = motionStream.distinctUntilChanged();
sendIrStream.filter(s => s).subscribe((s) => {
  
  requestBoard(board, "TV");
  requestBoard(board, "SPEEKER");
  
  sendLastTemp(tempStack);
  tempStack = [];
  console.log("human comming")
})

function requestBoard(board, str) {
    if (!board.io) {
      console.error('not connected to arduino.');
      return;
    }
    board.io.sendString(str);
    console.log('to arduino: sent'+str);
  }

function onString(arduino, data) {
  console.log("from ", data)
  if (data === "play") {
    player.play()
  }
}

function sendLastTemp(tempStack) {
  if (tempStack.length > 0) {
   const sendTemp = tempStack.pop();
   say(sendTemp);
   store.push(sendTemp)
  }
}