// event listener when page get is loaded
document.addEventListener("DOMContentLoaded", onPageLoad());

var updateCourseData; // contatins data for course to be updated

/* 
This fucntion gets called whenever page is laoded.
It clears all previous data if present. 
*/
function onPageLoad() {
  window.localStorage.removeItem("ModuleData");
  window.localStorage.removeItem("feeData");
}

/* 
If page is opened for adding a new course. 
*/
function newCourse() {
  localStorage.setItem("edit", false); // setting edit page variable in local storage to false.
}

/* 
This function gets called if course needs to be updated.
It gets course data and saves it in variable and call other functions to displat data in respective fields.
*/
function checkIsEditCourse() {
  updateCourseData = JSON.parse(localStorage.getItem("courseData"));
  setTimeout(() => {
    setDataForCourseEdit();
    setModuleAndFeeData();

    // changing text of sumit button from submit to uodate
    var submitButton = document.getElementById("submitButton"); 
    submitButton.innerHTML = "Update";
  }, 100);
}

/* 
This function sets module and fee data for course to be upodate.
 */
function setModuleAndFeeData() {
  var modulesData = []; //  all modules from course.
  var feesData = []; // all fee data from course.

  // iterating over each module and saving it in local storage in order to be displayed in a table/
  updateCourseData.modules.forEach((module) => {
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

  // if already some modules are there then adding it to previously sotered data
  if (window.localStorage.getItem("ModuleData") !== null) {
    const newData = JSON.parse(window.localStorage.getItem("ModuleData"));
    modulesData.forEach((module) => {
      newData.push(module);
    });
    // Re-serialize the array back into a string and store it in localStorage
    window.localStorage.setItem("ModuleData", JSON.stringify(newData));
  } else {
    window.localStorage.setItem("ModuleData", JSON.stringify(modulesData));
  }

  // iterating over each fee and saving it in local storage in order to be displayed in a table/
  updateCourseData.fees.forEach((fee) => {
    const data = {
      session: fee.session,
      uk_part_time_fee: fee.uk_part_time_fee,
      uk_part_time_year: fee.uk_part_time_year,
      uk_part_time_total_credit_hours: fee.uk_part_time_total_credit_hours,
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

  // if already some fee data is there then adding it to previously sotered data
  if (window.localStorage.getItem("feeData") !== null) {
    const newData = JSON.parse(window.localStorage.getItem("feeData"));
    feesData.forEach((module) => {
      newData.push(module);
    });
    // Re-serialize the array back into a string and store it in localStorage
    window.localStorage.setItem("feeData", JSON.stringify(newData));
  } else {
    window.localStorage.setItem("feeData", JSON.stringify(feesData));
  }

  
  makeModuleList(); // calling function to display course module data in table.
  FeeListng(); // calling function to display course fee data in table.
}


/* 
This fucntion sets all other data of course to be updated except module and fee.
*/
function setDataForCourseEdit() {
  document.getElementById("title").value = updateCourseData.title; // setting title of course.

  if (updateCourseData.level !== "Post Graduate")
    document.getElementById("underGradute").checked = true; // setting level of course.

  document.getElementById("full_time").value =
    updateCourseData.full_time_duration; // setting full time duration of course.
  document.getElementById("full_time_with_placement").value =
    updateCourseData.full_time_with_placement_duration; // setting full time with placement durtation of course.
  document.getElementById("full_time_foundation").value =
    updateCourseData.full_time_foundation_duration;  // setting full time foundation durtation of course.
  document.getElementById("part_time").value =
    updateCourseData.part_time_duration;  // setting part time durtation of course.

  // setting course stqart values
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

  document.getElementById("location").value = updateCourseData.location;  // setting location of course.

  document.getElementById("overview").value = updateCourseData.overview; // setting overview of course.

  document.getElementById("entryRequirements").value =
    updateCourseData.entry_requirements; // setting entry requiremnts of course.
}

/* 
This fuction gets module values from newly added module of course.
Stores it in local storage and calls function to diplay it in table. 
*/
function moduleValues(e) {
  e.preventDefault();
  if (window.localStorage.getItem("ModuleData") !== null) { // checking if user has created first module. 
    var category = document.getElementById("category").value; // category of module.
    var name = document.getElementById("moduleName").value; // name of module.
    var credit_hours = document.getElementById("credit_hours").value; // credit hours of module.
    var code = document.getElementById("code").value; // code of module.
    var status = document.getElementById("status").value; // status of module.
    var pre_requisites = document.getElementById("pre_requisites").value; // pre requisite of module.

    // creating object of module data
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
    var category = document.getElementById("category").value;  // category of module.
    var name = document.getElementById("moduleName").value; // name of module.
    var credit_hours = document.getElementById("credit_hours").value; // credit hours of module.
    var code = document.getElementById("code").value; // code of module.
    var status = document.getElementById("status").value; // status of module.
    var pre_requisites = document.getElementById("pre_requisites").value; // pre requisite of module.

     // creating object of module data
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

     // Re-serialize the array back into a string and store it in localStorage
    window.localStorage.setItem("ModuleData", JSON.stringify(moduleData));
  }

  // empty all input fields of modal
  var inputs = document
    .getElementById("ModuleForm")
    .getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }

  // closing modal
  toggleModal();

  // calling function to diaply added module in table
  makeModuleList();
}

/* 
This function shows up add module modal. 
*/
function toggleModal() {
  document.querySelector(".modal").classList.toggle("show-modal");
}

/* 
This function shows up add fee modal. 
*/
function toggleModalFee() {
  document.querySelector(".modalFee").classList.toggle("show-modalFee");
}

/* 
This fuction gets module values from newly added fee information of course.
Stores it in local storage and calls function to diplay it in table. 
*/
function FEEValues(e) {
  e.preventDefault();
  var session = document.getElementById("session").value;

  var uk_part_time_fee = document.getElementById("fees").value; // uk part time fees
  var uk_part_time_year = document.getElementById("year").value; // part time total years
  var uk_part_time_total_credit_hours = document.getElementById(
    "credit_hours_per_hour"
  ).value; // per credit hour price
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

  // creating object of fee data
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
    // Parse the serialized data back into an aray of objects
    // Push the new data (whether it be an object or anything else) onto the array
    const newData = JSON.parse(window.localStorage.getItem("feeData"));
    newData.push(feeData);

    // Re-serialize the array back into a string and store it in localStorage
    window.localStorage.setItem("feeData", JSON.stringify(newData));
  } else {
    const data = [feeData];
    // Re-serialize the array back into a string and store it in localStorage
    window.localStorage.setItem("feeData", JSON.stringify(data));
  }

  // cloding modal
  toggleModalFee();

    // calling function to diaply added module in table
  FeeListng();
}

/* 
This funcation gets all modules saved in local storage and dispaly its values in table
*/
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

      // creating delete icon in order to delte module information
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

/* 
This fucntion displays alert for any message passed to it.
*/
function showErrorMessage(msg) {
  alert(msg);
}

/* 
This funcation gets all fee information saved in local storage and dispaly its values in table
*/
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

      // creating delete icon in order to delte fee information
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

/* 
This function converts first letter of string to upper case. 
*/
function convertToTitleCase(str) {
  // Split the string by underscore
  let words = str.split("_");

  // Capitalize the first letter of each word and join them with a space
  let titleCase = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return titleCase;
}

/* 
This function when user click for adding new course or updating course. 
*/
function FormSubmit(event) {
  event.preventDefault();

  if (makeModuleList()) { // calling function to create modules list and checking user has enterd alteast one module
    if (FeeListng()) { // calling function to create fee information list

      $("body").addClass("loading");  // showing loader on screen.

      // getting module values like title, location, overview etc
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

      // creating object of course data to be passed to api.
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

      // if course is to be updated then update api is called other wise add new course api will be called.
      if (localStorage.getItem("edit") === "true") {
        courseData.id = updateCourseData.Id; // for updating course addinf already assigned course id to course object.
        callUpdateCourseApi(courseData);
      } else {
        callAddNewCourseApi(courseData);
      }
    } else {
      // displayes message to user that fee informatiuon is required for course.
      showErrorMessage("Fee Information is required for adding courses");
    }
  } else {
     // displayes message to user that atleast one module is required for course.
    showErrorMessage("Modules are required for adding courses");
  }
}

/* 
This function takea course data and calls update course api.
On api succes it takes back user to all courses list to show updated course.
*/
function callUpdateCourseApi(courseData) {
  $.ajax({
    url: "http://localhost:3000/updateCourse.php",
    type: "POST",
    data: courseData,
    dataType: "html",
    success: function (data) {
      $("body").removeClass("loading"); // removing loader from screen 
      console.log(data);
      showSuccessMessage("course updated successfully!"); 
    },
    error: function (xhr, status, error) {
      $("body").removeClass("loading");// removing loader from screen 
      console.log(error); // incase of api error, logging it to console.
    },
  });
  
  //clearing all course information from page.
  clearPageData();
}

/* 
This function takea course data and calls add course api.
On api succes it takes back user to all courses list to show newly added course.
*/
function callAddNewCourseApi(courseData) {
  $.ajax({
    url: "http://localhost:3000/addCourse.php",
    type: "POST",
    data: courseData,
    dataType: "html",
    success: function (data) {
      showSuccessMessage("API call successful!");
      console.log(data);
      $("body").removeClass("loading");

    },
    error: function (xhr, status, error) {
      $("body").removeClass("loading");  // removing loader from screen 
      console.log(error);  // incase of api error, logging it to console.
    },
  });
  //clearing all course information from page.
  clearPageData();
}

/* 
This function diplays notification wiht string passed to it as parameter
 */
function showSuccessMessage(message) {
  const notification = document.getElementById("success-notification"); // getting notification element.
  const messageSpan = notification.querySelector(".message"); // getting spann inside notification div.
  messageSpan.textContent = message; // setting passed string to span as text.
  $("body").removeClass("loading");

  notification.classList.add("show"); // showing notification on top right cornor.
  setTimeout(function () {
     // calling generate report page to display new or upated course
    notification.classList.remove("show"); // removing notification after 5000 milli seconds.
   
    loadPage("generateReport.html");
    onGenerateReportLoad();
    
  }, 5000); // Change the timeout duration as needed (in milliseconds)
}

/* 
This function cleats all added course information  from page. 
*/
function clearPageData() {
  window.localStorage.removeItem("ModuleData"); // clearing modules data form local storage.
  window.localStorage.removeItem("feeData"); // clearing fee data form local storage.

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
