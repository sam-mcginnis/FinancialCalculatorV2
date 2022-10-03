var todoList = [];
var currentMonthTodoList = 0;

(function($) {
    'use strict';
    $(function() {
      var todoListItem = $('.todo-list');
      var todoListInput = $('.todo-list-input');
      $('.todo-list-add-btn').on("click", function(event) {
        event.preventDefault();
        $(this).trigger("blur");
        var item = $(this).prevAll('.todo-list-input').val();
        if (item) {
          let wrapper = []
          wrapper.push(item.trim())
          todoList.push(wrapper)
          todoListItem.append("<li><div class='form-check'><label class='form-check-label'><input class='checkbox' type='checkbox'/>" + item + "<i class='input-helper'></i></label></div><i class='remove fa fa-trash-o'></i></li>");
          todoListInput.val("");
        }
  
      });
  
      todoListItem.on('change', '.checkbox', function() {
        let todoItem = $(this).parent()[0].innerText

        if ($(this).attr('checked')) {
          $(this).removeAttr('checked');
          for(let i = 0; i < todoList.length; i++){
            if(todoList[i][0] == todoItem){
              todoList[i].pop()
              break
            }
          }
        } else {
          for(let i = 0; i < todoList.length; i++){
            if(todoList[i][0] == todoItem){
              todoList[i].push("check")
              break
            }
          }
          $(this).attr('checked', 'checked');
        }
  
        $(this).closest("li").toggleClass('completed');
  
      });
  
      todoListItem.on('click', '.remove', function() {
        
        let todoItem = $(this).parent()[0].innerText
        for(let i = 0; todoList.length; i++){          
          if(todoList[i][0] == todoItem){
            todoList.splice(i, 1)
            break;
          }
        }
        $(this).parent().remove();
      });

      

    });
  })(jQuery);

  function printListOnLoad(){
    //logic to wipe checked boxes
    //at the start of the month
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth()

    if(currentMonth != currentMonthTodoList){
      for(let i = 0; i < todoList.length; i++){
        todoList[i].length = 1
        jQuery('.todo-list').append("<li><div class='form-check'><label class='form-check-label'><input class='checkbox' type='checkbox'/>" + todoList[i][0] + "<i class='input-helper'></i></label></div><i class='remove fa fa-trash-o'></i></li>");
      }
      currentMonthTodoList = currentMonth
    }
    else{
      for(let i = 0; i < todoList.length; i++){
        if(todoList[i][1] == "check"){
          jQuery('.todo-list').append("<li class='completed'><div class='form-check'><label class='form-check-label'><input class='checkbox' type='checkbox' checked='checked' />" + todoList[i][0] + "<i class='input-helper'></i></label></div><i class='remove fa fa-trash-o'></i></li>");
        }
        else{
          jQuery('.todo-list').append("<li><div class='form-check'><label class='form-check-label'><input class='checkbox' type='checkbox'/>" + todoList[i][0] + "<i class='input-helper'></i></label></div><i class='remove fa fa-trash-o'></i></li>");
        }
      }
    }
  }