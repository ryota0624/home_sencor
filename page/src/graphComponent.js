
const m = require("mithril");
const draw$ = require("./reactive.js");
const graph = require("./graph.js")
console.log(graph)
const GraphComponent = {
  controller: () => {
    return { 
      draw: graph.draw.bind(graph)
    }
  },
  view: (ctrl) => {
    const canvasConfig = {
      id: "result",
      heigth: "450",
      width: "800"
    }
    setTimeout(ctrl.draw, 1000);
    return m("canvas", canvasConfig)
  }
}
module.exports = GraphComponent