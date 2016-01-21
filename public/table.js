// const tabel = () => {

// }

const t = ((tab) => {
  return tab.map(id => {
    return {
      id,
      name: "name"+id
    }
  })
})([1,2,3,4,5]);
const tableCreate = (data) => {
  const table = document.getElementById("tbody");
  const rows = data.map(row => {
    var tr = document.createElement("tr")
    var cell;
    for(cell in row) {
      var td = document.createElement("td");
      td.innerHTML = row[cell];
      tr.appendChild(td);
    }
    console.log(tr)
    return tr
  })
  rows.forEach((row) => {
    table.appendChild(row);
  })
}
