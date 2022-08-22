//catgories file upload section
//converts rejected description
//and every category into its arrays
var rejectedDescriptionsFile = []
var spendingCategories = []

//Statements by year
var statementsByYear = []
var currentyYear = 0
var currentMonth = 0
var currentTickYear = 0
var currentTickMonth = 0

//statement file upload
//converts debit and credit files
//into arrays
var debitCardAccFile = []
var creditCardAccFile =[]

  function getTotalIncome(debitCardAccFile){
    let stripped = debitCardAccFile[2][2].replace(/,/g, "");
    let number = parseFloat(stripped);
    return number
  }

  function getTotalDebits(debitCardAccFile, categoriesObj){
    let totalDebit= 0

    for(let i = 8; i < debitCardAccFile.length; i++){
      if(debitCardAccFile[i][2] < 0){
          if(!rejectedDescriptionsFile.some(file => file.includes(debitCardAccFile[i][1]))){
            calculateDebitCategories(debitCardAccFile[i], categoriesObj)
            totalDebit += Number(debitCardAccFile[i][2])
          }
        }
      }
    
    return Math.abs(parseFloat(totalDebit).toFixed(2))
  }

  function getTotalCredits(creditCardAccFile, categoriesObj){
    let totalCredit = 0
  
    for(let i = 1; i < creditCardAccFile.length; i++){
      if(creditCardAccFile[i][4] < 0){
        if(!rejectedDescriptionsFile.includes(creditCardAccFile[i][2])){
          calculateCreditCategories(creditCardAccFile[i], categoriesObj)
          totalCredit += Number(creditCardAccFile[i][4])
        }     
      }
    }
    return Math.abs(parseFloat(totalCredit).toFixed(2))
   
  }

  function checkOtherCatgory(statement){
    for(let j = 0; j < spendingCategories.length; j++){
      let category = spendingCategories[j][1]
      for(let k = 0; k < category[0].length; k++){
        if(statement.includes(category[0][k])){
          return spendingCategories[j]
        } 
      }
    }
    return null
  }

  function calculateDebitCategories(statement, categoriesObj){
    let arrayValues = checkOtherCatgory(statement[1])

    if(arrayValues == null){
      if(categoriesObj.categoryTotals.length <= 0){
        let categoryTotal = []
            categoryTotal.push("Other")
            categoryTotal.push(Math.abs(statement[2]))
            categoriesObj.categoryTotals.push(categoryTotal)
      }
      else{
        for(let j = 0; j < categoriesObj.categoryTotals.length; j++){
          if(categoriesObj.categoryTotals[j][0] == "Other"){
            categoriesObj.categoryTotals[j][1] += Math.abs(statement[2])
            break
          }
        }
      }
    }
    else{
      if(categoriesObj.categoryTotals.some(file => file.includes(arrayValues[0]))){
        for(let l = 0; l < categoriesObj.categoryTotals.length; l++){
          if(categoriesObj.categoryTotals[l][0] == arrayValues[0]){
            categoriesObj.categoryTotals[l][1] += Math.abs(statement[2])
            break
          }
        }              
      }
      else{
        let categoryTotal = []
        categoryTotal.push(arrayValues[0])
        categoryTotal.push(Math.abs(statement[2]))
        categoriesObj.categoryTotals.push(categoryTotal)
      }
    }
  }

  function calculateCreditCategories(statement, categoriesObj){
    let arrayValues = checkOtherCatgory(statement[2])

    if(arrayValues == null){
      if(categoriesObj.categoryTotals.length <= 0){
        let categoryTotal = []
            categoryTotal.push("Other")
            categoryTotal.push(Math.abs(statement[4]))
            categoriesObj.categoryTotals.push(categoryTotal)
      }
      else{
        for(let j = 0; j < categoriesObj.categoryTotals.length; j++){
          if(categoriesObj.categoryTotals[j][0] == "Other"){
            categoriesObj.categoryTotals[j][1] += Math.abs(statement[4])
            break
          }
        }
      }
    }
    else{
      if(categoriesObj.categoryTotals.some(file => file.includes(arrayValues[0]))){
        for(let l = 0; l < categoriesObj.categoryTotals.length; l++){
          if(categoriesObj.categoryTotals[l][0] == arrayValues[0]){
            categoriesObj.categoryTotals[l][1] += Math.abs(statement[4])
            break
          }
        }              
      }
      else{
        let categoryTotal = []
        categoryTotal.push(arrayValues[0])
        categoryTotal.push(Math.abs(statement[4]))
        categoriesObj.categoryTotals.push(categoryTotal)
      }
    }
  }

  function convertMonth(date){
    switch(date){
      case 1:
        return "January"
      case 2:
        return "February"
      case 3:
        return "March"
      case 4:
        return "April"
      case 5:
        return "May"
      case 6:
        return "June"
      case 7:
        return "July"
      case 8:
        return "August"
      case 9:
        return "September"
      case 10:
        return "October"
      case 11:
        return "November"
      case 12:
        return "December"
      default:
        window.alert("Your statement does not have valid date!")
    }
  }

  function getColor(){
    return "#" + Math.floor(Math.random()*16777215).toString(16);
  }

  function sortDatesAndPushToChart(){
    let categoriesObj = {categoryTotals: []}
    let earned = getTotalIncome(debitCardAccFile)
    let DC_Spent = getTotalDebits(debitCardAccFile, categoriesObj)
    let CC_Spent =  getTotalCredits(creditCardAccFile, categoriesObj)
    //get date from statement
    let date = debitCardAccFile[7][0].split("/")
    //make chart object with year month and chart values
    let chartObject = {
      month: Number(date[0]),
      year: Number(date[2]),
      graph: {
        earned: earned,
        DC_Spent: DC_Spent,
        CC_Spent: CC_Spent
      },
      pie: {
        categories: categoriesObj.categoryTotals
      }
    }
    
    //if the statement year doesnt exist
    // push the year and the object in that year
    if(!statementsByYear.some(array => array.includes(chartObject.year))){
      let yearArray = [chartObject.year]
      let chrtObjArray = [chartObject] 

      yearArray.push(chrtObjArray)
      statementsByYear.push(yearArray)
      statementsByYear.sort()
    }
    //else push it and sort the month
    // in ascending order
    else{
      for(let i = 0; i < statementsByYear.length; i++){
        if(statementsByYear[i][0] == chartObject.year){
          statementsByYear[i][1].push(chartObject)
          statementsByYear[i][1].sort(function(a,b){
            return a.month - b.month
          })
          break;
        }
      }
    }
    let chartData = [] 
    for(let i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == chartObject.year){
        chartData = statementsByYear[i][1]
        break;
      }
    }
    //update flip deleter
    currentTickMonth = chartObject.month
    currentTickYear =  chartObject.year
    tick.value = {
      month: convertMonth(currentTickMonth),
      year: currentTickYear 
    } 
    
    pushDataToCharts(chartData)
  }

  function pushDoughnutDataToCharts(data){
    let doughnutChartLabels = []
    let doughnutTotal = []
    let doughnutColor = []

    data.pie.categories.forEach(category => {
      doughnutChartLabels.push(category[0])
      doughnutTotal.push(parseFloat(category[1]).toFixed(2))
      doughnutColor.push(getColor())
    })
    doughnutData.labels = doughnutChartLabels
    doughnutData.datasets[0].data = doughnutTotal
    doughnutData.datasets[0].backgroundColor = doughnutColor

    currentMonth = data.month
    document.getElementById("monthHeader").innerHTML = convertMonth(data.month)

    myDoughnutChart.update()

  }

  function pushDataToCharts(chartData){
    let chartLabels= []
    let chartIncomes = []
    let chartTotalSpent = []
    let chartNetAmounts = []
    let chartDCAmounts = []
    let chartCCAmounts = []
    
    chartData.forEach(element => {
      chartLabels.push(convertMonth(element.month))
      chartIncomes.push(element.graph.earned)
      chartTotalSpent.push(element.graph.CC_Spent + element.graph.DC_Spent)
      chartNetAmounts.push(element.graph.earned - (element.graph.DC_Spent + element.graph.CC_Spent))
      chartCCAmounts.push(element.graph.CC_Spent)
      chartDCAmounts.push(element.graph.DC_Spent)       
    })

    pushDoughnutDataToCharts(chartData[0])

    data.labels = chartLabels
    data.datasets[0].data = chartIncomes
    data.datasets[1].data = chartTotalSpent
    data.datasets[2].data = chartNetAmounts

    lineData.labels = chartLabels
    lineData.datasets[0].data = chartCCAmounts
    lineData.datasets[1].data = chartDCAmounts

    //update year in header
    currentyYear = chartData[0].year
    document.querySelectorAll('.yearHeader').forEach(element => element.innerHTML = chartData[0].year)

    myBarChart.update()
    myLineChart.update()
  }

  //traverse a stmt year func
  function traverseForwardAYear(){
    for(i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentyYear){
        if(statementsByYear[i + 1] != undefined){
          pushDataToCharts(statementsByYear[i + 1][1])
        }
        break;
      }
    }
    }
  function traverseBackAYear(){
    for(i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentyYear){
        if(statementsByYear[i - 1] != undefined){
          pushDataToCharts(statementsByYear[i - 1][1])
        }
        break;
      }
    }
  }

  function traverseForwardAMonth(){
    for(i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentyYear){
        let year = statementsByYear[i][1]
        for(j = 0; j < year.length; j++){
          if(year[j].month == currentMonth){
            if(year[j + 1] != undefined){
              pushDoughnutDataToCharts(year[j + 1])
            }
            break;
          }
        }
      }
    }
  }

  function traverseBackAMonth(){
    for(i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentyYear){
        let year = statementsByYear[i][1]
        for(j = 0; j < year.length; j++){
          if(year[j].month == currentMonth){
            if(year[j - 1] != undefined){
              pushDoughnutDataToCharts(year[j - 1])
            }
            break;
          }
        }
      }
    }
  }

  function tickUpAYear(){
    for(i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentTickYear){
        if(statementsByYear[i + 1] != undefined){
          currentTickYear = statementsByYear[i + 1][0]
          currentTickMonth = statementsByYear[i + 1][1][0].month
          tick.value = {
            month: convertMonth(currentTickMonth),
            year: currentTickYear
          } 
        }
        break;
      }
    }
  }
 
  function tickDownAYear(){
    for(i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentTickYear){
        if(statementsByYear[i - 1] != undefined){
          currentTickYear = statementsByYear[i - 1][0]
          currentTickMonth = statementsByYear[i - 1][1][0].month
          tick.value = {
            month: convertMonth(currentTickMonth),
            year: currentTickYear
          } 
        }
        break;
      }
    }
  }

  function tickUpAMonth(){
    for(i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentTickYear){
        let year = statementsByYear[i][1]
        for(j = 0; j < year.length; j++){
          if(year[j].month == currentTickMonth){
            if(year[j + 1] != undefined){
              currentTickMonth = year[j + 1].month
              tick.value = {
                month: convertMonth(currentTickMonth),
                year: currentTickYear
              } 
            }
            break;
          }
        }
      }
    }
  }

  function tickDownAMonth(){
    for(i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentTickYear){
        let year = statementsByYear[i][1]
        for(j = 0; j < year.length; j++){
          if(year[j].month == currentTickMonth){
            if(year[j - 1] != undefined){
              currentTickMonth = year[j - 1].month
              tick.value = {
                month: convertMonth(currentTickMonth),
                year: currentTickYear
              }
            }
            break;
          }
        }
      }
    }
  }

  function deleteAMonth(){
    for(i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentTickYear){
        let year = statementsByYear[i][1]
        console.log(year)
        for(j = 0; j < year.length; j++){
          if(year[j].month == currentTickMonth){
            if(year[j - 1] != undefined){
             tickDownAMonth()
             console.log(year)
             console.log(currentMonth) 
             console.log(currentTickMonth) 
            }
            else if(year[j + 1] != undefined){
              tickUpAMonth()
              console.log(year)
             console.log(currentMonth) 
             console.log(currentTickMonth)
            }
            year.splice(j, 1)

            if(!year.length == 0){
              pushDataToCharts(year)    
              console.log("*******************")
              console.log(year)
             console.log(currentMonth) 
             console.log(currentTickMonth)
            }
            else{
              if(statementsByYear[i - 1] != undefined){
                tickDownAYear()
                traverseBackAYear()
                console.log(year)
             console.log(currentyYear) 
             console.log(currentTickYear)
              }
              else if(statementsByYear[i + 1] != undefined){
                tickUpAYear()
                traverseForwardAYear()
                console.log(year)
             console.log(currentyYear) 
             console.log(currentTickYear)
              }
              statementsByYear.splice(i, 1)
              if(statementsByYear.length == 0){
                tick.value = {
                  month: "Month",
                  year: "2000"
              }
              document.querySelectorAll('.yearHeader').forEach(element => element.innerHTML = "Year")
              document.getElementById("monthHeader").innerHTML = "Month"
              removeData(myBarChart)
              removeData(myLineChart)
              removeData(myDoughnutChart)
              }
            }            
            break;
          }
        }
      }
    }
  }

  function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}
$("#addDataBtn").addEventListener("click", sortDatesAndPushToChart)
$("#RightYearButton").addEventListener("click", traverseForwardAYear)
$("#leftYearButton").addEventListener("click", traverseBackAYear)
$("#RightMonthButton").addEventListener("click", traverseForwardAMonth)
$("#leftMonthButton").addEventListener("click", traverseBackAMonth)
$("#tickUpAYear").addEventListener("click", tickUpAYear)
$("#tickDownAYear").addEventListener("click", tickDownAYear)
$("#tickUpAMonth").addEventListener("click", tickUpAMonth)
$("#tickDownAMonth").addEventListener("click", tickDownAMonth)
$("#deleteDataBtn").addEventListener("click", deleteAMonth)