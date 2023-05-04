document.addEventListener("DOMContentLoaded", onPageLoad); //myLoadEvent);
var coursesList;
var selectedCoursesList;
var checkBoxList;
var chart;
var modal;
var span;




function sortCoursesList(a, b) {
    var textA = a.title.toUpperCase();
    var textB = b.title.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}

function selectAllCourses() {
    let checkbox = document.getElementById('checkAllCourses');
    if (!checkbox.checked) {
        coursesList.forEach((course, index) => {
            selectedCoursesList.push(index);
        });
        checkBoxList.forEach((checkBox, index) => {
            selectedCoursesList.push(index);
            checkBox.checked = true;
        });
        checkbox.checked = true;
    } else {
        selectedCoursesList = []
        checkbox.checked = false;
        checkBoxList.forEach((checkBox) => {
            checkBox.checked = false;
        });
    }

}



function onPageLoad() {






    coursesList = [];
    selectedCoursesList = [];
    checkBoxList = [];
    $.ajax({
        url: "http://localhost:3000/allCourses.php",
        type: "GET",
        dataType: "json",
        success: function(data) {
            let checkbox = document.getElementById('checkAllCourses');
            checkbox.checked = false;
            data.data.sort(sortCoursesList);
            coursesList = data.data;
            const tableBody = document.querySelector("#courses tbody");
            data.data.forEach((course, index) => {
                const row = tableBody.insertRow();

                //creating cell check box
                const checkBoxCell = row.insertCell();
                //  checkBoxCell.innerHTML = $("table").simpleCheckboxTable();
                // var checkbox = document.createElement("INPUT");
                // checkbox.type = "checkbox";
                // checkBoxCell.innerHTML = checkbox
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkBoxList.push(checkbox);
                checkbox.onclick = function courseSelected() {
                    selectedCoursesList.push(index)
                };
                //checkbox.value = stringArray[6];

                checkBoxCell.appendChild(checkbox);



                //creating cell for id and inserting data in it
                const idCell = row.insertCell();
                idCell.innerText = course.Id;

                const titleCell = row.insertCell();
                titleCell.innerText = course.title;

                const levelCell = row.insertCell();
                levelCell.innerText = course.level;

                const durationCell = row.insertCell();
                var year = " year\n";
                if (course.full_time_duration > 1) year = " years\n";
                var duration =
                    "Full Time: " + course.full_time_duration + year;
                if (course.full_time_with_placement_duration != null) {
                    if (course.full_time_with_placement_duration > 1)
                        year = " years\n";
                    else year = " year\n";
                    duration =
                        duration +
                        "Full Time Placement: " +
                        course.coursefull_time_with_placement_duration +
                        " years\n";
                }
                if (course.full_time_foundation_duration != null) {
                    if (course.full_time_foundation_duration > 1)
                        year = " years\n";
                    else year = " year\n";
                    duration =
                        duration +
                        "Full Time Foundation: " +
                        course.full_time_foundation_duration +
                        " years\n";
                }
                if (course.part_time != null) {
                    if (course.part_time_duration > 1) year = " years\n";
                    else year = " year\n";
                    duration =
                        duration +
                        "Part Time: " +
                        course.part_time_duration +
                        " years\n";
                }
                durationCell.innerText = duration;

                const startingCell = row.insertCell();
                var starting = course.start;
                //  course.starting.forEach((item) => {
                //      starting = starting + item + "\n";
                //  });
                startingCell.innerText = course.start;

                const locationCell = row.insertCell();
                locationCell.innerText = course.location;

                const overViewCell = row.insertCell();
                overViewCell.innerText = course.overview;

                const modulesCell = row.insertCell();
                var stage1Modules = "<h2>stage 1:</h2><ul> ";
                var isStage1 = false;
                course.modules.forEach((item) => {
                    if (item.category === "stage1") {
                        stage1Modules = stage1Modules + "<li>" + item.name + "</li>";
                        isStage1 = true;
                    }
                });
                if (isStage1) stage1Modules = stage1Modules + "</ul>";
                else stage1Modules = "";

                var stage2Modules = "<h2>stage 2:</h2><ul> ";
                var isStage2 = false;
                course.modules.forEach((item) => {
                    if (item.category === "stage2") {
                        stage2Modules = stage2Modules + "<li>" + item.name + "</li>";
                        isStage2 = true;
                    }
                });
                if (isStage2) stage2Modules = stage2Modules + "</ul>";
                else stage2Modules = "";

                var stage3Modules = "<h2>stage 3:</h2><ul> ";
                var isStage3 = false;
                course.modules.forEach((item) => {
                    if (item.category === "stage3") {
                        stage3Modules = stage3Modules + "<li>" + item.name + "</li>";
                        isStage3 = true;
                    }
                });
                if (isStage3) stage3Modules = stage3Modules + "</ul>";
                else stage3Modules = "";

                var placementModules = "<h2>placement:</h2><ul> ";
                var isPlacement = false;
                course.modules.forEach((item) => {
                    if (item.category === "placement") {
                        placementModules = placementModules + "<li>" + item.name + "</li>";
                        isPlacement = true;
                    }
                });
                if (isPlacement) placementModules = placementModules + "</ul>";
                else placementModules = "";

                var nonPlacementModules = "<h2>non-placement:</h2><ul> ";
                var isNonPlacement = false;
                course.modules.forEach((item) => {
                    if (item.category === "non_placement") {
                        nonPlacementModules =
                            nonPlacementModules + "<li>" + item.name + "</li>";
                        isNonPlacement = true;
                    }
                });
                if (isNonPlacement) nonPlacementModules = nonPlacementModules + "</ul>";
                else nonPlacementModules = "";

                modulesCell.innerHTML =
                    "<html><body>" +
                    stage1Modules +
                    stage2Modules +
                    stage3Modules +
                    placementModules +
                    nonPlacementModules +
                    "</body></html>";

                const feesCell = row.insertCell();
                var session1 = "<h2>2023/24:</h2><ul> ";
                var session2 = "<h2>2022/23:</h2><ul> ";



                course.fees.forEach((item) => {
                    if (item.session === "23/24") {
                        session1 =
                            session1 + "<li> UK – Full Time: " + item.uk_full_time_fee + "</li>";
                        if (item.uk_part_time_fee != null) {
                            session1 = session1 + "<li> UK – Part Time: " + item.uk_part_time_fee + "</li>";
                            var partTimeFees = ""
                                // item.uk_part_time_fee.forEach((i) => {
                                //     partTimeFees = partTimeFees + i.fees
                                //     if (i.credit_hours == null)
                                //         partTimeFees = partTimeFees + " per " + i.per_credit_hour + " module."
                                //     else {
                                //         if (i.year != null)
                                //             partTimeFees = partTimeFees + "(Year" + i.year + " " + i.credit_hours + " Credits)"
                                //     }
                                //     session1 = session1 + "<li> UK – Part Time: " + partTimeFees + "</li>";
                                //     partTimeFees = ""
                                // });

                        }
                        if (item.uk_integrated_foundation_year_fee != null)
                            session1 =
                            session1 +
                            "<li> UK – Integrated Foundation Year: " +
                            item.uk_integrated_foundation_yea_feer +
                            "</li>";
                        session1 =
                            session1 +
                            "<li> International – Full Time: " +
                            item.international_full_time_fee +
                            "</li>";
                        if (item.international_integrated_foundation_year_fee != null)
                            session1 =
                            session1 +
                            "<li> International – Integrated Foundation Year: " +
                            item.international_integrated_foundation_year_fee +
                            "</li>";
                        if (item.placement_fee != null)
                            session1 =
                            session1 + "<li> Placement Fee: " + item.placement_fee + "</li>";
                        session1 =
                            session1 +
                            "<li> Additional Cost: " +
                            item.additional_cost +
                            "</li>";
                    } else {
                        session2 =
                            session2 + "<li> UK – Full Time: " + item.uk_full_time_fee + "</li>";

                        if (item.uk_part_time_fee != null) {
                            var partTimeFees = ""
                            session2 = session2 + "<li> UK – Part Time: " + item.uk_part_time_fee + "</li>";
                            // item.uk_part_time_fee.forEach((i) => {
                            //     partTimeFees = partTimeFees + i.fees
                            //     if (i.credit_hours == null)
                            //         partTimeFees = partTimeFees + " per " + i.per_credit_hour + " module."
                            //     else {
                            //         if (i.year != null)
                            //             partTimeFees = partTimeFees + "(Year" + i.year + " " + i.credit_hours + " Credits)"
                            //     }
                            //     session2 = session2 + "<li> UK – Part Time: " + partTimeFees + "</li>";

                            //     partTimeFees = ""
                            // });

                        }
                        if (item.uk_integrated_foundation_year_fee != null)
                            session2 =
                            session2 +
                            "<li> UK – Integrated Foundation Year: " +
                            item.uk_integrated_foundation_year_fee +
                            "</li>";
                        session2 =
                            session2 +
                            "<li> International – Full Time: " +
                            item.international_full_time_fee +
                            "</li>";
                        if (item.international_integrated_foundation_yea_feer != null)
                            session2 =
                            session2 +
                            "<li> International – Integrated Foundation Year: " +
                            item.international_integrated_foundation_year_fee +
                            "</li>";
                        if (item.placement_fee != null)
                            session2 =
                            session2 + "<li> Placement Fee: " + item.placement_fee + "</li>";
                        session2 =
                            session2 +
                            "<li> Additional Cost: " +
                            item.additional_cost +
                            "</li>";
                    }
                });

                if (session1 === "<h2>2023/24:</h2><ul> ")
                    session1 = ""
                if (session2 === "<h2>2022/23:</h2><ul> ")
                    session2 = ""
                feesCell.innerHTML =
                    "<html><body>" + session1 + "</ul>" + session2 + "</ul>" + "</body></html>";
                const requirementsCell = row.insertCell();
                // requirementsCell.innerHTML = "<html><body>" + course.description + "<h3>English language Requirements</h3><ul><li>" +
                //     course.entry_requirements.english_language_requirements + "</li></ul></body></html > "

                requirementsCell.innerHTML = course.entry_requirements



            });
        },
        error: function() {
            console.log("Fetch Error");
        },
    });
}


function generateReport() {
    var courseTitles = [];
    var creditHours = [];
    selectedCoursesList.forEach((value) => {
        const course = coursesList[value];
        course.modules.forEach((module) => {
            creditHours.push(module.credit_hours);
            courseTitles.push(module.name);

        });

    });
    console.log(courseTitles);
    console.log(creditHours);
    const ctx = document.getElementById('chart');

    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: courseTitles,
            datasets: [{
                label: '# of Credit Hours',
                data: creditHours,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });



}



function openModal() {
    modal = document.getElementById("myModal");
    span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    generateReport();
}

function spanClick() {
    modal = document.getElementById("myModal");
    span = document.getElementsByClassName("close")[0];
    modal.style.display = "none";
    chart.destroy();

}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}