const barLabels = ["January", "February", "March", "April", "May", "June"];
const barData = {
  labels: barLabels,
  datasets: [
    {
      label: "My First Dataset",
      data: [4500, 5500, 6000, 8000, 10000, 15000],
      backgroundColor: "rgb(78, 115, 223)",
      borderColor: "rgba(78, 115, 223, 1)",
      yAxisID: "yAxis",
      xAxisID: "xAxis",
      barThickness: 24,
      borderWidth: 1,
    },
  ],
};

const barConfig = {
  type: "bar",
  data: barData,
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
    },
  },
};

const barChart = new Chart(document.getElementById("bar-chart"), barConfig);
