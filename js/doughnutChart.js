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
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              values = statementsByYear[findCurrentYearIndex()][1]
              percentage = Math.round((context.parsed / (values[findCurrentMonthIndex()].graph.DC_Spent + values[findCurrentMonthIndex()].graph.CC_Spent)) * 100);
              return context.label + ': $' + context.formattedValue + ' (' + percentage + '%)';
          }
          }
      }
      },
      onClick: (e) => {
        let category = e.chart.tooltip.dataPoints[0].label
        let list = document.getElementById('modalList')
        let categoryList = getCategoryList(category)

        jQuery('#modalList').empty()

        categoryList.forEach((item) => {
          let li = document.createElement("li");
          li.innerText = item;
          list.appendChild(li);
      })

        document.getElementById('modalTitle').innerHTML = category

        jQuery('#myModal').modal()
      }
    }
  };
    const myDoughnutChart = new Chart(
      document.getElementById('mydoughnutChart'),
      doughnutConfig
    );