const m = require("mithril");
const links = [
  { link: "/", label: "graph" },
  { link: "/table", label: "table" },
  { link: "/music", label: "music" }
]


const header = {
  controller: () => {
    return {
      jump: (e) => {
        var jumper = e.target.name;
        m.route(jumper);
      }
    }
  },
  view: (ctrl, args) => {
    const {label, link } = args;
    return m("li",m("a", {name: link, onclick: ctrl.jump }, label))
  }
}
const headerComponent = {
  controller: () => {
    return {
      links
    }
  },
  view: (ctrl) => {
    const links = ctrl.links.map((item) => {
      const {link, label} = item
      return m.component(header, {link, label})
    })
    return(
    m("nav", { class: "navbar navbar-default" },
      m("div", { class: "container-fluid" },
        m("div", { class: "navbar-header"},
          m("ul", { class: "nav nav-tabs" },
            links
          )
         )
        )   
       )
      )
  }
}
module.exports = headerComponent