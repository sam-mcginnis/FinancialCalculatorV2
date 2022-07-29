//catgories file upload section
var rejectedDescriptionsFile = []
var spendingCategories = []

//Statements by year
var statementsByYear = []
var currentyYear = 0
//statement file upload section
var debitCardAccFile = []
var creditCardAccFile =[]

  function getTotalIncome(debitCardAccFile){
    let stripped = debitCardAccFile[2][2].replace(/,/g, "");
    let number = parseFloat(stripped);
    return number
  }

  function getTotalDebits(debitCardAccFile){
    let totalDebit= 0

    for(let i = 8; i < debitCardAccFile.length; i++){
      if(debitCardAccFile[i][2] < 0){
          if(!rejectedDescriptionsFile.some(file => file.includes(debitCardAccFile[i][1]))){
          totalDebit += Number(debitCardAccFile[i][2])
          }
        }
      }
    
    return Math.abs(parseFloat(totalDebit).toFixed(2))
  }

  function getTotalCredits(creditCardAccFile){
    let totalCredit = 0
  
    for(let i = 1; i < creditCardAccFile.length; i++){
      if(creditCardAccFile[i][4] < 0){
        if(!rejectedDescriptionsFile.includes(creditCardAccFile[i][2])){
          totalCredit += Number(creditCardAccFile[i][4])
        }     
      }
    }
    return Math.abs(parseFloat(totalCredit).toFixed(2))
   
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
  function sortDatesAndPushToChart(){
    //get date from statement
    let date = debitCardAccFile[7][0].split("/")
    //make chart object with year month and chart values
    let chartObject = {
      month: Number(date[0]),
      year: Number(date[2]),
      earned: getTotalIncome(debitCardAccFile),
      DC_Spent: getTotalDebits(debitCardAccFile),
      CC_Spent: getTotalCredits(creditCardAccFile)
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
    console.log(spendingCategories)
    pushDataToCharts(chartData)
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
      chartIncomes.push(element.earned)
      chartTotalSpent.push(element.CC_Spent + element.DC_Spent)
      chartNetAmounts.push(element.earned - (element.DC_Spent + element.CC_Spent))
      chartCCAmounts.push(element.CC_Spent)
      chartDCAmounts.push(element.DC_Spent)    
    })
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

  //add traverse year func
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
 
$("#addDataBtn").addEventListener("click", sortDatesAndPushToChart)
$("#RightYearButton").addEventListener("click", traverseForwardAYear)
$("#leftYearButton").addEventListener("click", traverseBackAYear)

