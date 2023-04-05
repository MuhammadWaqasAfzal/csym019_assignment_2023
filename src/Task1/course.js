document.addEventListener('DOMContentLoaded', onPageLoad); //myLoadEvent);



function onPageLoad() {
    $.ajax({
        url: "course.json",
        type: "GET",
        dataType: "json",
        success: function(data) {
            const tableBody = document.querySelector('#courses tbody');
            data.courses.forEach(course => {
                const row = tableBody.insertRow();
                const idCell = row.insertCell();
                const titleCell = row.insertCell();
                const levelCell = row.insertCell();
                const durationCell = row.insertCell();
                const startingCell = row.insertCell();
                const locationCell = row.insertCell();
                idCell.innerText = course.id;
                titleCell.innerText = course.title;
                levelCell.innerText = course.course_details.level;

                var year = " year\n"

                if (course.course_details.duration.full_time > 1)
                    year = " years\n"
                var duration = "Full Time: " + course.course_details.duration.full_time + year

                if (course.course_details.duration.full_time_with_placement != null) {
                    if (course.course_details.duration.full_time_with_placement > 1)
                        year = " years\n"
                    else
                        year = " year\n"
                    duration = duration + "Full Time Placement: " + course.course_details.duration.full_time_with_placement + " years\n"
                }

                if (course.course_details.duration.full_time_foundation != null) {
                    if (course.course_details.duration.full_time_foundation > 1)
                        year = " years\n"
                    else
                        year = " year\n"
                    duration = duration + "Full Time Foundation: " + course.course_details.duration.full_time_foundation + " years\n"
                }

                if (course.course_details.duration.part_time != null) {
                    if (course.course_details.duration.part_time > 1)
                        year = " years\n"
                    else
                        year = " year\n"
                    duration = duration + "Part Time: " + course.course_details.duration.part_time + " years\n"
                }

                durationCell.innerText = duration;


                var starting = ""
                course.course_details.starting.forEach(item => {
                    starting = starting + item + "\n"
                });
                startingCell.innerText = starting;

                locationCell.innerText = course.course_details.location;

                const overViewCell = row.insertCell();
                overViewCell.innerText = course.course_details.overview;

                const modulesCell = row.insertCell();
                var module = "<ul> "
                course.course_details.modules.forEach(item => {
                    module = module + "<li>" + item.name + "</li>"
                });
                module = module + "</ul>"
                console.log(module);
                modulesCell.innerHTML = "<html><body>" + module + "</body></html>"
                    // modulesCell.innerHTML = "<html><body><ul> <li> Coffee </li> <li> Tea </li> <li> Milk </li> </ul> < /body > < /html > "
            });
        },
        error: function() {
            console.log("Fetch Error");
        }
    });

}