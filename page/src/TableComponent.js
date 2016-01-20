
const m = require("mithril");
const draw$ = require("./reactive.js");
const graph = require("./graph.js");
const { itemComponent } = require("./utilComponent/utilComponent.js");

const TableComponent = {
  controller: () => {
    return {
      list: graph.table.bind(graph)
    }
  },
  view: (ctrl) => {
    console.log(graph)
    const rows = ctrl.list().map(row => {
      return m.component(itemComponent, { row } )
    })
    return m("table", { class: "table" }, [
      m("thead",
        m("tr",
          [m("th", "data"), m("th", "cel")]
          )
        ),
      m("tbody", rows) 
    ])
  }
}

module.exports = TableComponent