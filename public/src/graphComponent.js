
const m = require("mithril");
const draw$ = require("./reactive.js");
const graph = require("./graph.js")
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
      width: "800",
      config: ctrl.draw
    }
    return m("canvas", canvasConfig)
  }
}
module.exports = GraphComponent