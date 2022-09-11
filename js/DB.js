function storeData() {

    localStorage.setItem("statementsByYear", JSON.stringify(statementsByYear))
    localStorage.setItem("rejectedDescriptionsFile", JSON.stringify(rejectedDescriptionsFile))
    localStorage.setItem("spendingCategories", JSON.stringify(spendingCategories))
    localStorage.setItem("event_data", JSON.stringify(event_data))
    localStorage.setItem("todoList", JSON.stringify(todoList))
}

function loadData(){
    let setStatementsByYear = JSON.parse(localStorage.getItem("statementsByYear"))
    let setRejectedDescriptionsFile = JSON.parse(localStorage.getItem("rejectedDescriptionsFile"))
    let setSpendingCategories = JSON.parse(localStorage.getItem("spendingCategories"))
    let setEvent_data = JSON.parse(localStorage.getItem("event_data"))
    let setTodoList = JSON.parse(localStorage.getItem("todoList"))

    if(setRejectedDescriptionsFile != null){
        rejectedDescriptionsFile = setRejectedDescriptionsFile
    }
    if(setSpendingCategories != null){
        spendingCategories = setSpendingCategories
    }
    if(setStatementsByYear != null){
        statementsByYear = setStatementsByYear
    }
    if(setEvent_data != null){
        event_data = setEvent_data
    }
    if(setTodoList != null){
        todoList = setTodoList
        printListOnLoad()
    }
    if(statementsByYear.length != 0){
        pushDataToCharts(statementsByYear[0][1])
    }
}

window.addEventListener("load", loadData);
window.addEventListener("beforeunload", storeData);
