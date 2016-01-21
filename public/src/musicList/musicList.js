const m = require("mithril");
const music = require("./musicModel.js");
const list = require("./myListModel.js");

const itunesParse = (o) => {
  const { artistName,
    artworkUrl60,
    trackName,
    previewUrl
  } = o;
  return {
    artworkUrl60,
    trackName,
    artistName,
    previewUrl
  }
}

const addList = (o) => {
  console.log(o)
}

const myTrackComponent = {
  controller: () => {
    return {
      addList: list.remove.bind(list)
    }
  },
  view: (ctrl, args) => {
    var datas = [];
    const { row } = args;
    const addIconConfig = {
      onclick: () => {
        ctrl.addList(args.row)
      }
    }
    const playIconConfig = {
      onclick: () => {
        console.log(args)
        if (args.audio.src != args.row.previewUrl) {
          args.audio.src = args.row.previewUrl;
          args.audio.play();
        } else {
          args.audio.src = "";
          args.audio.pause();
        }
        console.log("hoge")
      }
    }
    const playIcon = ((play) => {
      if (play) {
        return "glyphicon glyphicon-stop"
      } else {
        return "glyphicon glyphicon-play"
      }
    })(args.audio.src === args.row.previewUrl)
    datas.push(m("td", m("a", addIconConfig ,m("span", {class: "glyphicon glyphicon-remove"
, "aria-hidden": true}))))
    for (var cell in row) {
      switch (cell) {
        case "artworkUrl60":
          datas.push(m("img", { src: row[cell] }));
          break;
        case "previewUrl":
        case "_id":
          break;
        default:
          datas.push(m("td", row[cell]));
          break;
      }
    }
    datas.push(m("td", m("a", playIconConfig ,m("span", {class: playIcon, "aria-hidden": true}))))
    return m("tr", datas)
  }
}


const itemComponent = {
  controller: () => {
    return {
      addList: list.push.bind(list)
    }
  },
  view: (ctrl, args) => {
    var datas = [];
    const { row } = args;
    const addIconConfig = {
      onclick: () => {
        ctrl.addList(args.row)
      }
    }
    const playIconConfig = {
      onclick: () => {
        console.log(args)
        if (args.audio.src != args.row.previewUrl) {
          args.audio.src = args.row.previewUrl;
          args.audio.play();
        } else {
          args.audio.src = "";
          args.audio.pause();
        }
        console.log("hoge")
      }
    }
    const playIcon = ((play) => {
      if (play) {
        return "glyphicon glyphicon-stop"
      } else {
        return "glyphicon glyphicon-play"
      }
    })(args.audio.src === args.row.previewUrl)
    datas.push(m("td", m("a", addIconConfig ,m("span", {class: "glyphicon glyphicon-plus", "aria-hidden": true}))))
    for (var cell in row) {
      switch (cell) {
        case "artworkUrl60":
          datas.push(m("img", { src: row[cell] }));
          break;
        case "previewUrl":
        case "_id":
          break;
        default:
          datas.push(m("td", row[cell]));
          break;
      }
    }
    datas.push(m("td", m("a", playIconConfig ,m("span", {class: playIcon, "aria-hidden": true}))))
    return m("tr", datas)
  }
}

module.exports = {
  itemComponent
}

const searchBar = {
  model: function(keyword) {
    this.val = m.prop(keyword);
  },
  controller: () => {
    return {
      search: music.search.bind(music),
      keyword: new searchBar.model(""),
    }
  },
  view: (ctrl) => {
    const keyword = {
      onchange: m.withAttr("value", ctrl.keyword.val),
      value: ctrl.keyword.val(),
      class: "form-control",
      placeholder: "search for..."
    }
    const submit = {
      class: "btn btn-default",
      onclick: () => {
        ctrl.search(ctrl.keyword.val())
      }
    }
    return m("div", {class: "input-group"}, [
      m("input", keyword),
      m("span", { class: "input-group-btn" }, m("button", submit, "検索"))
    ])
  }
}

const tableHeader = {
  controller: () => { },
  view: (ctrl, args) => {
    let headers = [];
    headers.push(m("th", ""))
    for (let cell in args.item) {
            switch (cell) {
        case "artworkUrl60":
          headers.push(m("th", "artwork"))
          break;
        case "trackViewUrl":
        case "previewUrl":
          break;
        default:
          headers.push(m("th", cell))
          break;
      }
    }
    return m("tr", headers)
  }
}

const table = {
  controller: () => {
    let audio = new Audio();
    audio.addEventListener("ended", () => {
      audio.src = "";
      m.redraw();
    })
    return { audio: audio }
  },
  view: (ctrl, args) => {
    const popItem = args.list[0];
    const rows = ((item) => {
      let component;
      if (!item) return [];
      if (item._id) {
        component = myTrackComponent;
      } else {
        component = itemComponent;
      }
      return args.list.map(row => {
        return m.component(component, { row, audio: ctrl.audio })
      })
    })(popItem);
    const header = m.component(tableHeader, { item: popItem });
    return m("table", { class: "table" }, [
      m("thead", header),
      m("tbody", rows) 
    ])
  }
}
var mylist = false;

const navBar = {
  controller: () => {
    return {}
  },
  view: (ctrl, args) => {
    const clickHandle = () => {
      mylist = !mylist;
      m.redraw();
    }
    
    const tabs = (() => {
      if (mylist) {
        return [
          m("li", { role: "presentation" }, m("a", { onclick: clickHandle }, "itunesStore")),
          m("li", { role: "presentation", class: "active" }, m("a", { onclick: clickHandle }, "mylist"))
        ]
      } else {
        return [
          m("li", { role: "presentation", class: "active" }, m("a", { onclick: clickHandle }, "itunesStore")),
          m("li", { role: "presentation" }, m("a", { onclick: clickHandle }, "mylist"))
        ]
      }
    })();
    return m("ul", { class: "nav nav-tabs" }, tabs)
  }
}

const musicComponent = {
  controller: () => {
    return {
      tracks: music.all.bind(music),
      myList: list.all.bind(list)
    }
  },
  view: (ctrl) => {
    const app = (() => {
      if (mylist) {
        return m.component(table, { list: ctrl.myList() })
      } else {
        return [
          m.component(searchBar, {}),
          m.component(table, { list: ctrl.tracks().map(itunesParse) })
        ]
      }
    })();
    return m("div",
      [
        m.component(navBar, {}),
        app
      ])
  }
}

module.exports = musicComponent
