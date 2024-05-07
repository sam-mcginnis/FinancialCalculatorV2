//catgories file upload section
//converts rejected description
//and every category into its arrays
var rejectedDescriptionsFile = []
var spendingCategories = []

//Statements by year
var statementsByYear = []
var currentYear = 0
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
      let stripped = (debitCardAccFile[i][2] != undefined) ?  parseFloat(debitCardAccFile[i][2].replace(/,/g, "")) : 1

      if(stripped < 0){
          if(!checkIfRejected(debitCardAccFile[i][1].toLowerCase(), rejectedDescriptionsFile[0])){
            calculateDebitCategories(debitCardAccFile[i], categoriesObj)
            totalDebit +=  parseFloat(debitCardAccFile[i][2].replace(/,/g, ""))
          }
        }
      }
    
    return Math.abs(parseFloat(totalDebit).toFixed(2))
  }

  function getTotalCredits(creditCardAccFile, categoriesObj){
    let totalCredit = 0
  
    for(let i = 1; i < creditCardAccFile.length; i++){
      let stripped = (creditCardAccFile[i][4] != undefined) ? parseFloat(creditCardAccFile[i][4].replace(/,/g, "")) : 1
      if(stripped < 0){
        if(!checkIfRejected(creditCardAccFile[i][2].toLowerCase(), rejectedDescriptionsFile[0])){
          calculateCreditCategories(creditCardAccFile[i], categoriesObj)
          totalCredit += parseFloat(creditCardAccFile[i][4].replace(/,/g, ""))
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

  function checkIfRejected(statement, listOfDesc){
    for(let rejectedDescription in listOfDesc){
      if (statement.includes(listOfDesc[rejectedDescription])){
        return true
      }
    }
    return false
  }

  function calculateDebitCategories(statement, categoriesObj){
    let arrayValues = checkOtherCatgory(statement[1])
      
    if(arrayValues == null){
      for(let j = 0; j < categoriesObj.categoryTotals.length; j++){
        if(categoriesObj.categoryTotals[j][0] == "Other"){
          categoriesObj.categoryTotals[j][1] += Math.abs(statement[2].replace(/,/g, ""))
          categoriesObj.categoryTotals[j][2].push(statement[0] + " - " + statement[1] + ": " + statement[2])
          return
        }
      }
        let categoryTotal = []
        categoryTotal.push("Other")
        categoryTotal.push(Math.abs(statement[2].replace(/,/g, "")))

        let categoryList = []
        categoryList.push(statement[0] + " - " + statement[1] + ": " + statement[2])
        categoryTotal.push(categoryList)

        categoriesObj.categoryTotals.push(categoryTotal)
    }
    else{
      if(categoriesObj.categoryTotals.some(file => file.includes(arrayValues[0]))){
        for(let l = 0; l < categoriesObj.categoryTotals.length; l++){
          if(categoriesObj.categoryTotals[l][0] == arrayValues[0]){
            categoriesObj.categoryTotals[l][1] += Math.abs(statement[2].replace(/,/g, ""))
            categoriesObj.categoryTotals[l][2].push(statement[0] + " - " + statement[1] + ": " + statement[2])
            return
          }
        }              
      }
      let categoryTotal = []
      categoryTotal.push(arrayValues[0])
      categoryTotal.push(Math.abs(statement[2].replace(/,/g, "")))

      let categoryList = []
      categoryList.push(statement[0] + " - " + statement[1] + ": " + statement[2])
      categoryTotal.push(categoryList)

      categoriesObj.categoryTotals.push(categoryTotal)
    }
  }

  function calculateCreditCategories(statement, categoriesObj){
    let arrayValues = checkOtherCatgory(statement[2])

    if(arrayValues == null){
      for(let j = 0; j < categoriesObj.categoryTotals.length; j++){
        if(categoriesObj.categoryTotals[j][0] == "Other"){
          categoriesObj.categoryTotals[j][1] += Math.abs(statement[4].replace(/,/g, ""))
          categoriesObj.categoryTotals[j][2].push(statement[0] + " - " + statement[2] + ": " + statement[4])
          return
        }
      }

    let categoryTotal = []
        categoryTotal.push("Other")
        categoryTotal.push(Math.abs(statement[4].replace(/,/g, "")))

        let categoryList = []
        categoryList.push(statement[0] + " - " + statement[2] + ": " + statement[4])
        categoryTotal.push(categoryList)            
        categoriesObj.categoryTotals.push(categoryTotal)
    }
    else{
      if(categoriesObj.categoryTotals.some(file => file.includes(arrayValues[0]))){
        for(let l = 0; l < categoriesObj.categoryTotals.length; l++){
          if(categoriesObj.categoryTotals[l][0] == arrayValues[0]){
            categoriesObj.categoryTotals[l][1] += Math.abs(statement[4].replace(/,/g, ""))
            categoriesObj.categoryTotals[l][2].push(statement[0] + " - " + statement[2] + ": " + statement[4])
            return
          }
        }              
      }

      let categoryTotal = []
      categoryTotal.push(arrayValues[0])
      categoryTotal.push(Math.abs(statement[4].replace(/,/g, "")))

      let categoryList = []
      categoryList.push(statement[0] + " - " + statement[2] + ": " + statement[4])
      categoryTotal.push(categoryList)

      categoriesObj.categoryTotals.push(categoryTotal)
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
     //get date from statement
     let date = debitCardAccFile[7][0].split("/")

     if(isDuplicateMonth(date) === true){
      alert(convertMonth(Number(date[0])) + " already exists for the year " + date[2])
      return
     }

    let categoriesObj = {categoryTotals: []}
    let earned = getTotalIncome(debitCardAccFile)
    let DC_Spent = getTotalDebits(debitCardAccFile, categoriesObj)
    let CC_Spent =  getTotalCredits(creditCardAccFile, categoriesObj)
   
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
    // set flip deleter
    currentTickMonth = chartObject.month
    currentTickYear = chartObject.year

    pushDataToCharts(chartData)
  }

  function pushDoughnutDataToCharts(chartData){
    let doughnutChartLabels = []
    let doughnutTotal = []
    let doughnutColor = []


    chartData.pie.categories.forEach(category => {
      doughnutChartLabels.push(category[0])
      doughnutTotal.push(parseFloat(category[1]).toFixed(2))
      doughnutColor.push(getColor())
    })
    doughnutData.labels = doughnutChartLabels
    doughnutData.datasets[0].data = doughnutTotal
    doughnutData.datasets[0].backgroundColor = doughnutColor

    currentMonth = chartData.month
    document.querySelectorAll('.monthHeader').forEach(element => element.innerHTML = convertMonth(chartData.month))    

    myDoughnutChart.update()

  }

  function buildCategoryLineChartObj(chartData){
    let map = new Map()
    let datasets= []
    let count = 0
    chartData.forEach(element => {
      element.pie.categories.forEach(category => {
        if(map.has(category[0])){
          if(count == map.get(category[0]).length){
            map.get(category[0]).push(category[1])
          }
          else{
            while(count > map.get(category[0]).length){
              map.get(category[0]).push(null)
            }
            map.get(category[0]).push(category[1])
          }
        }
        else{
          let key = []
          for(let i = 0; i < count; i++){
            key.push(null)
          }
          key.push(category[1])
          map.set(category[0], key)
        }
      })
      count++
    })
    map.forEach((k, v) => {
      let color = getColor()
      datasets.push(
        {
          label: v,
          data: k,
          backgroundColor: color,
          borderColor: color,
          borderWidth: 2
        }
      )
    })
    return datasets
  }

  function buildCategoryBarChartObj(chartData){
    let budgetBar = []
    let spentBar = []
    let netAmountBar = []
    let labels = []


    chartData.pie.categories.forEach(category => {
      let label = category[0]
      let spent = parseFloat(category[1]).toFixed(2)
      let budgetAmount = parseFloat(category[3]).toFixed(2)
      let parsedBudgetAmount =(!isNaN(budgetAmount) ? budgetAmount : (categoryBudgetMap.get(label) ? categoryBudgetMap.get(label) : 0.00))
      
      //set budget amount on chart obj
      category[3] = parsedBudgetAmount

      labels.push(label)
      spentBar.push(spent)
      budgetBar.push(parsedBudgetAmount)
      netAmountBar.push(parsedBudgetAmount - spent)
    })


    categoryData.datasets[0].data = budgetBar
    categoryData.datasets[1].data = spentBar
    categoryData.datasets[2].data = netAmountBar
    categoryData.labels = labels
    
    currentMonth = chartData.month
    document.querySelectorAll('.monthHeader').forEach(element => element.innerHTML = convertMonth(chartData.month))    
    
    categoryMyBarChart.update()

  }

  function  pushDataToCharts(chartData){
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

    
    // Logic to handle categories line chart
    let datasets = buildCategoryLineChartObj(chartData)
    catergoryLineData.labels = chartLabels
    catergoryLineData.datasets = datasets

    // Logic to handle budget bar chart
    buildCategoryBarChartObj(chartData[chartData.length - 1])
  
    //Logic to handle doughnut chart
    pushDoughnutDataToCharts(chartData[chartData.length - 1])

    data.labels = chartLabels
    data.datasets[0].data = chartIncomes
    data.datasets[1].data = chartTotalSpent
    data.datasets[2].data = chartNetAmounts

    lineData.labels = chartLabels
    lineData.datasets[0].data = chartCCAmounts
    lineData.datasets[1].data = chartDCAmounts
    
    
    // update flip deleter
    if(currentTickMonth === 0 || currentTickYear === 0){
      currentTickMonth = chartData[0].month
      currentTickYear = chartData[0].year
    }
    
    tick.value = {
      month: convertMonth(currentTickMonth),
      year: currentTickYear 
    } 
    
    //update year in header
    currentYear = chartData[0].year
    document.querySelectorAll('.yearHeader').forEach(element => element.innerHTML = chartData[0].year)
    
    myBarChart.update()
    myLineChart.update()
    categoryMyLineChart.update()
  }

  //traverse a stmt year func
  function traverseForwardAYear(){
    jQuery("#rightYearButton").trigger("blur");
    for(let i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentYear){
        if(statementsByYear[i + 1] != undefined){
          pushDataToCharts(statementsByYear[i + 1][1])
        }
        break;
      }
    }
    }
  function traverseBackAYear(){
    jQuery("#leftYearButton").trigger("blur");
    for(let i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentYear){
        if(statementsByYear[i - 1] != undefined){
          pushDataToCharts(statementsByYear[i - 1][1])
        }
        break;
      }
    }
  }

  function traverseForwardAMonth(){
    jQuery("#rightMonthButton").trigger("blur");
    for(let i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentYear){
        let year = statementsByYear[i][1]
        for(let j = 0; j < year.length; j++){
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
//for budget graph
  function traverseBackAMonthforBudget(){
    jQuery("#leftMonthBudgetButton").trigger("blur");
    for(let i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentYear){
        let year = statementsByYear[i][1]
        for(let j = 0; j < year.length; j++){
          if(year[j].month == currentMonth){
            if(year[j - 1] != undefined){
              buildCategoryBarChartObj(year[j - 1])
            }
            break;
          }
        }
      }
    }
  }

//for budget graph
  function traverseForwardAMonthforBudget(){
    jQuery("#rightMonthBudgetButton").trigger("blur");
    for(let i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentYear){
        let year = statementsByYear[i][1]
        for(let j = 0; j < year.length; j++){
          if(year[j].month == currentMonth){
            if(year[j + 1] != undefined){
              buildCategoryBarChartObj(year[j + 1])
            }
            break;
          }
        }
      }
    }
  }

  function traverseBackAMonth(){
    jQuery("#leftMonthButton").trigger("blur");
    for(let i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentYear){
        let year = statementsByYear[i][1]
        for(let j = 0; j < year.length; j++){
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
    for(let i = 0; i < statementsByYear.length; i++){
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
    for(let i = 0; i < statementsByYear.length; i++){
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
    for(let i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentTickYear){
        let year = statementsByYear[i][1]
        for(let j = 0; j < year.length; j++){
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
    for(let i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentTickYear){
        let year = statementsByYear[i][1]
        for(let j = 0; j < year.length; j++){
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

  function findCurrentTickYearIndex(){
    for(let i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentTickYear){
        return i
      }
    }
  }

  function findCurrentYearIndex(){
    for(let i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentYear){
        return i
      }
    }
  }
  function findCurrentMonthIndex(){
    for(let i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentYear){
        let year = statementsByYear[i][1]
        for(let j = 0; j < year.length; j++){
          if(year[j].month == currentMonth){
            return j
          }
        }
      }
    }
  }

  function deleteAMonth(){
    for(let i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentTickYear){
        let year = statementsByYear[i][1]
        for(let j = 0; j < year.length; j++){
          if(year[j].month == currentTickMonth){
            if(year[j - 1] != undefined){
             tickDownAMonth()
            }
            else if(year[j + 1] != undefined){
              tickUpAMonth()
            }
            year.splice(j, 1)

            if(!year.length == 0){
              pushDataToCharts(year)    
            }
            else{
              if(statementsByYear[i - 1] != undefined){
                tickDownAYear()
                pushDataToCharts(statementsByYear[findCurrentTickYearIndex()][1])
              }
              else if(statementsByYear[i + 1] != undefined){
                tickUpAYear()
                pushDataToCharts(statementsByYear[findCurrentTickYearIndex()][1])
              }
              statementsByYear.splice(i, 1)
              if(statementsByYear.length == 0){
                tick.value = {
                  month: "Month",
                  year: "Year"
                }
              document.querySelectorAll('.yearHeader').forEach(element => element.innerHTML = "Year")
              document.querySelectorAll('.monthHeader').forEach(element => element.innerHTML = "Month")
              removeData(myBarChart)
              removeData(categoryMyBarChart)
              removeData(myLineChart)
              removeData(categoryMyLineChart)
              removeData(myDoughnutChart)
              }
            }            
            break;
          }
        }
      }
    }
  }

  //gets list of itemized expenditures for a specific category in a specific month
  function getCategoryList(label){
    for(let i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentYear){
        let year = statementsByYear[i][1]
        for(let j = 0; j < year.length; j++){
          if(year[j].month == currentMonth){
            let categoryList = year[j].pie.categories
            for(let k = 0; k < categoryList.length; k++){
              if(categoryList[k][0] == label){
                return categoryList[k][2]
              }
            }
          }
        }
      }
    }
  }
//get a list of categories for a specific month
  function getCategories(){
    for(let i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == currentYear){
        let year = statementsByYear[i][1]
        for(let j = 0; j < year.length; j++){
          if(year[j].month == currentMonth){
            return (year[j].pie.categories)            
          }
        }
      }
    }
  }

  function removeData(chart) {
    chart.data.labels.length = 0;
    chart.data.datasets.forEach((dataset) => {
      dataset.data.length = 0
    });
    chart.update();
  }

  //error handling
  function isDuplicateMonth(date){
    let month = Number(date[0])
    let year = Number(date[2])
    for(let i = 0; i < statementsByYear.length; i++){
      if(statementsByYear[i][0] == year){
        let months = statementsByYear[i][1]
        for(let j = 0; j < months.length; j++){
          if(months[j].month == month){
            return true
          }
        }       
      }
    }
    return false
  }


// add budget to popup modal on budget tab/chart
  function addBudget(){
    let modal = document.getElementById('modalList')
    let list = document.createElement('ul')

    jQuery('#modalList').empty()

    list.style.listStyleType = 'none'
    modal.appendChild(list)
    
    document.getElementById('modalTitle').innerHTML = "Add Budget"
    let categories = getCategories()

    if(!categories){
      window.alert("You need to add data for this feature.")
      return
    }

    categories.forEach((item) => {
      let li = document.createElement("li");
      li.innerHTML = item[0] + "<div class=\"input-group mb-3 col-6\"><div class=\"input-group-prepend\"><span class=\"input-group-text\">$</span></div><input type=\"number\" min=\"0.00\" value=" + item[3] + " class=\"form-control budgetAmount\" aria-label=\"Amount (to the nearest dollar)\" step=\".01\"></div>"
      list.appendChild(li);
  })

  document.getElementById('modalFooter').innerHTML = "<button id=\"collectBudget\" type=\"button\" class=\"btn btn-secondary btn-success\">Submit</button>"

    jQuery('#myModal').modal()

    $("#collectBudget").addEventListener("click", collectBudget)


  }

  function collectBudget(){
    let budgetAmounts = []
    let newBudgetArray = new Map()
    document.querySelectorAll('.budgetAmount').forEach(element => {
      budgetAmounts.push(element.value)
    })

    getCategories().forEach(element=> 
      {
        element[3] = parseFloat(budgetAmounts.shift()).toFixed(2)
        
        newBudgetArray.set(element[0], element[3])
      })
      categoryBudgetMap = new Map([...categoryBudgetMap, ...newBudgetArray])
      jQuery('#myModal').modal('toggle')

    buildCategoryBarChartObj(statementsByYear[findCurrentYearIndex()][1][findCurrentMonthIndex()])


  }

  function scrollChartIntoView(){
    $("#chartView").scrollIntoView({behavior:"smooth"});

  }
  const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))


//loop through tabs of charts to initialize them on start up 
  jQuery(document).ready(async function(){
    let tabArray= ['home','menu1', 'menu2', 'menu3', 'menu4','home']
    for(let tab of tabArray){
      await sleepNow(10)
      activateTab(tab);
    }
  });
  
  function activateTab(tab){
    jQuery('.nav-tabs a[href="#' + tab + '"]').tab('show');
  };
$("#addDataBtn").addEventListener("click", sortDatesAndPushToChart)
$("#rightYearButton").addEventListener("click", traverseForwardAYear)
$("#leftYearButton").addEventListener("click", traverseBackAYear)
$("#rightMonthButton").addEventListener("click", traverseForwardAMonth)
$("#leftMonthButton").addEventListener("click", traverseBackAMonth)
$("#rightMonthBudgetButton").addEventListener("click", traverseForwardAMonthforBudget)
$("#leftMonthBudgetButton").addEventListener("click", traverseBackAMonthforBudget)
$("#tickUpAYear").addEventListener("click", tickUpAYear)
$("#tickDownAYear").addEventListener("click", tickDownAYear)
$("#tickUpAMonth").addEventListener("click", tickUpAMonth)
$("#tickDownAMonth").addEventListener("click", tickDownAMonth)
$("#deleteDataBtn").addEventListener("click", deleteAMonth)
$(".nav-tabs").addEventListener("click", scrollChartIntoView)
$("#editBudget").addEventListener("click", addBudget)


