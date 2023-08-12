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
    }
  },
};
  const categoryMyLineChart = new Chart(
    document.getElementById('categoryMyLineChart'),
    categoryLineConfig
  );