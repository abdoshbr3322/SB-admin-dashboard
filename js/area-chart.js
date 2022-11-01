const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
Chart.defaults.font.size = 11;
Chart.defaults.font.family = "Nunito";
let config = {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        fill: {
          target: "origin",
          above: "rgba(78, 115, 223, 0.05)", // Area will be red above the origin
        },
        yAxisID: "yAxis",
        xAxisID: "xAxis",
        label: "Earnings",
        data: [
          0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000,
          25000, 40000,
        ],
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        lineTension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
      },
    ],
  },
  options: {
    scales: {
      xAxis: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          maxTicksLimit: 7,
        },
      },
      yAxis: {
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          callback: function (value) {
            // add the dollar sign
            let tick = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(value);
            return tick.slice(0, -3); // remove relative values
          },
        },
        grid: {
          borderDash: [2],
          drawBorder: false,
          color: "rgb(234, 236, 244)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255)",
        bodyColor: "#858796",
        boxPadding: 10,
        titleMarginBottom: 10,
        titleColor: "#6e707e",
        titleFont: {
          size: 14,
        },
        borderColor: "#dddfeb",
        borderWidth: 1,
        padding: 8,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label + ": ";
            label += new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(context.parsed.y);
            return label;
          },
        },
      },
    },
  },
};
const areaChart = new Chart(document.getElementById("earnings-chart"), config);
