document.addEventListener("DOMContentLoaded", onPageLoad());

var updateCourseData;
function onPageLoad() {
  window.localStorage.removeItem("ModuleData");
  window.localStorage.removeItem("feeData");
}
function newCourse() {
  localStorage.setItem("edit", false);
 
}

function checkIsEditCourse() {
  updateCourseData = JSON.parse(localStorage.getItem("courseData"));
  setTimeout(() => {
    setDataForCourseEdit();

    setModuleAndFeeData();
    console.log("waqas");
    var submitButton = document.getElementById("submitButton");
    submitButton.innerHTML = "Update";
   
  }, 100);
}

function setModuleAndFeeData(){

  var modulesData = [];
  var feesData = [];
  updateCourseData.modules.forEach((module)=>{
    const data = {
      category: module.category,
      name: module.name,
      credit_hours: module.credit_hours,
      code: module.code,
      status: module.status,
      pre_requisites: module.pre_requisites,
    };
    modulesData.push(data);
  });
  if (window.localStorage.getItem("ModuleData") !== null) {
    const newData = JSON.parse(window.localStorage.getItem("ModuleData"));
    modulesData.forEach(module => {
      newData.push(module);
    });
    // Re-serialize the array back into a string and store it in localStorage
    window.localStorage.setItem("ModuleData", JSON.stringify(newData));

  }
  else
  {
    window.localStorage.setItem("ModuleData", JSON.stringify(modulesData));
  }

  updateCourseData.fees.forEach((fee)=>{
    const data = {
      session: fee.session,
      uk_part_time_fee: fee.uk_part_time_fee,
      uk_part_time_year: fee.uk_part_time_year,
      uk_part_time_total_credit_hours:fee.uk_part_time_total_credit_hours,
      uk_part_time_per_credit_hour: fee.uk_part_time_per_credit_hour,
      uk_full_time_fee: fee.uk_full_time_fee,
      uk_international_foundation_year: fee.uk_international_foundation_year,
      international_full_year_fee: fee.international_full_year_fee,
      international_integrated_foundation_year_fee:
      fee.international_integrated_foundation_year_fee,
      placement_fee: fee.placement_fee,
      additional_cost: fee.additional_cost,
    };
    feesData.push(data);
  });
  if (window.localStorage.getItem("feeData") !== null) {
    const newData = JSON.parse(window.localStorage.getItem("feeData"));
    feesData.forEach(module => {
      newData.push(module);
    });
    // Re-serialize the array back into a string and store it in localStorage
    window.localStorage.setItem("feeData", JSON.stringify(newData));

  }
  else
  {
    window.localStorage.setItem("feeData", JSON.stringify(feesData));
  }



  makeModuleList();
  FeeListng();
}


function setDataForCourseEdit() {
  document.getElementById("title").value = updateCourseData.title;

  if (updateCourseData.level !== "Post Graduate")
    document.getElementById("underGradute").checked = true;

  document.getElementById("full_time").value =
    updateCourseData.full_time_duration;
  document.getElementById("full_time_with_placement").value =
    updateCourseData.full_time_with_placement_duration;
  document.getElementById("full_time_foundation").value =
    updateCourseData.full_time_foundation_duration;
  document.getElementById("part_time").value =
    updateCourseData.part_time_duration;

  var start = updateCourseData.start.split(",");
  if (start.includes("February")) {
    document.getElementById("february").checked = true;
  }
  if (start.includes("April")) {
    document.getElementById("april").checked = true;
  }
  if (start.includes("September")) {
    document.getElementById("september").checked = true;
  }

  document.getElementById("location").value = updateCourseData.location;

  document.getElementById("overview").value = updateCourseData.overview;

  document.getElementById("entryRequirements").value =
    updateCourseData.entry_requirements;
}

function moduleValues(e) {
  e.preventDefault();
  if (window.localStorage.getItem("ModuleData") !== null) {
    var category = document.getElementById("category").value;
    var name = document.getElementById("moduleName").value;
    var credit_hours = document.getElementById("credit_hours").value;
    var code = document.getElementById("code").value;
    var status = document.getElementById("status").value;
    var pre_requisites = document.getElementById("pre_requisites").value;

    const moduleData = {
      category: category,
      name: name,
      credit_hours: credit_hours,
      code: code,
      status: status,
      pre_requisites: pre_requisites,
    };
    // Parse the serialized data back into an aray of objects
    // Push the new data (whether it be an object or anything else) onto the array
    const newData = JSON.parse(window.localStorage.getItem("ModuleData"));
    newData.push(moduleData);
    // Re-serialize the array back into a string and store it in localStorage
    window.localStorage.setItem("ModuleData", JSON.stringify(newData));
  } else {
    var category = document.getElementById("category").value;
    var name = document.getElementById("moduleName").value;
    var credit_hours = document.getElementById("credit_hours").value;
    var code = document.getElementById("code").value;
    var status = document.getElementById("status").value;
    var pre_requisites = document.getElementById("pre_requisites").value;

    const moduleData = [
      {
        category: category,
        name: name,
        credit_hours: credit_hours,
        code: code,
        status: status,
        pre_requisites: pre_requisites,
      },
    ];
    window.localStorage.setItem("ModuleData", JSON.stringify(moduleData));
  }
  // document.getElementById("ModuleForm").reset()
  var inputs = document
    .getElementById("ModuleForm")
    .getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  toggleModal();
  makeModuleList();
}



function toggleModal() {
  document.querySelector(".modal").classList.toggle("show-modal");
}

function toggleModalFee() {
  document.querySelector(".modalFee").classList.toggle("show-modalFee");
}

function showfull() {
  document.getElementById("ukFull").style.display = "block";
  document.getElementById("UkPart").style.display = "none";
}

function showpart() {
  document.getElementById("UkPart").style.display = "block";
  document.getElementById("ukFull").style.display = "none";
}

function FEEValues(e) {
  e.preventDefault();
  var session = document.getElementById("session").value;
  // var uk_part_time = {
  //     fees: document.getElementById('fees').value,
  //     year: document.getElementById('year').value,
  //     credit_hours: document.getElementById('credit_hours_per_hour').value,
  //     per_credit_hour: document.getElementById('per_credit_hour').value
  // }

  var uk_part_time_fee = document.getElementById("fees").value;
  var uk_part_time_year = document.getElementById("year").value;
  var uk_part_time_total_credit_hours = document.getElementById(
    "credit_hours_per_hour"
  ).value;
  var uk_part_time_per_credit_hour =
    document.getElementById("per_credit_hour").value;

  var uk_full_time_fee = document.getElementById("uk_full_time").value;
  var uk_international_foundation_year = document.getElementById(
    "uk_integrated_foundation_year"
  ).value;
  var international_full_year_fee = document.getElementById(
    "international_full_time"
  ).value;
  var international_integrated_foundation_year_fee = document.getElementById(
    "international_integrated_foundation_year"
  ).value;
  var placement_fee = document.getElementById("placement_fee").value;
  var additional_cost = document.getElementById("additional_cost").value;

  const feeData = {
    session: session,
    uk_part_time_fee: uk_part_time_fee,
    uk_part_time_year: uk_part_time_year,
    uk_part_time_total_credit_hours: uk_part_time_total_credit_hours,
    uk_part_time_per_credit_hour: uk_part_time_per_credit_hour,
    uk_full_time_fee: uk_full_time_fee,
    uk_international_foundation_year: uk_international_foundation_year,
    international_full_year_fee: international_full_year_fee,
    international_integrated_foundation_year_fee:
      international_integrated_foundation_year_fee,
    placement_fee: placement_fee,
    additional_cost: additional_cost,
  };


  if (window.localStorage.getItem("feeData") !== null) {
    const newData = JSON.parse(window.localStorage.getItem("feeData"));
    newData.push(feeData);

    // Re-serialize the array back into a string and store it in localStorage
    window.localStorage.setItem("feeData", JSON.stringify(newData));
  } else {
    const data = [feeData];
    window.localStorage.setItem("feeData", JSON.stringify(data));
  }

  toggleModalFee();
  FeeListng();
}

function makeModuleList() {
  //checking if user has entered anny module for this course
  if (window.localStorage.getItem("ModuleData") != null) {
    var data;
 
      // Retrieve data from local storage and parse it into an array
      data = JSON.parse(window.localStorage.getItem("ModuleData"));
  

    // Get a reference to the table body
    var tableBody = document
      .getElementById("moduletable")
      .getElementsByTagName("tbody")[0];
    // Clear the existing table body
    tableBody.innerHTML = "";

    var modal = document.getElementById("addModuleModal");

    // Get all the input elements inside the modal
    var inputs = modal.querySelectorAll("input");
    // Loop through each input element and set its value to an empty string
    inputs.forEach(function (input) {
      input.value = "";
    });

    // Get a reference to the table body
    var tableBody = document
      .getElementById("moduletable")
      .getElementsByTagName("tbody")[0];

    // Iterate over the array and generate table rows and cells
    for (var i = 0; i < data.length; i++) {
      var row = tableBody.insertRow();
      var categoryCell = row.insertCell(0);
      var nameCell = row.insertCell(1);
      var credit_hoursCell = row.insertCell(2);
      var codeCell = row.insertCell(3);
      var statusCell = row.insertCell(4);
      var pre_requisitesCell = row.insertCell(5);
      var delete_moduleCell = row.insertCell(6);

      categoryCell.innerHTML = data[i].category;
      nameCell.innerHTML = data[i].name;
      credit_hoursCell.innerHTML = data[i].credit_hours;
      codeCell.innerHTML = data[i].code;
      statusCell.innerHTML = data[i].status;

      if (data[i].pre_requisites === "") data[i].pre_requisites = "none";
      pre_requisitesCell.innerHTML = data[i].pre_requisites;

      var deleteIcon = document.createElement("img");
      deleteIcon.src = "../Task2/icons/delete.png";
      deleteIcon.onclick = function moduleSelected() {
        var row = this.parentNode.parentNode;
        var rowIndex = row.rowIndex;
        var newData = data;
        newData.splice(rowIndex, 1);

        var table = document.getElementById("moduletable");
        table.deleteRow(rowIndex);

        window.localStorage.setItem("ModuleData", JSON.stringify(newData));
      };
      delete_moduleCell.appendChild(deleteIcon);
    }
    return true;
  } else {
    return false;
  }
}

function showErrorMessage(msg) {
  alert(msg);
}

function FeeListng() {

  if (window.localStorage.getItem("feeData") != null) {
    var data;

   
      // Retrieve data from local storage and parse it into an array
      data = JSON.parse(window.localStorage.getItem("feeData"));
   

    // Get a reference to the table body
    var tableBody = document
      .getElementById("feeTable")
      .getElementsByTagName("tbody")[0];
    // Clear the existing table body
    tableBody.innerHTML = "";

    var modal = document.getElementById("addFeeModal");

    // Get all the input elements inside the modal
    var inputs = modal.querySelectorAll("input");
    // Loop through each input element and set its value to an empty string
    inputs.forEach(function (input) {
      input.value = "";
    });

    // Get a reference to the table body
    var tableBody = document
      .getElementById("feeTable")
      .getElementsByTagName("tbody")[0];

    // Iterate over the array and generate table rows and cells
    for (var i = 0; i < data.length; i++) {
      var row = tableBody.insertRow();
      var session = row.insertCell(0);
      var uk_full_time_fee = row.insertCell(1);
      var uk_part_time_fee = row.insertCell(2);
      var uk_part_time_per_credit_hour = row.insertCell(3);
      var uk_part_time_total_credit_hours = row.insertCell(4);
      var uk_part_time_year = row.insertCell(5);
      var uk_international_foundation_year = row.insertCell(6);
      var international_full_year_fee = row.insertCell(7);
      var international_integrated_foundation_year_fee = row.insertCell(8);
      var placement_fee = row.insertCell(9);
      var additional_cost = row.insertCell(10);
      var delete_feeCell = row.insertCell(11);

      session.innerHTML = data[i].session;
      uk_full_time_fee.innerHTML = data[i].uk_full_time_fee;
      uk_part_time_fee.innerHTML = data[i].uk_part_time_fee;
      uk_part_time_year.innerHTML = data[i].uk_part_time_year;
      uk_part_time_per_credit_hour.innerHTML =
        data[i].uk_part_time_per_credit_hour;
      uk_part_time_total_credit_hours.innerHTML =
        data[i].uk_part_time_total_credit_hours;
      uk_international_foundation_year.innerHTML =
        data[i].uk_international_foundation_year;
      international_full_year_fee.innerHTML =
        data[i].international_full_year_fee;
      international_integrated_foundation_year_fee.innerHTML =
        data[i].international_integrated_foundation_year_fee;
      placement_fee.innerHTML = data[i].placement_fee;
      additional_cost.innerHTML = data[i].additional_cost;

      var deleteIcon = document.createElement("img");
      deleteIcon.src = "../Task2/icons/delete.png";
      deleteIcon.onclick = function feeSelected() {
        var row = this.parentNode.parentNode;
        var rowIndex = row.rowIndex;
        var newData = data;
        newData.splice(rowIndex, 1);
        var table = document.getElementById("feeTable");
        table.deleteRow(rowIndex);
        window.localStorage.setItem("feeData", JSON.stringify(newData));
      };
      delete_feeCell.appendChild(deleteIcon);
    }
    return true;
  } else {
    return false;
  }
}

function convertToTitleCase(str) {
  // Split the string by underscore
  let words = str.split("_");

  // Capitalize the first letter of each word and join them with a space
  let titleCase = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return titleCase;
}

function FormSubmit(event) {
  event.preventDefault();

  if (makeModuleList()) {
    if (FeeListng()) {
       $("body").addClass("loading");

      var title = document.getElementById("title").value;
      var level = document.querySelector('input[name="level"]:checked').value;
      var full_time = document.getElementById("full_time").value;
      var full_time_with_placement = document.getElementById(
        "full_time_with_placement"
      ).value;
      var full_time_foundation = document.getElementById(
        "full_time_foundation"
      ).value;
      var part_time = document.getElementById("part_time").value;

      // var checkboxes = document.getElementsByName('location[]');

      var courseStartCheckBox = document.getElementsByName("courseStart");
      var courseStart = courseStartCheckBox[0].value;
      for (var i = 1, n = courseStartCheckBox.length; i < n; i++) {
        if (courseStartCheckBox[i].checked) {
          courseStart = courseStart + "," + courseStartCheckBox[i].value;
        }
      }

      var location = document.getElementById("location").value;
      var overview = document.getElementById("overview").value;
      var entryRequirements =
        document.getElementById("entryRequirements").value;
      var moduleData = JSON.parse(window.localStorage.getItem("ModuleData"));
      var feeData = JSON.parse(window.localStorage.getItem("feeData"));

      var courseData = {
        title: title,
        level: level,
        full_time_duration: full_time,
        full_time_with_placement_duration: full_time_with_placement,
        full_time_foundation_duration: full_time_foundation,
        part_time_duration: part_time,
        location: location,
        start: courseStart,
        overview: overview,
        modules: moduleData,
        fees: feeData,
        entryRequirements: entryRequirements,
      };
      console.log("Muhammad");
      
      if(localStorage.getItem("edit")==="true"){
        console.log("waqas");
        courseData.id=updateCourseData.Id;
        callUpdateCourseApi(courseData);
      }
      else
      {
        console.log("afzal");
        callAddNewCourseApi(courseData);
      }
      
    } else {
      showErrorMessage("Fee Information is required for adding courses");
    }
  } else {
    showErrorMessage("Modules are required for adding courses");
  }
}


function callUpdateCourseApi(courseData){
  $.ajax({
        url: "http://localhost:3000/updateCourse.php",
        type: "POST",
        data: courseData,
        dataType: "html",
        success: function (data) {
          console.log(data);
        
        
          showSuccessMessage('course updated successfully!');
        
        },
        error: function (xhr, status, error) {
          $("body").removeClass("loading");
          console.log(error);
        },
    });
      clearPageData();
}
function callAddNewCourseApi(courseData){
 $.ajax({
        url: "http://localhost:3000/addCourse.php",
        type: "POST",
        data: courseData,
        dataType: "html",
        success: function (data) {
          showSuccessMessage('API call successful!');
          console.log(data);               
        },
        error: function (xhr, status, error) {
          $("body").removeClass("loading");
          console.log(error);
        },
      });
      clearPageData();
}


function showSuccessMessage(message) {
  const notification = document.getElementById('success-notification');
  const messageSpan = notification.querySelector('.message');

  messageSpan.textContent = message;
  notification.classList.add('show');
  $("body").removeClass("loading");
  setTimeout(function() {
   
    loadPage("generateReport.html");
    onGenerateReportLoad();
    notification.classList.remove('show');
  }, 2000); // Change the timeout duration as needed (in milliseconds)
}




function clearPageData() {
  window.localStorage.removeItem("ModuleData");
  window.localStorage.removeItem("feeData");

  //clearing module table
  var moduleTable = document.getElementById("moduletable");
  var rowCount = moduleTable.rows.length;
  for (var i = rowCount - 1; i > 0; i--) {
    moduleTable.deleteRow(i);
  }

  //clearing fee table
  var feeTable = document.getElementById("feeTable");
  var rowCount = feeTable.rows.length;
  for (var i = rowCount - 1; i > 0; i--) {
    feeTable.deleteRow(i);
  }
}
