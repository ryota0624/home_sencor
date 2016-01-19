
const m = require("mithril");
const draw$ = require("./reactive.js");
const graph = require("./graph.js")
console.log(graph)
const h = ((i) => {
  var arr = []
  for ( var j = 0; j < i; j++) {
    arr.push({id: j})
  }
  return arr
})(5)


const itemComponent = {
  controller: () => {
      
  },
  view: (ctrl, args) => {
    var datas = [];
    const {row} = args;
    for (var cell in row) {
      datas.push(m("td", row[cell]));
    }
    return m("tr", datas)
  }
}

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
          [
            m("th", "data"),
            m("th", "cel")
          ])),
      m("tbody", rows) 
    ])
  }
}

module.exports = TableComponent