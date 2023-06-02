var coursesList; // variable that stores all courses got from api
var selectedCoursesList; // variable that stores all delected courses by users
var checkBoxList; // variable that stores all checkboxes and will be used to mark checked if user clicks on top checkbox

var modal; // variable used for saving report modal
var span; // close generate modal button
var charts = []; // list of all charts created in order to remove them from canvas on close

/* 
This function is called when we selects genrate reeport page from top nav bar.
It will call api to get data 
*/
function onGenerateReportLoad() {
  $("body").addClass("loading"); // adding loader to page until api is getting data
  setTimeout(() => {
    coursesList = []; // emtied courses list
    selectedCoursesList = []; //emtied selected courses
    checkBoxList = []; // emptied check box list
    callApiToGetCoursesData(); //call api to get courses from data base
    document.getElementById("floatingButton").style.display = "none"; // hiding generate report button on start as no courses is selected yet
    document.getElementById("floatingButtonDelete").style.display = "none"; // hiding deletee course button on start as no courses is selected yet
  }, 500);
}

/* 
This function sorts courses list on the basis of title. 
*/
function sortCoursesList(a, b) {
  var textA = a.title.toUpperCase();
  var textB = b.title.toUpperCase();
  return textA < textB ? -1 : textA > textB ? 1 : 0;
}

/* 
This function will select all courses and put them in slected courses list.
It will also check mark every check box against each course. 
*/
function selectAllCourses() {
  selectedCoursesList = []; // emtied selected courses list .
  let checkbox = document.getElementById("checkAllCourses"); // getting top check box.

  if (!checkbox.checked) {
    // checking is check box is not selected before

    document.getElementById("floatingButton").style.display = "block"; // displaying generate report floating button on bottom right.
    document.getElementById("floatingButtonDelete").style.display = "block"; // displaying delete courses floating button on bottom left.

    checkbox.checked = true; // setting top check box to checked.

    coursesList.forEach((course, index) => {
      //pushing all courses to selected courses list.
      selectedCoursesList.push(index);
    });

    checkBoxList.forEach((checkBox, index) => {
      //iterating over every check box and marking it checked.
      checkBox.checked = true;
    });
  } else {
    // if top check box was checked before and now it needs to be unchecked.

    document.getElementById("floatingButton").style.display = "none"; // hiding generate report floating button on bottom right.
    document.getElementById("floatingButtonDelete").style.display = "none"; // hiding delete courses floating button on bottom left.

    checkbox.checked = false; // top check box will be un checked

    checkBoxList.forEach((checkBox) => {
      // iterating over every check box and marking it unchecked.
      checkBox.checked = false;
    });
  }
}

/* 
This function is used to capitalize first letter of string passed to it 
*/
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/* 
The function bellow calls api to get courses.
It iterates over all courses and display them in table by creating rows and cells. 
*/
function callApiToGetCoursesData() {
  $("body").addClass("loading"); // adding loader to screen

  $.ajax({
    url: "http://localhost:3000/allCourses.php",
    type: "GET",
    dataType: "json",
    success: function (data) {
      $("body").removeClass("loading"); // removing loader from screen.

      let checkbox = document.getElementById("checkAllCourses"); // getting check all check box
      checkbox.checked = false; // setting it to un checked

      coursesList = []; // emptying list as new data has arrived.
      coursesList = data.data; // getting courses list from api response and saving it in this varibale.
      coursesList.sort(sortCoursesList); // sorting courses list on the basis of title.
      const tableBody = document.querySelector(".courses tbody"); // getting table body
      tableBody.innerHTML = " "; // empting table body as new data has arrived

      coursesList.forEach((course, index) => {
        // iteration over each course and displying its data.

        const row = tableBody.insertRow(); // creating a new row for a course

        const checkBoxCell = row.insertCell(); //creating a cell in row
        var checkbox = document.createElement("input"); //creating cell check box against each course
        checkbox.type = "checkbox"; // setting type
        checkBoxList.push(checkbox); // adding this check box to check box list

        checkbox.onclick = function courseSelected() {
          //attaching click listener to check box

          if (checkbox.checked) {
            // on selecting check box adding couorse to selected courses list
            selectedCoursesList.push(index);
          } else {
            // on unselecting of check box, removing course from selcted courses list.
            var valueToRemove = selectedCoursesList.indexOf(index);
            if (valueToRemove !== -1) {
              selectedCoursesList.splice(valueToRemove, 1);
            }
          }

          //unhiding generate report and delete course floating button if user has selected some courses.
          if (selectedCoursesList.length > 0) {
            document.getElementById("floatingButton").style.display = "block";
            document.getElementById("floatingButtonDelete").style.display =
              "block";
          } else {
            //hiding generate report and delete course floating button if user not selected any course.
            document.getElementById("floatingButton").style.display = "none";
            document.getElementById("floatingButtonDelete").style.display =
              "none";
          }
        };

        checkBoxCell.appendChild(checkbox); // appending check box to cell.

        /* creating cell for id and inserting data in it */
        const idCell = row.insertCell();
        idCell.innerText = course.Id;

        /* creating cell for course title and inserting data in it */
        const titleCell = row.insertCell();
        titleCell.innerText = capitalizeFirstLetter(course.title);

        /* creating cell for course level and inserting data in it */
        const levelCell = row.insertCell();
        levelCell.innerText = capitalizeFirstLetter(course.level);

        /* creating cell for course timelines and inserting data in it */
        const durationCell = row.insertCell();
        durationCell.innerHTML = createModuleTimeData(course);

        /* creating cell for course start  and inserting data in it */
        const startingCell = row.insertCell();
        startingCell.innerHTML = createStartModuleData(course);

        /* creating cell for course location and inserting data in it */
        const locationCell = row.insertCell();
        locationCell.innerText = capitalizeFirstLetter(course.location);

        /* creating cell for course overview and inserting data in it */
        const overViewCell = row.insertCell();
        overViewCell.innerText = capitalizeFirstLetter(course.overview);

        /* creating cell for course module and inserting data in it */
        const modulesCell = row.insertCell();
        modulesCell.innerHTML = createModuleList(course);

        /* creating cell for course fee information and inserting data in it */
        const feesCell = row.insertCell();
        feesCell.innerHTML = createCourseFeeData(course);

        /* creating cell for course entry requirements and inserting data in it */
        const requirementsCell = row.insertCell();
        requirementsCell.innerHTML = capitalizeFirstLetter(
          course.entry_requirements
        );

        /* creating cell for actions  and adding delete and edit icon against eevery course */
        const actionsCell = row.insertCell();
        var deleteIcon = document.createElement("img"); // creating delete img.
        deleteIcon.src = "../Task2/icons/delete.png"; // setting icon to it.
        deleteIcon.onclick = function courseSelected() {
          // attaching click listener on delete icon click.
          $("body").addClass("loading");
          callApiToDeleteCourse(course.Id); //calling api to delete course.
        };

        var editIcon = document.createElement("img"); // creating edit img.
        editIcon.src = "../Task2/icons/edit.png"; // setting icon to it.
        editIcon.onclick = function courseSelected() {
          // attaching click listener on edit icon click.
          updateModule(course); // calling function to update coursee
        };

        actionsCell.appendChild(deleteIcon); // adding delete image to actrion cell.
        actionsCell.appendChild(editIcon); // adding edit image to action cell.
      });
    },
    error: function () {
      // on error from api
      console.log("Fetch Error"); // logging error from api
      $("body").removeClass("loading"); // removing loader from screen.
    },
  });
}

/* 
This function is called when course is needed to be updated.
it stores couese data in local storage and take user to new course page where course are 
pre filled. 
*/
function updateModule(course) {
  localStorage.setItem("courseData", JSON.stringify(course));
  localStorage.setItem("edit", "true");
  checkIsEditCourse();
  loadPage("addCourse.html");
}

/* 
This function takes fee data and divides it into two sessions.
Then for each session call another function to create a list of fee information.
 */
function createCourseFeeData(course) {
  var session1 = "<h3>2023/24:</h3><ul> ";
  var session2 = "<h3>2022/23:</h3><ul> ";
  course.fees.forEach((item) => {
    if (item.session === "23/24") {
      session1 = session1 + courseFeeDataHelper(item);
    } else {
      session2 = session2 + courseFeeDataHelper(item);
    }
  });

  if (session1 === "<h3>2023/24:</h3><ul> ") session1 = ""; // checking if information about this session is nnot empty
  if (session2 === "<h3>2022/23:</h3><ul> ") session2 = ""; // checking if information about this session is nnot empty

  return (
    "<html><body>" + session1 + "</ul>" + session2 + "</ul>" + "</body></html>" // returning html to be displayerd in cell
  );
}

/* 
This function extracts module information from course data.
Creates list for it and returns back html that will be displayed in module cell. 
*/
function eachModuleData(item) {
  return (
    "<li>" +
    item.name +
    " <ul class='info-list'>" + // assigning tool tip class for further information
    "<li>" +
    "Title: " +
    item.name +
    "</li>" +
    "<li>" +
    "Credit Hours: " +
    item.credit_hours +
    "</li>" +
    "<li>" +
    "Code: " +
    item.code +
    "</li>" +
    "<li>" +
    "Status: " +
    item.status +
    "</li>" +
    "<li>" +
    "Pre Requisite: " +
    item.pre_requisites +
    "</li>" +
    " </ul>" +
    "</li>"
  );
}

/* 
This function extracts fee information from course data.
Creates list for it and returns back html that will be displayed in fee cell. 
*/
function courseFeeDataHelper(item) {
  console.log(item);
  var session1 =
    "<li><h4>UK – Full Time: </h4> " + item.uk_full_time_fee + "</li>";
  if (item.uk_part_time_fee != null && item.uk_part_time_fee == !"") {
    // checks if part time fee is not empty and null.
    session1 =
      session1 +
      "<li> <h4>UK – Part Time: </h4>" +
      item.uk_part_time_fee +
      "</li>";
  }

  if (item.international_full_year_fee != "") {
    // checks if international full year fee is not empty.
    session1 =
      session1 +
      "<li> <h4>International – Full Time: </h4> " +
      item.international_full_year_fee +
      "</li>";
  }

  if (item.uk_part_time_year != null) {
    //creating unordered list for detail information for fee.
    session1 =
      session1 +
      " <li> <ul class='info-list'><li> <h4>Uk Part Time Years: </h4>" +
      item.uk_part_time_year +
      "</li>";
  }
  if (item.uk_part_time_per_credit_hour != null) {
    session1 =
      session1 +
      "<li> <h4>Uk Part Time Total Credit Hours: </h4>" +
      item.uk_part_time_year +
      "</li>";
  }
  if (item.uk_part_time_per_credit_hour != null) {
    session1 =
      session1 +
      "<li> <h4>Uk Part Time Per Credit Hours: </h4>" +
      item.uk_part_time_year +
      "</li>";
  }

  if (item.international_integrated_foundation_year_fee != "") {
    session1 =
      session1 +
      "<li><h4> International – Integrated Foundation Year: </h4>" +
      item.international_integrated_foundation_year_fee +
      "</li>";
  }
  if (item.uk_integrated_foundation_year_fee != "") {
    session1 =
      session1 +
      "<li><h4> UK – Integrated Foundation Year: </h4>" +
      item.uk_international_foundation_year +
      "</li>";
  }
  if (item.uk_international_foundation_year != "") {
    session1 =
      session1 +
      "<li><h4>International Foundation Year: </h4>" +
      item.uk_international_foundation_year +
      "</li>";
  }

  if (item.placement_fee != "") {
    session1 =
      session1 + "<li><h4> Placement Fee: </h4>" + item.placement_fee + "</li>";
  }
  if (item.additional_cost != "") {
    session1 =
      session1 +
      "<li><h4>Additional Cost: </h4>" +
      item.additional_cost +
      "</li></ul></li>";
  }

  return session1;
}

/* 
This function extracts course start months by splitting it on the basis of ",".
Then capitalize each month and returning html containig lsit of all months. 
*/
function createStartModuleData(course) {
  var start = "<ul>";

  const months = course.start.split(","); // splitting months on the basis of ","
  months.forEach((item) => {
    start = start + "<li>" + capitalizeFirstLetter(item) + "</li>"; // returning month in list after capitalizing first letter.
  });

  return "<html><body>" + start + "</ul></body></html>";
}

/* 
This function extracts module timeline information from course data.
Creates list for it and returns back html that will be displayed in time cell. 
*/
function createModuleTimeData(course) {
  var year = " year";
  if (course.full_time_duration > 1) year = " years\n"; // adding year or years based on number of years
  var duration =
    "<h4>Full Time: </h4> " + course.full_time_duration + year + "<br/>"; // getting full time durtation of course.
  if (
    course.full_time_with_placement_duration != null &&
    course.full_time_with_placement_duration != "0"
  ) {
    if (course.full_time_with_placement_duration > 1) year = " years";
    else year = " year";
    duration =
      duration +
      "<h4>Full Time With Placement: </h4>" +
      course.full_time_with_placement_duration + // getting full time durtation with placement of course.
      " years" +
      "<br/>";
  }
  if (
    course.full_time_foundation_duration != null &&
    course.full_time_foundation_duration != "0" &&
    course.full_time_foundation_duration != "null"
  ) {
    if (course.full_time_foundation_duration > 1) year = " years";
    else year = " year";
    duration =
      duration +
      "<h4>Full Time With Foundation: </h4> " +
      course.full_time_foundation_duration +
      " years" +
      "<br/>"; // getting full time durtation with foundation of course.
  }
  if (course.part_time_duration != null && course.part_time_duration != "0") {
    if (course.part_time_duration > 1) year = " years";
    else year = " year";
    duration =
      duration +
      "<h4>Part Time: </h4>" +
      course.part_time_duration +
      " years" +
      "<br/>"; // getting part time durtation of course.
  }

  return "<html><body>" + duration + "</body></html>"; // returning back html containing all information aboit course timeline.
}

/* 
This function extracts module data from course data.
Divides all modules on the basis of their types i.e stage1, stage2, stage3, placement, non-placement.
Created list of each type module and send back html to module cell.
*/
function createModuleList(course) {
  var stage1Modules = "<h3>Stage 1:</h3><ul> "; // contains stage 1 modules heading
  var isStage1 = false;

  // iterating over all modules and getting stage 1 modules and adding them in list.
  course.modules.forEach((item) => {
    if (capitalizeFirstLetter(item.category) === "Stage1") {
      stage1Modules = stage1Modules + eachModuleData(item);
      isStage1 = true;
    }
  });

  // closing list for stage 1 modules.
  if (isStage1) stage1Modules = stage1Modules + "</ul>";
  else stage1Modules = "";

  var stage2Modules = "<h3>Stage 2:</h3><ul> "; // contains stage 2 modules heading
  var isStage2 = false;

  // iterating over all modules and getting stage 2 modules and adding them in list.
  course.modules.forEach((item) => {
    if (capitalizeFirstLetter(item.category) === "Stage2") {
      stage2Modules = stage2Modules + eachModuleData(item);
      isStage2 = true;
    }
  });

  // closing list for stage 2 modules.
  if (isStage2) stage2Modules = stage2Modules + "</ul>";
  else stage2Modules = "";

  var stage3Modules = "<h3>Stage 3:</h3><ul> "; // contains stage 3 modules heading
  var isStage3 = false;

  // iterating over all modules and getting stage 3 modules and adding them in list.
  course.modules.forEach((item) => {
    if (capitalizeFirstLetter(item.category) === "Stage3") {
      stage3Modules = stage3Modules + eachModuleData(item);
      isStage3 = true;
    }
  });

  // closing list for stage 3 modules.
  if (isStage3) stage3Modules = stage3Modules + "</ul>";
  else stage3Modules = "";

  var placementModules = "<h3>Placement:</h3><ul> "; // contains placement modules heading
  var isPlacement = false;

  // iterating over all modules and getting placement modules and adding them in list.
  course.modules.forEach((item) => {
    if (item.category === "placement") {
      placementModules = placementModules + eachModuleData(item);
      ("</li>");
      isPlacement = true;
    }
  });

  // closing list for placement modules.
  if (isPlacement) placementModules = placementModules + "</ul>";
  else placementModules = "";

  var nonPlacementModules = "<h3>Non-Placement:</h3><ul> "; // contains non-placement modules heading
  var isNonPlacement = false;

  // iterating over all modules and getting non-placement modules and adding them in list.
  course.modules.forEach((item) => {
    if (item.category === "non-placement") {
      nonPlacementModules = nonPlacementModules + eachModuleData(item);
      isNonPlacement = true;
    }
  });

    // closing list for non-placement modules.
  if (isNonPlacement) nonPlacementModules = nonPlacementModules + "</ul>";
  else nonPlacementModules = "";

  // returning all moduels data html data to be displayed in module cell.
  return (
    "<html><body>" +
    stage1Modules +
    stage2Modules +
    stage3Modules +
    placementModules +
    nonPlacementModules +
    "</body></html>"
  );
}

/* 
This function calls api for multiple selected courses in order to be deleted.
*/
function deleteCourses() {
  $("body").addClass("loading"); // displaying loader on screen

  // iterating over each selected course and calling delete api o it
  selectedCoursesList.forEach((value) => { 
    const course = coursesList[value];
    callApiToDeleteCourse(course.Id);
  });
}

/* 
This api contains delete course api functionality.
Course Id is passed to it and then that course will be delted. 
*/
function callApiToDeleteCourse(courseId) {

  $.ajax({
    url: "http://localhost:3000/deleteCourse.php",
    type: "POST",
    data: { course_id: courseId },
    dataType: "json",
    success: function (data) {
      $("body").removeClass("loading"); // removing loader from screen
      showSuccessMessage("Course deleted successfully"); // showing success message to user that course has been deleted.
      $("#tb").empty(); // emptying courses table.
      onGenerateReportLoad(); // reloading courses data in order to remove deleted courses from table.
      return true;
    },
    error: function (xhr, status, error) {
      $("body").removeClass("loading");
      document.getElementById("errorMsg").innerHTML = error; // showing error in case of api failure.
      return false;
    },
  });
}

/* 
This function diplays notification wiht string passed to it as parameter
 */
function showSuccessMessage(message) {
  const notification = document.getElementById("success-notification"); // getting notification element.
  const messageSpan = notification.querySelector(".message"); // getting spann inside notification div.
  messageSpan.textContent = message; // setting passed string to span as text.
  notification.classList.add("show"); // showing notification on top right cornor.
  setTimeout(function () {
    notification.classList.remove("show"); // removing notification after 5000 milli seconds.
  }, 5000); // Change the timeout duration as needed (in milliseconds)
}

/* 
This function gets called after clicking on genertae button.
It prepares data from selected courses accordingly to be used.
It opens modal and displayes charts on it. 
*/
function generateReport() {
  var courseTitles = []; // contains all selected corse titles.
  var creditHours = []; // contatins all credit hours of selected courses.
  var courseIds = []; // contains all selected corses Ids.
  var moduleTitles = []; // contains titles of all modules of all selected courses.
  var allCoursesData = []; // it contains data to be used for bar chart.

  // iterates over each selected course, get its credit hour, title and create data object to be used for bar char.
  selectedCoursesList.forEach((value) => {
    courseTitles = [];
    creditHours = [];
    const course = coursesList[value];
    course.modules.forEach((module) => {
      creditHours.push(module.credit_hours);
      courseTitles.push(module.name);

      // data ibject to be used for bar chart if required.
      var data = {
        credit_hours: module.credit_hours,
        title: module.name,
        course: course.title,
      };
      allCoursesData.push(data);
      courseIds.push(module.Id);
    });
    moduleTitles.push(course.title);

    // calling function to createe pie chart for this course.
    createPieChart(courseTitles, creditHours, courseIds);
  });

  // if user selects more than one course, then calling bar chart function.
  if (selectedCoursesList.length > 1) {
    createBarChart(allCoursesData, moduleTitles);
  }
}

/* 
This function creates pie chart for every selected course. 
*/
function createPieChart(courseTitles, creditHours, courseIds) {
  // Create a new div element
  var newDiv = document.createElement("div");

  // Assign a class to the div
  newDiv.classList.add("chartDesign");

  // getting canvas for chart
  const ctx = document.createElement("canvas");

  //add chart inside div
  newDiv.appendChild(ctx);

  // Append the div to the container
  var container = document.getElementById("chartsContainer");
  container.appendChild(
    createTableForModules(courseTitles, creditHours, courseIds)
  );
  container.appendChild(newDiv);

  // creating pie chart 
  new Chart(ctx, {
    label: "Modules",
    type: "pie",
    data: {
      labels: courseTitles,
      datasets: [
        {
          label: "# of Credit Hours",
          data: creditHours,
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
    borderWidth: 2,
  });

  // saving chart in order to be distroyed on closing of module.
  charts.push(ctx);
}

/*  
This fucntion created table for every selected course against pie chart.
It display module title and its credit hours for every pie chart. 
*/
function createTableForModules(courseTitles, creditHours, courseIds) {
  // Create the table div
  var tableDiv = document.createElement("div");
  tableDiv.className = "courses";
  tableDiv.classList.add("chartTableDesign");

  // Create the table element
  var table = document.createElement("table");
  var thead = document.createElement("thead");
  var tbody = document.createElement("tbody");

  // Add table headers
  var headerRow = document.createElement("tr");

  // Creatig heading course Id
  var th = document.createElement("th");
  th.textContent = "Course Id";
  headerRow.appendChild(th);

  // Creatig heading module
  th = document.createElement("th");
  th.textContent = "Module";
  headerRow.appendChild(th);

  // Creatig heading credit hours 
  th = document.createElement("th");
  th.textContent = "Credit Hours";
  headerRow.appendChild(th);

  // adding header row to table.
  thead.appendChild(headerRow);

  // iterating over each course of module and diaplaying its data in a row.
  courseTitles.forEach((item, index) => {
    var dataRow = document.createElement("tr");

    var td = document.createElement("td");
    td.textContent = courseIds[index];
    dataRow.appendChild(td);

    var td = document.createElement("td");
    td.textContent = item;
    dataRow.appendChild(td);

    var td = document.createElement("td");
    td.textContent = creditHours[index];
    dataRow.appendChild(td);

    tbody.appendChild(dataRow);
  });

  // Append the table elements to the table div
  table.appendChild(thead);
  table.appendChild(tbody);
  tableDiv.appendChild(table);

  return tableDiv;
}


/* 
This function creates one bar chart for all selected courses. 
*/
function createBarChart(data, allCourseTitles) {

  // creating canvas for chart
  const ctx = document.createElement("canvas");

  // Create a new div element
  var newDiv = document.createElement("div");

  // Assign a class to the div
  newDiv.classList.add("barChartDesign");

  //add chart inside div
  newDiv.appendChild(ctx);

  // Append the div to the container
  var container = document.getElementById("chartsContainer");

  container.appendChild(newDiv);
  var dataset = [];
  var addedModules = [];

  // as total labels will be equal to number of courses selected by user.
  var creditHoursArray = Array(allCourseTitles.length).fill(0);

  // iterating over each module data, combining same modules for every course.
  data.forEach((module) => {
    var moduleTitle = module.title;
    if (!addedModules.includes(moduleTitle)) {
      addedModules.push(module);

      data.forEach((item) => {
        if (item.title === module.title) {
          allCourseTitles.forEach((course, index) => {
            if (item.course === course) {
              creditHoursArray[index] = module.credit_hours;
            }
          });
        }
      });
      var temp = { label: moduleTitle, data: creditHoursArray };
      dataset.push(temp);
      creditHoursArray = Array(allCourseTitles.length).fill(0);
    }
  });

  // creating bar chart and setting values to it.
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: allCourseTitles,
      datasets: dataset,
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
    borderWidth: 2,
  });

  charts.push(ctx);
}

/* 
This function gets report modal and opens it. 
*/
function openModal() {
  modal = document.getElementById("myModal");
  span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";

  generateReport(); // calling generate report finction afetr opening modal
}

/* 
This function is called when user clicks on close button on report modal. 
*/
function spanClick() {
  modal.style.display = "none"; // hiding report modal.
  clearModalCharts(); // destroying all created chats.
}

/* 
This function destroys all charts from modal. 
*/
function clearModalCharts() {
  var container = document.getElementById("chartsContainer");
  var charts = container.getElementsByTagName("canvas");

  // Remove all charts from the modal
  while (charts.length > 0) {
    charts[0].parentNode.removeChild(charts[0]);
  }

  // setting empty text to charts modal after detroying them.
  container.innerHTML = "";
}

