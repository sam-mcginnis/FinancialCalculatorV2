const data = {
  labels: [],
  datasets: [
    {
    label: "Earened",
    data: [],
    backgroundColor: "rgb(154,205,50, 0.75)",
    borderColor: "#adff2f",
    borderWidth: 2
  },
  {
    label: "Spent",
    data: [],
    backgroundColor: "rgb(220,20,60, 0.75)",
    borderColor: "#FF0000",
    borderWidth: 2
  },
  {
    label: "Net Amount",
    data: [],
    backgroundColor: "rgb(65,105,225, 0.75)",
    borderColor: "#87CEFA",
    borderWidth: 2
  }
]
};
const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Income'
      }
    }
  },
};
  const myBarChart = new Chart(
    document.getElementById('myChart'),
    config
  );

  // Barchart for budget function

  const categoryData = {
    labels: [],
    datasets: [
      {
      label: "Budget",
      data: [],
      backgroundColor: "rgb(154,205,50, 0.75)",
      borderColor: "#adff2f",
      borderWidth: 2
    },
    {
      label: "Spent",
      data: [],
      backgroundColor: "rgb(220,20,60, 0.75)",
      borderColor: "#FF0000",
      borderWidth: 2
    },
    {
      label: "Net Amount",
      data: [],
      backgroundColor: "rgb(65,105,225, 0.75)",
      borderColor: "#87CEFA",
      borderWidth: 2
    }
  ]
  };
  const categoryConfig = {
    type: 'bar',
    data: categoryData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Monthly Budget by Category'
        }
      }
    },
  };
    const categoryMyBarChart = new Chart(
      document.getElementById('categoryMyChart'),
      categoryConfig
    );
  

