'use strict'
const electron = require("electron");

const app = require('app');
const Browser = require('browser-window');
const clipboard = require("clipboard");
//  const senser = require("./main.js");
const no = require("./child.js")
console.log(no());

require('crash-reporter').start();
let mainWindow = null;
const ipc = require("electron").ipcMain;
app.on('window-all-closed', () => app.quit());
app.on('ready',() => {
  const electronScreen = electron.screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
  mainWindow = new Browser({
    x: size.width - 300,
    y: size.height -250,
    width: 900,
    height: 600,
    // frame: false,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden',
    // transparent: true, // 背景透過
    // // resizable: false,  // 大きさ変更禁止
    // alwaysOnTop: true,
    // autoHideMenuBar: true
    });
  mainWindow.loadUrl('file://' + __dirname + '/page/index.html');

  // mainWindow.setIgnoreMouseEvents(true);
  mainWindow.on('closed',() => {
    mainWindow = null
     app.quit()
  })
})