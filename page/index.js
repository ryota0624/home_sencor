function fetchNcmb(key, pass) {
  console.log(key, pass)
  const ncmb = new NCMB(key, pass)
    TempClass = ncmb.DataStore("Temp");
    var dataSet;
    var labels;
    return new Promise((resolve) => {
        TempClass.fetchAll().then(res => {
            const labels = res.map((o) => {
                return formatDate(new Date(o.createDate), "MM月DD日hh時mm分");
            })
            const dataSet = res.map((o) => {
                return o.celsius;
            })
            const table = res.map((o) => {
                return {
                    date: formatDate(new Date(o.createDate), "MM月DD日hh時mm分"),
                    celsius: o.celsius
                }
            })
            resolve({labels, dataSet, table})
        })
    })
}

function displayLineChart(labels, setData) {
    const data = {
        labels,
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: setData
            }
        ]
    };
    const ctx = document.getElementById("result").getContext("2d");
    const options = { };
    var lineChart = new Chart(ctx).Line(data, options);
  }

window.onload = () => {
    fetchNcmb(window.ni.key, window.ni.pass)
    .then(res => {
        window.tableCreate(res.table);
        displayLineChart(res.labels, res.dataSet)
    })
}


var formatDate = (date, format) => {
  if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
  format = format.replace(/YYYY/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  if (format.match(/S/g)) {
    var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
    var length = format.match(/S/g).length;
    for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
  }
  return format;
};
