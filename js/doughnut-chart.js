const doughnutData = {
  labels: ["Direct", "Social", "Referral"],
  datasets: [
    {
      label: "My First Dataset",
      data: [55, 30, 15],
      backgroundColor: [
        "rgb(78, 115, 223)",
        "rgb(28, 199, 136)",
        "rgb(54, 185, 204)",
      ],
      hoverBackgroundColor: ["#2e59d9", "#17a673", "#2c9faf"],
      hoverBorderColor: "rgba(234, 236, 244, 1)",
    },
  ],
};

const doughnutConfig = {
  type: "doughnut",
  data: doughnutData,
  options: {
    layout: {
      padding: {
        left: 15,
        right: 15,
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
      },
    },
  },
};

const doughnutChart = new Chart(
  document.getElementById("revenue-chart"),
  doughnutConfig
);
