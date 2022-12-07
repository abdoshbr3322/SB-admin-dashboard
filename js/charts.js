let earningsTooltip = {
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
}

export {earningsTooltip};