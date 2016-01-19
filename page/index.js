const m = require("mithril");

const Graph = require("./src/graphComponent.js")
const Table = require("./src/TableComponent.js")
const header = require("./src/header.js")
m.route(document.getElementById("App"), "/", {
  "/": Graph,
  "/table": Table
});
m.mount(document.getElementById("header"), header);