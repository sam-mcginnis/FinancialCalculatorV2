const doughnutData = {
    labels: [],
    datasets: [
    {
      label: "Credit Card",
      data: [],
      backgroundColor: "rgb(220,20,60, 0.75)",
      borderColor: "#FF0000",
      borderWidth: .5
    },
    {
      label: "Debit Card",
      data: [],
      backgroundColor: "rgb(65,105,225, 0.75)",
      borderColor: "#87CEFA",
      borderWidth: .5
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