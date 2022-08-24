const doughnutData = {
    labels: [],
    datasets: [
    {
      label: "Categories",
      data: [],
      backgroundColor: [],
    }
  ]
  };
  const doughnutConfig = {
    type: 'doughnut',
    data: doughnutData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Categories'
        }
      }
    },
  };
    const myDoughnutChart = new Chart(
      document.getElementById('mydoughnutChart'),
      doughnutConfig
    );