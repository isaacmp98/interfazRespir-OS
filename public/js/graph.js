// Gráficas
var context_chart1 = document.getElementById("grafica1");
var context_chart2 = document.getElementById("grafica2");
var context_chart3 = document.getElementById("grafica3");

let timestamp_chart = [];
let flow_chart = [];
let pressure_chart = [];
let volume_chart = [];

let array_tiempos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
let i = 1;
let j = 0;
let k = 0;
let m = 0;
var eliminar = new Boolean(false);
let txt_flow = [];
let txt_pressure = [];
let txt_volume = [];

socket.on("readings", function (data) {
  wsParseChart(data);
});

var config_chart1 = {
  type: 'line',
  data: {
    labels: array_tiempos,
    datasets: [{
      label: "presión",
      lineTension: 0.3,
      backgroundColor: "rgba(150,138,133,0.2)",
      borderColor: "rgba(150,138,133,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(150,138,133,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(150,138,133,1)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: pressure_chart,
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: true
        },
        ticks: {
          maxTicksLimit: 7
        },
        scaleLabel: {
          display: true,
          labelString: "Tiempo [s]"
        }
      }],
      responsive: true,
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          suggestedMin: 0,
          suggestedMax: 40
        },
        scaleLabel: {
          display: true,
          labelString: "Presión [cmH2]"
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
};

var config_chart2 = {
  type: 'line',
  data: {
    labels: array_tiempos,
    datasets: [{
      label: "flujo",
      lineTension: 0.3,
      backgroundColor: "rgba(107,199,86,0.2)",
      borderColor: "rgba(107,199,86,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(107,199,86,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(107,199,86,1)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: flow_chart,
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        },
        scaleLabel: {
          display: true,
          labelString: "Tiempo [s]"
        },
      }],
      responsive: true,
      yAxes: [{
        ticks: {
          maxTicksLimit: 5
        },
        scaleLabel: {
          display: true,
          labelString: "Flujo [lit/min]"
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
};

var config_chart3 = {
  type: 'line',
  data: {
    labels: array_tiempos,
    datasets: [{
      label: "volumen",
      lineTension: 0.3,
      backgroundColor: "rgba(108,151,199,0.2)",
      borderColor: "rgba(108,151,199,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(108,151,199,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(108,151,199,1)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: volume_chart,
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: true
        },
        ticks: {
          maxTicksLimit: 7
        },
        scaleLabel: {
          display: true,
          labelString: "Tiempo [s]"
        },
      }],
      responsive: true,
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          suggestedMin: 0,
          suggestedMax: 40
        },
        scaleLabel: {
          display: true,
          labelString: "Volumen [ml]"
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
};

var chart1 = new Chart(context_chart1, config_chart1);
var chart2 = new Chart(context_chart2, config_chart2);
var chart3 = new Chart(context_chart3, config_chart3);

function wsParseChart(data) {
  flow_chart.push(data.flow);
  pressure_chart.push(data.pressure);
  volume_chart.push(data.volume);
  timestamp_chart.push(data.timestamp);
};

function update_chart(chart, label, data) {
  //chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
    dataset.data.push(data);
  });
  chart.update();
};

function remove_Data(chart) {
  //chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  chart.update();
};

function remove_firstData(chart) {
  //chart.data.labels.shift();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.shift();
  });
  chart.update();
};

function writeLogPressure(timestamp, pressure) {
  txt_pressure[j] = "Instante:" + timestamp[timestamp.length - 1] + "  Presión:" + pressure[pressure.length - 1] + "\n";
  j++;
};

function writeLogFlow(timestamp, flow) {
  txt_flow[k] = "Instante:" + timestamp[timestamp.length - 1] + "  Flujo:" + flow[flow.length - 1] + "\n";
  k++;
};

function writeLogVolume(timestamp, volume) {
  txt_volume[m] = "Instante:" + timestamp[timestamp.length - 1] + "  Volumen:" + volume[volume.length - 1] + "\n";
  m++;
};

setInterval(function () {

  i++;

  writeLogPressure(timestamp_chart, pressure_chart);
  writeLogFlow(timestamp_chart, flow_chart);
  writeLogVolume(timestamp_chart, volume_chart);

  if (i >= 30) {
    eliminar = true;
  } else {
    eliminar = false;
  };

  update_chart(chart1);
  update_chart(chart2);
  update_chart(chart3);

  remove_Data(chart1);
  remove_Data(chart2);
  remove_Data(chart3);

  if (eliminar == true) {
    remove_firstData(chart1);
    remove_firstData(chart2);
    remove_firstData(chart3);
  };

}, 1000);

function download_pressure() {
  var element = document.createElement('a');

  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txt_pressure));
  element.setAttribute('download', "pressure.txt");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

function download_flow() {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txt_flow));
  element.setAttribute('download', "flow.txt");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

function download_volume() {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txt_volume));
  element.setAttribute('download', "volume.txt");

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};
