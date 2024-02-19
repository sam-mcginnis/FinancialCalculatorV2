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
      //callback for modal on pieChart
      onClick: (e) => {
        let category = e.chart.tooltip.dataPoints[0].label
        let modal = document.getElementById('modalList')
        let list = document.createElement('ul')
        

        let categoryList = getCategoryList(category)

        jQuery('#modalList').empty()

        list.style.listStyleType = 'decimal'

        modal.appendChild(list)


        categoryList.forEach((item) => {
          let li = document.createElement('li');
          li.innerText = item;
          list.appendChild(li);
      })

        document.getElementById('modalTitle').innerHTML = category

        document.getElementById('modalFooter').innerHTML = "<button type=\"button\" class=\"btn btn-secondary btn-danger\" data-dismiss=\"modal\">Close</button>"

        jQuery('#myModal').modal()
      }
    }
  };
    const myDoughnutChart = new Chart(
      document.getElementById('mydoughnutChart'),
      doughnutConfig
    );