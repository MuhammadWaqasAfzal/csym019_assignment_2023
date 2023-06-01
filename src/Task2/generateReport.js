//document.addEventListener("DOMContentLoaded", onGenerateReportLoad); //myLoadEvent);
var coursesList;
var selectedCoursesList;
var checkBoxList;

var modal;
var span;
var charts = [];

function onGenerateReportLoad() {
  $("body").addClass("loading");
  setTimeout(() => {
    coursesList = [];
    selectedCoursesList = [];
    checkBoxList = [];
    callApiToGetCoursesData();
    document.getElementById("floatingButton").style.display = "none";
    document.getElementById("floatingButtonDelete").style.display = "none";
  }, 500);
}

function sortCoursesList(a, b) {
  var textA = a.title.toUpperCase();
  var textB = b.title.toUpperCase();
  return textA < textB ? -1 : textA > textB ? 1 : 0;
}

function selectAllCourses() {
  selectedCoursesList = [];
  let checkbox = document.getElementById("checkAllCourses");

  if (!checkbox.checked) {
    document.getElementById("floatingButton").style.display = "block";
    document.getElementById("floatingButtonDelete").style.display = "block";
    checkbox.checked = true;
    coursesList.forEach((course, index) => {
      selectedCoursesList.push(index);
    });
    checkBoxList.forEach((checkBox, index) => {
      checkBox.checked = true;
    });
  } else {
    document.getElementById("floatingButton").style.display = "none";
    document.getElementById("floatingButtonDelete").style.display = "none";
    checkbox.checked = false;
    checkBoxList.forEach((checkBox) => {
      checkBox.checked = false;
    });
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
//

function callApiToGetCoursesData() {
  $("body").addClass("loading");

  $.ajax({
    url: "http://localhost:3000/allCourses.php",
    type: "GET",
    dataType: "json",
    success: function (data) {
      $("body").removeClass("loading");
      let checkbox = document.getElementById("checkAllCourses");
      checkbox.checked = false;

      coursesList = [];
      coursesList = data.data;
      coursesList.sort(sortCoursesList);
      const tableBody = document.querySelector(".courses tbody");
      tableBody.innerHTML = " ";
      coursesList.forEach((course, index) => {
        const row = tableBody.insertRow();

        //creating cell check box
        const checkBoxCell = row.insertCell();
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkBoxList.push(checkbox);
        checkbox.onclick = function courseSelected() {
          if (checkbox.checked) {
            selectedCoursesList.push(index);
          } else {
            var valueToRemove = selectedCoursesList.indexOf(index);
            if (valueToRemove !== -1) {
              selectedCoursesList.splice(valueToRemove, 1);
            }
          }
          if (selectedCoursesList.length > 0) {
            document.getElementById("floatingButton").style.display = "block";
            document.getElementById("floatingButtonDelete").style.display =
              "block";
          } else {
            document.getElementById("floatingButton").style.display = "none";
            document.getElementById("floatingButtonDelete").style.display =
              "none";
          }
        };

        checkBoxCell.appendChild(checkbox);

        //creating cell for id and inserting data in it
        const idCell = row.insertCell();
        idCell.innerText = course.Id;

        const titleCell = row.insertCell();
        titleCell.innerText = capitalizeFirstLetter(course.title);

        const levelCell = row.insertCell();
        levelCell.innerText = capitalizeFirstLetter(course.level);

        const durationCell = row.insertCell();

        durationCell.innerHTML = createModuleTimeData(course);

        const startingCell = row.insertCell();
        startingCell.innerHTML = createStartModuleData(course);

        const locationCell = row.insertCell();
        locationCell.innerText = capitalizeFirstLetter(course.location);

        const overViewCell = row.insertCell();
        overViewCell.innerText = capitalizeFirstLetter(course.overview);

        const modulesCell = row.insertCell();

        modulesCell.innerHTML = createModuleList(course);

        const feesCell = row.insertCell();

        feesCell.innerHTML = createCourseFeeData(course);

        const requirementsCell = row.insertCell();
        requirementsCell.innerHTML = capitalizeFirstLetter(
          course.entry_requirements
        );

        const actionsCell = row.insertCell();
        var deleteIcon = document.createElement("img");
        deleteIcon.src = "../Task2/icons/delete.png";
        deleteIcon.onclick = function courseSelected() {
          $("body").addClass("loading");
          callApiToDeleteCourse(course.Id);
        };

        var editIcon = document.createElement("img");
        editIcon.src = "../Task2/icons/edit.png";
        editIcon.onclick = function courseSelected() {
          updateModule(course);
        };

        actionsCell.appendChild(deleteIcon);
        actionsCell.appendChild(editIcon);
      });
    },
    error: function () {
      console.log("Fetch Error");
      $("body").removeClass("loading");
    },
  });
}

function updateModule(course) {
  localStorage.setItem("courseData", JSON.stringify(course));
  localStorage.setItem("edit", "true");
  checkIsEditCourse();
  loadPage("addCourse.html");
  // window.location.add("addCourse.html")
}

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

  if (session1 === "<h3>2023/24:</h3><ul> ") session1 = "";
  if (session2 === "<h3>2022/23:</h3><ul> ") session2 = "";

  return (
    "<html><body>" + session1 + "</ul>" + session2 + "</ul>" + "</body></html>"
  );
}

function eachModuleData(item) {
  return (
    "<li>" +
    item.name +
    " <ul class='info-list'>" +
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

function courseFeeDataHelper(item) {
  var session1 =
    "<li><h4>UK – Full Time: </h4> " + item.uk_full_time_fee + "</li>";
  if (item.uk_part_time_fee != null) {
    session1 =
      session1 +
      "<li> <h4>UK – Part Time: </h4>" +
      item.uk_part_time_fee +
      "</li>";
  }

  if (item.international_full_year_fee != "") {
    session1 =
      session1 +
      "<li> <h4>International – Full Time: </h4> " +
      item.international_full_year_fee +
      "</li>";
  }

 



  if (item.uk_part_time_year != null) {
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
function createStartModuleData(course) {
  var start = "<ul>";

  const months = course.start.split(",");
  months.forEach((item) => {
    start = start + "<li>" + capitalizeFirstLetter(item) + "</li>";
  });

  return "<html><body>" + start + "</ul></body></html>";
}
function createModuleTimeData(course) {
  var year = " year";
  if (course.full_time_duration > 1) year = " years\n";
  var duration =
    "<h4>Full Time: </h4> " + course.full_time_duration + year + "<br/>";
  if (
    course.full_time_with_placement_duration != null &&
    course.full_time_with_placement_duration != "null"
  ) {
    if (course.full_time_with_placement_duration > 1) year = " years";
    else year = " year";
    duration =
      duration +
      "<h4>Full Time With Placement: </h4>" +
      course.full_time_with_placement_duration +
      " years" +
      "<br/>";
  }
  if (
    course.full_time_foundation_duration != null &&
    course.full_time_foundation_duration != "null"
  ) {
    if (course.full_time_foundation_duration > 1) year = " years";
    else year = " year";
    duration =
      duration +
      "<h4>Full Time With Foundation: </h4> " +
      course.full_time_foundation_duration +
      " years" +
      "<br/>";
  }
  if (course.part_time_duration != null) {
    if (course.part_time_duration > 1) year = " years";
    else year = " year";
    duration =
      duration +
      "<h4>Part Time: </h4>" +
      course.part_time_duration +
      " years" +
      "<br/>";
  }

  return "<html><body>" + duration + "</body></html>";
}

function createModuleList(course) {
  var stage1Modules = "<h3>Stage 1:</h3><ul> ";
  var isStage1 = false;
  course.modules.forEach((item) => {
    if (capitalizeFirstLetter(item.category) === "Stage1") {
      stage1Modules = stage1Modules + eachModuleData(item);
      isStage1 = true;
    }
  });
  if (isStage1) stage1Modules = stage1Modules + "</ul>";
  else stage1Modules = "";

  var stage2Modules = "<h3>Stage 2:</h3><ul> ";
  var isStage2 = false;
  course.modules.forEach((item) => {
    if (capitalizeFirstLetter(item.category) === "Stage2") {
      stage2Modules = stage2Modules + eachModuleData(item);
      isStage2 = true;
    }
  });
  if (isStage2) stage2Modules = stage2Modules + "</ul>";
  else stage2Modules = "";

  var stage3Modules = "<h3>Stage 3:</h3><ul> ";
  var isStage3 = false;
  course.modules.forEach((item) => {
    if (capitalizeFirstLetter(item.category) === "Stage3") {
      stage3Modules = stage3Modules + eachModuleData(item);
      isStage3 = true;
    }
  });
  if (isStage3) stage3Modules = stage3Modules + "</ul>";
  else stage3Modules = "";

  var placementModules = "<h3>Placement:</h3><ul> ";
  var isPlacement = false;
  course.modules.forEach((item) => {
    if (item.category === "placement") {
      placementModules = placementModules + eachModuleData(item);
      ("</li>");
      isPlacement = true;
    }
  });
  if (isPlacement) placementModules = placementModules + "</ul>";
  else placementModules = "";

  var nonPlacementModules = "<h3>Non-Placement:</h3><ul> ";
  var isNonPlacement = false;
  course.modules.forEach((item) => {
    if (item.category === "non-placement") {
      nonPlacementModules = nonPlacementModules + eachModuleData(item);
      isNonPlacement = true;
    }
  });
  if (isNonPlacement) nonPlacementModules = nonPlacementModules + "</ul>";
  else nonPlacementModules = "";

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

function deleteCourses() {
  $("body").addClass("loading");
  selectedCoursesList.forEach((value) => {
    const course = coursesList[value];
    callApiToDeleteCourse(course.Id);
  });
}

function callApiToDeleteCourse(courseId) {
  $("body").removeClass("loading");
  $.ajax({
    url: "http://localhost:3000/deleteCourse.php",
    type: "POST",
    data: { course_id: courseId },
    dataType: "json",
    success: function (data) {
      $("body").removeClass("loading");
      showSuccessMessage("Course deleted successfully");
      $("#tb").empty();
      onGenerateReportLoad();
      return true;
    },
    error: function (xhr, status, error) {
      $("body").removeClass("loading");
      document.getElementById("errorMsg").innerHTML = error;
      return false;
    },
  });
}

function showSuccessMessage(message) {
  const notification = document.getElementById("success-notification");
  const messageSpan = notification.querySelector(".message");
  messageSpan.textContent = message;
  notification.classList.add("show");
  setTimeout(function () {
    notification.classList.remove("show");
  }, 5000); // Change the timeout duration as needed (in milliseconds)
}

function generateReport() {
  var courseTitles = [];
  var creditHours = [];
  var courseIds = [];
  var moduleTitles = [];
  //   var allCreditHours = [];
  var allCoursesData = [];
  selectedCoursesList.forEach((value) => {
    courseTitles = [];
    creditHours = [];
    const course = coursesList[value];
    course.modules.forEach((module) => {
      creditHours.push(module.credit_hours);
      courseTitles.push(module.name);
      var data = {
        credit_hours: module.credit_hours,
        title: module.name,
        course: course.title,
      };
      allCoursesData.push(data);
      //   allCreditHours.push(module.credit_hours);

      courseIds.push(module.Id);
    });
    moduleTitles.push(course.title);
    createPieChart(courseTitles, creditHours, courseIds);
  });

  if (selectedCoursesList.length > 1) {
    createBarChart(allCoursesData, moduleTitles);
  }
}

function createPieChart(courseTitles, creditHours, courseIds) {
  // Create a new div element
  var newDiv = document.createElement("div");

  // Assign a class to the div
  newDiv.classList.add("chartDesign");

  const ctx = document.createElement("canvas");

  //add chart inside div
  newDiv.appendChild(ctx);

  // Append the div to the container
  var container = document.getElementById("chartsContainer");
  container.appendChild(
    createTableForModules(courseTitles, creditHours, courseIds)
  );
  container.appendChild(newDiv);

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

  charts.push(ctx);
}

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

  var th = document.createElement("th");
  th.textContent = "Course Id";
  headerRow.appendChild(th);

  th = document.createElement("th");
  th.textContent = "Module";
  headerRow.appendChild(th);

  th = document.createElement("th");
  th.textContent = "Credit Hours";
  headerRow.appendChild(th);

  thead.appendChild(headerRow);

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

function createBarChart(data, allCourseTitles) {
  const ctx = document.createElement("canvas");
  //ctx.id = index.toString();

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
  var creditHoursArray = Array(allCourseTitles.length).fill(0);

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

function openModal() {
  modal = document.getElementById("myModal");
  span = document.getElementsByClassName("close")[0];
  modal.style.display = "block";

  generateReport();
}

function spanClick() {
  modal.style.display = "none";
  clearModalCharts();
}

function clearModalCharts() {
  var container = document.getElementById("chartsContainer");
  var charts = container.getElementsByTagName("canvas");

  // Remove all charts from the modal
  while (charts.length > 0) {
    charts[0].parentNode.removeChild(charts[0]);
  }

  container.innerHTML = "";
}

// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
