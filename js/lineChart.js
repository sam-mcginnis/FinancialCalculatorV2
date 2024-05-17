const lineData = {
    labels: [],
    datasets: [
    {
      label: "Credit Card",
      data: [],
      backgroundColor: "rgb(220,20,60, 0.75)",
      borderColor: "#FF0000",
      borderWidth: 2
    },
    {
      label: "Debit Card",
      data: [],
      backgroundColor: "rgb(65,105,225, 0.75)",
      borderColor: "#87CEFA",
      borderWidth: 2
    }
  ]
  };
const lineConfig = {
  type: 'line',
  data: lineData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Card Expenditures Trend'
      }
    }
  },
};
const myLineChart = new Chart(
  document.getElementById('myLineChart'),
  lineConfig
);

// Line chart to show categories trend in spending

const catergoryLineData = {
  labels: [],
  datasets: []
};
const categoryLineConfig = {
  type: 'line',
  data: catergoryLineData,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Category Expenditure Trend'
      }
    },
    onClick: (legendItem) => {
      var index = legendItem.datasetIndex;
  var ci = categoryMyLineChart;
  var alreadyHidden = (ci.getDatasetMeta(index).hidden === null) ? false : ci.getDatasetMeta(index).hidden;

  ci.data.datasets.forEach(function(e, i) {
    var meta = ci.getDatasetMeta(i);

    if (i !== index) {
      if (!alreadyHidden) {
        meta.hidden = meta.hidden === null ? !meta.hidden : null;
      } else if (meta.hidden === null) {
        meta.hidden = true;
      }
    } else if (i === index) {
      meta.hidden = null;
    }
  });

  ci.update();
    }
  },
};
  const categoryMyLineChart = new Chart(
    document.getElementById('categoryMyLineChart'),
    categoryLineConfig
  );