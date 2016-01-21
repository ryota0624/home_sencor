const m = require("mithril");
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

module.exports = {
  itemComponent
}