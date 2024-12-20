//DOM
const $ = document.querySelector.bind(document);

//APP
let App = {};
App.init = function () {
  //Init
  function handleFileSelect(evt) {
    const files = evt.target.files; // FileList object
    let orderedFiles = []
    let toggle = $("#toggleTitleCheckbox")

    if(toggle.checked && files.length != 0 && isStmtInCategoryUpload(files)){
      alert("Cannot put a statment file in category uploads")
      return
    }

    if(!toggle.checked && files.length > 2){
      alert("You cannot upload more than two files in statment uploads\n" + "1. One must be a stmt.cvs (debit statements)\n" + "2. One must be the credit.cvs (can not contain the phrase stmt.cvs)")
      return
    }

    //files template
    let template = `${Object.keys(files).
    map(file => `<div class="file file--${file}">
     <div class="name"><span>${files[file].name}</span></div>
     <div class="progress active"></div>
     <div class="done">
	<a href="" target="_blank">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000">
		<g><path id="path" d="M500,10C229.4,10,10,229.4,10,500c0,270.6,219.4,490,490,490c270.6,0,490-219.4,490-490C990,229.4,770.6,10,500,10z M500,967.7C241.7,967.7,32.3,758.3,32.3,500C32.3,241.7,241.7,32.3,500,32.3c258.3,0,467.7,209.4,467.7,467.7C967.7,758.3,758.3,967.7,500,967.7z M748.4,325L448,623.1L301.6,477.9c-4.4-4.3-11.4-4.3-15.8,0c-4.4,4.3-4.4,11.3,0,15.6l151.2,150c0.5,1.3,1.4,2.6,2.5,3.7c4.4,4.3,11.4,4.3,15.8,0l308.9-306.5c4.4-4.3,4.4-11.3,0-15.6C759.8,320.7,752.7,320.7,748.4,325z"</g>
		</svg>
						</a>
     </div>
    </div>`).
    join("")}`;


    $("#drop").classList.add("hidden");
    $("footer").classList.add("hasFiles");
    $(".importar").classList.add("active");
    if(!toggle.checked){
      $(".importas").classList.add("active");
    }

    setTimeout(() => {
      $(".list-files").innerHTML = template;
    }, 1000);

    Object.keys(files).forEach(file => {
      let load = 2000 + file * 1000; // fake load
      setTimeout(() => {
        $(`.file--${file}`).querySelector(".progress").classList.remove("active");
        $(`.file--${file}`).querySelector(".done").classList.add("anim");
      }, load);      
      if(files[file].name.includes("stmt")){
        orderedFiles.unshift(files[file])
      }
      else{
        orderedFiles.push(files[file])
      }
    });

    processData(orderedFiles)
  }

  // trigger input
  $("#triggerFile").addEventListener("click", evt => {
    evt.preventDefault();
    $("input[type=file]").click();
  });

  // drop events
  $("#drop").ondragleave = evt => {
    $("#drop").classList.remove("active");
    evt.preventDefault();
  };
  $("#drop").ondragover = $("#drop").ondragenter = evt => {
    $("#drop").classList.add("active");
    evt.preventDefault();
  };
  $("#drop").ondrop = evt => {
    $("input[type=file]").files = evt.dataTransfer.files;
    $("footer").classList.add("hasFiles");
    $("#drop").classList.remove("active");
    evt.preventDefault();
  };

  //upload more
  $(".importar").addEventListener("click", () => {
    $(".list-files").innerHTML = "";
    $("footer").classList.remove("hasFiles");
    $(".importar").classList.remove("active");
    $(".importas").classList.remove("active");
    setTimeout(() => {
      $("#drop").classList.remove("hidden");
    }, 500);
  });

  // input change
  $("input[type=file]").addEventListener("change", handleFileSelect);
}();


function processData(files){
  let toggle = $("#toggleTitleCheckbox")

  if(toggle.checked){
    spendingCategories.length = 0
  }
  //parses debit and credit card statments
  //and converts to an array
  for(let i in files){
    Papa.parse(files[i], {
      complete: function(results) {
        if(!toggle.checked){
          if(files[i].name.includes("stmt")){
            debitCardAccFile = results.data
          }
          else{
            creditCardAccFile = results.data
          }
        }
        else{
          if(files[i].name.includes("rejectedDescriptions")){
            rejectedDescriptionsFile = results.data
          }
          else{
            let categoryList = []

            categoryList.push(files[i].name.substring(0, files[i].name.indexOf(".")))
      
            results.data[0] = results.data[0].map(item => {
              item = item.trim()
              if(!isEmpty(item)){
                return item
              }
            }).filter(item => item) 

            categoryList.push(results.data)
            spendingCategories.push(categoryList)
          }
        }
      }
    });
  }

}

function isStmtInCategoryUpload(files){
  for(let i = 0; i < files.length; i++){
    if(files[i].name.includes("stmt")){
      return true
    }
  }
  return false
}

function isToggleChecked(){
  let toggle = $("#toggleTitleCheckbox")
  let toggleTitle = $("#uploadToggleTitle")
  //animation for text
  toggleTitle.classList.remove("uploadToggleTitleAfterLoad");
  toggleTitle.classList.remove("uploadToggleTitle");
  void toggleTitle.offsetWidth;
  toggleTitle.classList.add("uploadToggleTitleAfterLoad");

  if(toggle.checked){
    toggleTitle.innerHTML = "Upload Categories"
  }
  else{
    toggleTitle.innerHTML = "Upload Statments"
  }
}

function isEmpty(str) {
  return (!str || str.length === 0 );
}


$("#toggleTitleCheckbox").addEventListener("click", isToggleChecked)