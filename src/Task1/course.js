document.addEventListener("DOMContentLoaded", onPageLoad); //myLoadEvent);

function onPageLoad() {
    $.ajax({
        url: "course.json",
        type: "GET",
        dataType: "json",
        success: function(data) {
            const tableBody = document.querySelector("#courses tbody");
            data.courses.forEach((course) => {
                const row = tableBody.insertRow();

                //creating cell for id and inserting data in it
                const idCell = row.insertCell();
                idCell.innerText = course.id;

                const titleCell = row.insertCell();
                titleCell.innerText = course.title;

                const levelCell = row.insertCell();
                levelCell.innerText = course.course_details.level;

                const durationCell = row.insertCell();
                var year = " year\n";
                if (course.course_details.duration.full_time > 1) year = " years\n";
                var duration =
                    "Full Time: " + course.course_details.duration.full_time + year;
                if (course.course_details.duration.full_time_with_placement != null) {
                    if (course.course_details.duration.full_time_with_placement > 1)
                        year = " years\n";
                    else year = " year\n";
                    duration =
                        duration +
                        "Full Time Placement: " +
                        course.course_details.duration.full_time_with_placement +
                        " years\n";
                }
                if (course.course_details.duration.full_time_foundation != null) {
                    if (course.course_details.duration.full_time_foundation > 1)
                        year = " years\n";
                    else year = " year\n";
                    duration =
                        duration +
                        "Full Time Foundation: " +
                        course.course_details.duration.full_time_foundation +
                        " years\n";
                }
                if (course.course_details.duration.part_time != null) {
                    if (course.course_details.duration.part_time > 1) year = " years\n";
                    else year = " year\n";
                    duration =
                        duration +
                        "Part Time: " +
                        course.course_details.duration.part_time +
                        " years\n";
                }
                durationCell.innerText = duration;

                const startingCell = row.insertCell();
                var starting = "";
                course.course_details.starting.forEach((item) => {
                    starting = starting + item + "\n";
                });
                startingCell.innerText = starting;

                const locationCell = row.insertCell();
                locationCell.innerText = course.course_details.location;

                const overViewCell = row.insertCell();
                overViewCell.innerText = course.course_details.overview;

                const modulesCell = row.insertCell();
                var stage1Modules = "<h2>stage 1:</h2><ul> ";
                var isStage1 = false;
                course.course_details.modules.forEach((item) => {
                    if (item.category === "stage1") {
                        stage1Modules = stage1Modules + "<li>" + item.name + "</li>";
                        isStage1 = true;
                    }
                });
                if (isStage1) stage1Modules = stage1Modules + "</ul>";
                else stage1Modules = "";

                var stage2Modules = "<h2>stage 2:</h2><ul> ";
                var isStage2 = false;
                course.course_details.modules.forEach((item) => {
                    if (item.category === "stage2") {
                        stage2Modules = stage2Modules + "<li>" + item.name + "</li>";
                        isStage2 = true;
                    }
                });
                if (isStage2) stage2Modules = stage2Modules + "</ul>";
                else stage2Modules = "";

                var stage3Modules = "<h2>stage 3:</h2><ul> ";
                var isStage3 = false;
                course.course_details.modules.forEach((item) => {
                    if (item.category === "stage3") {
                        stage3Modules = stage3Modules + "<li>" + item.name + "</li>";
                        isStage3 = true;
                    }
                });
                if (isStage3) stage3Modules = stage3Modules + "</ul>";
                else stage3Modules = "";

                var placementModules = "<h2>placement:</h2><ul> ";
                var isPlacement = false;
                course.course_details.modules.forEach((item) => {
                    if (item.category === "placement") {
                        placementModules = placementModules + "<li>" + item.name + "</li>";
                        isPlacement = true;
                    }
                });
                if (isPlacement) placementModules = placementModules + "</ul>";
                else placementModules = "";

                var nonPlacementModules = "<h2>non-placement:</h2><ul> ";
                var isNonPlacement = false;
                course.course_details.modules.forEach((item) => {
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
                course.fees_and_funding.forEach((item) => {
                    if (item.session === "23/24") {
                        session1 =
                            session1 + "<li> UK – Full Time: " + item.uk_full_time + "</li>";
                        if (item.uk_part_time != null) {

                            var partTimeFees = ""
                            item.uk_part_time.forEach((i) => {
                                partTimeFees = partTimeFees + i.fees
                                if (i.credit_hours == null)
                                    partTimeFees = partTimeFees + " per " + i.per_credit_hour + " module."
                                else {
                                    if (i.year != null)
                                        partTimeFees = partTimeFees + "(Year" + i.year + " " + i.credit_hours + " Credits)"
                                }
                                session1 = session1 + "<li> UK – Part Time: " + partTimeFees + "</li>";
                                partTimeFees = ""
                            });

                        }
                        if (item.uk_integrated_foundation_year != null)
                            session1 =
                            session1 +
                            "<li> UK – Integrated Foundation Year: " +
                            item.uk_integrated_foundation_year +
                            "</li>";
                        session1 =
                            session1 +
                            "<li> International – Full Time: " +
                            item.international_full_time +
                            "</li>";
                        if (item.international_integrated_foundation_year != null)
                            session1 =
                            session1 +
                            "<li> International – Integrated Foundation Year: " +
                            item.international_integrated_foundation_year +
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
                            session2 + "<li> UK – Full Time: " + item.uk_full_time + "</li>";

                        if (item.uk_part_time != null) {
                            var partTimeFees = ""
                            item.uk_part_time.forEach((i) => {
                                partTimeFees = partTimeFees + i.fees
                                if (i.credit_hours == null)
                                    partTimeFees = partTimeFees + " per " + i.per_credit_hour + " module."
                                else {
                                    if (i.year != null)
                                        partTimeFees = partTimeFees + "(Year" + i.year + " " + i.credit_hours + " Credits)"
                                }
                                session2 = session2 + "<li> UK – Part Time: " + partTimeFees + "</li>";

                                partTimeFees = ""
                            });

                        }
                        if (item.uk_integrated_foundation_year != null)
                            session2 =
                            session2 +
                            "<li> UK – Integrated Foundation Year: " +
                            item.uk_integrated_foundation_year +
                            "</li>";
                        session2 =
                            session2 +
                            "<li> International – Full Time: " +
                            item.international_full_time +
                            "</li>";
                        if (item.international_integrated_foundation_year != null)
                            session2 =
                            session2 +
                            "<li> International – Integrated Foundation Year: " +
                            item.international_integrated_foundation_year +
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
                feesCell.innerHTML =
                    "<html><body>" + session1 + "</ul>" + session2 + "</ul>" + "</body></html>";
                console.log(course.id);
                const requirementsCell = row.insertCell();
                requirementsCell.innerHTML = "<html><body>" + course.entry_requirements.description + "<h3>English language Requirements</h3><ul><li>" +
                    course.entry_requirements.english_language_requirements + "</li></ul></body></html > "


            });
        },
        error: function() {
            console.log("Fetch Error");
        },
    });
}