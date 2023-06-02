// event listener when page get is loaded
document.addEventListener("DOMContentLoaded", onPageLoad); //myLoadEvent);

var selectedCurreny = "pound"; // already selcted curreny
var coursesData; // contaings all courses data

/* 
This fucntion gets called whenever page is laoded.
It gets courses data from course.json file and saves it in local vriable. Calls function to display this data.
*/
function onPageLoad() {
    $.ajax({
        url: "course.json",
        type: "GET",
        dataType: "json",
        success: function(data) {
            coursesData = data;
            displayData();
        },
        error: function() {
            console.log("Fetch Error"); // in case of error, loggin it
        },
    });

/* Get all radio buttons Get all radio buttons */
const radioButtons = document.querySelectorAll('.radio-container input[type="radio"]');

// Add click event listener to each radio button
radioButtons.forEach(function(radioButton) {
    radioButton.addEventListener('click', function() {
      selectedCurreny = radioButton.id; // setting selected current to new value.
      displayData(); // calling display data fucntion to update fee values according to new currency.
    });
  });
}

/* 
This function displays all courses data in table that we got from course.json.
It creates row for every course and then add cells it for respective course value. 
*/
function displayData(){
    const tableBody = document.querySelector("#courses tbody"); // table body
    tableBody.innerHTML = ""; // setting it to null to display new data.

    // iterating over each course, creating row and adding cells to it, in order to dispay values
    coursesData.courses.forEach((course) => {
        // creating new row in table.
        const row = tableBody.insertRow();

        //creating cell for id and inserting data in it.
        const idCell = row.insertCell();
        idCell.innerText = course.id;

         //creating cell for title and inserting data in it.
        const titleCell = row.insertCell();
        titleCell.innerText = course.title;

         //creating cell for course level and inserting data in it.
        const levelCell = row.insertCell();
        levelCell.innerText = course.course_details.level;

         //creating cell for course duratiion and inserting data in it.
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

        //creating cell for course starting and inserting data in it.
        const startingCell = row.insertCell();
        var starting = "";
        course.course_details.starting.forEach((item) => {
            starting = starting + item + "\n";
        });
        startingCell.innerText = starting;

        //creating cell for course location and inserting data in it.
        const locationCell = row.insertCell();
        locationCell.innerText = course.course_details.location;

        //creating cell for course overview and inserting data in it.
        const overViewCell = row.insertCell();
        overViewCell.innerText = course.course_details.overview;

        //creating cell for course modules and inserting data in it.
        const modulesCell = row.insertCell();
        var stage1Modules = "<h2>stage 1:</h2><ul> "; // contains stage 1 modules heading
        var isStage1 = false;

         // iterating over all modules and getting stage 1 modules and adding them in list.
        course.course_details.modules.forEach((item) => {
            if (item.category === "stage1") {
                stage1Modules = stage1Modules + "<li>" + item.name + " (" + item.credit_hours + " credit hours)" + "</li>";
                isStage1 = true;
            }
        });

        // closing list for stage 1 modules.
        if (isStage1) stage1Modules = stage1Modules + "</ul>";
        else stage1Modules = "";

         // iterating over all modules and getting stage 2 modules and adding them in list.
        var stage2Modules = "<h2>stage 2:</h2><ul> "; // contains stage 2 modules heading
        var isStage2 = false;
        course.course_details.modules.forEach((item) => {
            if (item.category === "stage2") {
                stage2Modules = stage2Modules + "<li>" + item.name + " (" + item.credit_hours + " credit hours)" + "</li>";
                isStage2 = true;
            }
        });

         // closing list for stage 2 modules.
        if (isStage2) stage2Modules = stage2Modules + "</ul>";
        else stage2Modules = "";

        var stage3Modules = "<h2>stage 3:</h2><ul> "; // contains stage 3 modules heading
        var isStage3 = false;

        // iterating over all modules and getting stage 3 modules and adding them in list.
        course.course_details.modules.forEach((item) => {
            if (item.category === "stage3") {
                stage3Modules = stage3Modules + "<li>" + item.name + " (" + item.credit_hours + " credit hours)" + "</li>";
                isStage3 = true;
            }
        });

         // closing list for stage 3 modules.
        if (isStage3) stage3Modules = stage3Modules + "</ul>";
        else stage3Modules = "";

        var placementModules = "<h2>placement:</h2><ul> "; // contain placement modules heading.
        var isPlacement = false;

        // iterating over all modules and getting placement modules and adding them in list.
        course.course_details.modules.forEach((item) => {
            if (item.category === "placement") {
                placementModules = placementModules + "<li>" + item.name + " (" + item.credit_hours + " credit hours)" + "</li>";
                isPlacement = true;
            }
        });

         // closing list for placement modules.
        if (isPlacement) placementModules = placementModules + "</ul>";
        else placementModules = "";

        var nonPlacementModules = "<h2>non-placement:</h2><ul> "; // contain non-placement modules heading
        var isNonPlacement = false;

        // iterating over all modules and getting non-placement modules and adding them in list.
        course.course_details.modules.forEach((item) => {
            if (item.category === "non_placement") {
                nonPlacementModules =
                    nonPlacementModules + "<li>" + item.name + " (" + item.credit_hours + " credit hours)" + "</li>";
                isNonPlacement = true;
            }
        });

        // closing list for non-placement modules.
        if (isNonPlacement) nonPlacementModules = nonPlacementModules + "</ul>";
        else nonPlacementModules = "";

        // creating html for all modules and setting it in module cell.
        modulesCell.innerHTML =
            "<html><body>" +
            stage1Modules +
            stage2Modules +
            stage3Modules +
            placementModules +
            nonPlacementModules +
            "</body></html>";

        //creating cell for course fee information and inserting data in it.
        const feesCell = row.insertCell();
        var session1 = "<h2>2023/24:</h2><ul> ";
        var session2 = "<h2>2022/23:</h2><ul> ";
        course.fees_and_funding.forEach((item) => {
            if (item.session === "23/24") {
                session1 =
                    session1 + "<li> UK – Full Time: " + convertCurrency(item.uk_full_time) + "</li>";
                if (item.uk_part_time != null) {

                    var partTimeFees = ""
                    item.uk_part_time.forEach((i) => {
                        partTimeFees = partTimeFees + convertCurrency(i.fees)
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
                    convertCurrency(item.uk_integrated_foundation_year) +
                    "</li>";
                session1 =
                    session1 +
                    "<li> International – Full Time: " +
                    convertCurrency(item.international_full_time) +
                    "</li>";
                if (item.international_integrated_foundation_year != null)
                    session1 =
                    session1 +
                    "<li> International – Integrated Foundation Year: " +
                    convertCurrency(item.international_integrated_foundation_year) +
                    "</li>";
                if (item.placement_fee != null)
                    session1 =
                    session1 + "<li> Placement Fee: " +  convertCurrency(item.placement_fee) + "</li>";
                session1 =
                    session1 +
                    "<li> Additional Cost: " +
                    convertCurrency(item.additional_cost) +
                    "</li>";
            } else {
                session2 =
                    session2 + "<li> UK – Full Time: " + convertCurrency(item.uk_full_time) + "</li>";

                if (item.uk_part_time != null) {
                    var partTimeFees = ""
                    item.uk_part_time.forEach((i) => {
                        partTimeFees = partTimeFees + convertCurrency(i.fees)
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
                    convertCurrency(item.uk_integrated_foundation_year) +
                    "</li>";
                session2 =
                    session2 +
                    "<li> International – Full Time: " +
                    convertCurrency(item.international_full_time) +
                    "</li>";
                if (item.international_integrated_foundation_year != null)
                    session2 =
                    session2 +
                    "<li> International – Integrated Foundation Year: " +
                    convertCurrency(item.international_integrated_foundation_year) +
                    "</li>";
                if (item.placement_fee != null)
                    session2 =
                    session2 + "<li> Placement Fee: " + convertCurrency(item.placement_fee) + "</li>";
                session2 =
                    session2 +
                    "<li> Additional Cost: " +
                    convertCurrency(item.additional_cost) +
                    "</li>";
            }
        });
        feesCell.innerHTML =
            "<html><body>" + session1 + "</ul>" + session2 + "</ul>" + "</body></html>";

        //creating cell for course entry requiremtns and inserting data in it.
        const requirementsCell = row.insertCell();
        requirementsCell.innerHTML = "<html><body>" + course.entry_requirements.description + "<h3>English language Requirements</h3><ul><li>" +
            course.entry_requirements.english_language_requirements + "</li></ul></body></html > "


    });
}

/* 
This fucntion converts values to slected currency. 
*/
function convertCurrency(curreny){
    curreny = curreny.toString(); // converting passed valur to string

    if(selectedCurreny==="pound"){ // if currency needs to be converted to punds.
        if(curreny.includes("$")) // if currency was in dollars.
            curreny = curreny / 1.25;
        if(curreny.includes("€")) // if currency was in euro.
            curreny = curreny * 1.16;
        return curreny+"£";
    }
    else if (selectedCurreny === "dollar"){ // if currency needs to be converted to dollar.
        if(curreny.includes("£")) // if currency was in pounds.
            curreny = curreny * 1.25;
        if(curreny.includes("€")) // if currency was in euro.
            curreny = curreny / 1.08;
        return curreny+"$";
    }
    else if (selectedCurreny === "euro"){ // if currency needs to be converted to euro.
        if(curreny.includes("$")) // if currency was in dollars.
            curreny = curreny * 1.08;
        if(curreny.includes("£")) // if currency was in pounds.
            curreny = curreny / 1.16;
        return curreny+"€";
    }
    else
        return curreny+"£";
}