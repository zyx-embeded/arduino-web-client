google.charts.load("current", {
  callback: init,
  packages: ["corechart", "line"]
});
google.charts.setOnLoadCallback(drawCurveTypes);

function init() {
  let socket = io();
  socket.emit("ClientSent", "SendClientData");
  socket.on("ServerSent", function(data) {
    drawCurveTypes(data);
  });
}

function drawCurveTypes(chartData) {
  let data = new google.visualization.DataTable();
  data.addColumn("number", "X");
  data.addColumn("number", "Humidity (%)");
  data.addColumn("number", "Temperature (C)");
  data.addRows(chartData);
  let options = {
    hAxis: {
      title: "Time (seconds)"
    },
    vAxis: {
      title: "Weather"
    },
    series: {
      1: { curveType: "function" }
    }
  };
  let chart = new google.visualization.LineChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}
