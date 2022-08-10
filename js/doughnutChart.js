const doughnutData = {
    labels: [],
    datasets: [
    {
      label: "Credit Card",
      data: [],
      backgroundColor: [],
    },
    {
      label: "Debit Card",
      data: [],
      backgroundColor: "",
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