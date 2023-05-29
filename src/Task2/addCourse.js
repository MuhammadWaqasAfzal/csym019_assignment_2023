

document.addEventListener("DOMContentLoaded", onPageLoad());

function onPageLoad() {

    window.localStorage.removeItem('ModuleData')
    window.localStorage.removeItem('feeData');
   
}




function moduleValues(e) {
    e.preventDefault();
    if (window.localStorage.getItem('ModuleData') !== null) {
        var category = document.getElementById('category').value;
        var name = document.getElementById('moduleName').value;
        var credit_hours = document.getElementById('credit_hours').value;
        var code = document.getElementById('code').value;
        var status = document.getElementById('status').value;
        var pre_requisites = document.getElementById('pre_requisites').value;

        const moduleData = {
                category: category,
                name: name,
                credit_hours: credit_hours,
                code: code,
                status: status,
                pre_requisites: pre_requisites,
            }
            // Parse the serialized data back into an aray of objects
            // Push the new data (whether it be an object or anything else) onto the array
        const newData = JSON.parse(window.localStorage.getItem('ModuleData'));
        newData.push(moduleData);
        // Re-serialize the array back into a string and store it in localStorage
        window.localStorage.setItem('ModuleData', JSON.stringify(newData));

        console.log(newData);

    } else {
        var category = document.getElementById('category').value;
        var name = document.getElementById('moduleName').value;
        var credit_hours = document.getElementById('credit_hours').value;
        var code = document.getElementById('code').value;
        var status = document.getElementById('status').value;
        var pre_requisites = document.getElementById('pre_requisites').value;

        const moduleData = [{
            category: category,
            name: name,
            credit_hours: credit_hours,
            code: code,
            status: status,
            pre_requisites: pre_requisites,
        }]
        console.log(moduleData);
        window.localStorage.setItem('ModuleData', JSON.stringify(moduleData));
    }
    // document.getElementById("ModuleForm").reset()
    var inputs = document.getElementById("ModuleForm").getElementsByTagName("input");
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
    document.getElementById('ukFull').style.display = 'block';
    document.getElementById('UkPart').style.display = 'none';
}

function showpart() {
    document.getElementById('UkPart').style.display = 'block';
    document.getElementById('ukFull').style.display = 'none';
}

function FEEValues(e) {
    e.preventDefault();
    var session = document.getElementById('session').value;
    // var uk_part_time = {
    //     fees: document.getElementById('fees').value,
    //     year: document.getElementById('year').value,
    //     credit_hours: document.getElementById('credit_hours_per_hour').value,
    //     per_credit_hour: document.getElementById('per_credit_hour').value
    // }

    var uk_part_time_fee = document.getElementById('fees').value;
    var uk_part_time_year = document.getElementById('year').value;
    var uk_part_time_total_credit_hours = document.getElementById('credit_hours_per_hour').value;
    var uk_part_time_per_credit_hour = document.getElementById('per_credit_hour').value;



    var uk_full_time = document.getElementById('uk_full_time').value;
    var uk_integrated_foundation_year = document.getElementById('uk_integrated_foundation_year').value;
    var international_full_time = document.getElementById('international_full_time').value;
    var international_integrated_foundation_year = document.getElementById('international_integrated_foundation_year').value;
    var placement_fee = document.getElementById('placement_fee').value;
    var additional_cost = document.getElementById('additional_cost').value;


    const feeData = {
        session: session,
        uk_part_time_fee: uk_part_time_fee,
        uk_part_time_year: uk_part_time_year,
        uk_part_time_total_credit_hours: uk_part_time_total_credit_hours,
        uk_part_time_per_credit_hour: uk_part_time_per_credit_hour,
        uk_full_time: uk_full_time,
        uk_integrated_foundation_year: uk_integrated_foundation_year,
        international_full_time:international_full_time,
        international_integrated_foundation_year: international_integrated_foundation_year,
        placement_fee: placement_fee,
        additional_cost: additional_cost,

    }

    if(window.localStorage.getItem('feeData')!==null){
        const newData = JSON.parse(window.localStorage.getItem('feeData'));
        newData.push(feeData);

        // Re-serialize the array back into a string and store it in localStorage
        window.localStorage.setItem('feeData', JSON.stringify(newData));
    }
   else{
        const data = [feeData];
        window.localStorage.setItem('feeData', JSON.stringify(data));
    }
  
    toggleModalFee()
    FeeListng()
     
}



function makeModuleList() {

    //checking if user has entered anny module for this course
    if (window.localStorage.getItem('ModuleData')!=null){
   
    // Retrieve data from local storage and parse it into an array
    var data = JSON.parse(window.localStorage.getItem('ModuleData'));

    // Get a reference to the table body
    var tableBody = document.getElementById('moduletable').getElementsByTagName('tbody')[0];
    // Clear the existing table body
    tableBody.innerHTML = '';


    // Iterate over the array and generate table rows and cells
    for (var i = 0; i < data.length; i++) {
        var row = tableBody.insertRow();
        var categoryCell = row.insertCell(0);
        var nameCell = row.insertCell(1);
        var credit_hoursCell = row.insertCell(2);
        var codeCell = row.insertCell(3);
        var statusCell = row.insertCell(4);
        var pre_requisitesCell = row.insertCell(5);

        categoryCell.innerHTML = data[i].category;
        nameCell.innerHTML = data[i].name;
        credit_hoursCell.innerHTML = data[i].credit_hours;
        codeCell.innerHTML = data[i].code;
        statusCell.innerHTML = data[i].status;
        pre_requisitesCell.innerHTML = data[i].pre_requisites;
    }
    return true;
    }
    else
    {
        return false;
       
    }
}

function showErrorMessage(msg){
    alert(msg);
}

function FeeListng() {
    if(window.localStorage.getItem('feeData')!=null){
    const data = JSON.parse(window.localStorage.getItem('feeData'));
       console.log(data);

    // Get a reference to the table body
    var tableBody = document.getElementById('feeTable').getElementsByTagName('tbody')[0];
    // Clear the existing table body
    tableBody.innerHTML = '';

        // for (var key in data) {

        //     if (data[key] !== "") {
        //         if (key == 'uk_part_time') {
        //             for (var inn in data[key]) {
        //                 if (data[key][inn] !== "") {
        //                     var row = tableBody.insertRow();
        //                     var cell = row.insertCell();
        //                     cell.innerHTML = convertToTitleCase(inn) + " : " + data[key][inn];
        //                     //list.appendChild(li);
        //                 }
        //             }
        //         } else {

        //            // var li = document.createElement("li");
        //             var row = tableBody.insertRow();
        //             var cell = row.insertCell();
        //           //  li.textContent = convertToTitleCase(key) + " : " + data[key];
        //           row.innerHTML = convertToTitleCase(key) + " : " + data[key];
        //            // list.appendChild(li);
        //         }
        //     }
        // }

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



        session.innerHTML = data[i].session;
        uk_full_time_fee.innerHTML = data[i].uk_full_time;


        // uk_part_time_fee.innerHTML = data[i].uk_part_time.fees + " " + 
        //                              data[i].uk_part_time.year + " "+
        //                              data[i].uk_part_time.credit_hours + " "+
        //                              data[i].uk_part_time.per_credit_hour + " ";
                                     

        uk_part_time_fee.innerHTML = data[i].uk_part_time_fee;
        uk_part_time_year.innerHTML = data[i].uk_part_time_year;
        uk_part_time_per_credit_hour.innerHTML = data[i].uk_part_time_per_credit_hour;
        uk_part_time_total_credit_hours.innerHTML = data[i].uk_part_time_total_credit_hours;
                                  

       

        uk_international_foundation_year.innerHTML = data[i].uk_integrated_foundation_year;
        international_full_year_fee.innerHTML = data[i].international_full_time;

        international_integrated_foundation_year_fee.innerHTML = data[i].international_integrated_foundation_year;

        placement_fee.innerHTML = data[i].placement_fee;
        additional_cost.innerHTML = data[i].additional_cost;
    }
        return true;
    }
    else{
        return false;
    }
    
}

function convertToTitleCase(str) {
    // Split the string by underscore
    let words = str.split('_');

    // Capitalize the first letter of each word and join them with a space
    let titleCase = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return titleCase;
}

function FormSubmit(event) {
    $("body").addClass("loading");
    event.preventDefault()

     if(makeModuleList()){
       
    if(FeeListng()){
      

    var title = document.getElementById('title').value
    var level = document.querySelector('input[name="level"]:checked').value
    var full_time = document.getElementById('full_time').value
    var full_time_with_placement = document.getElementById('full_time_with_placement').value
    var full_time_foundation = document.getElementById('full_time_foundation').value
    var part_time = document.getElementById('part_time').value


    // var checkboxes = document.getElementsByName('location[]');

    var courseStartCheckBox = document.getElementsByName('courseStart');
    var courseStart=courseStartCheckBox[0].value;
    for (var i=1, n=courseStartCheckBox.length;i<n;i++) 
    {
        if (courseStartCheckBox[i].checked) 
        {
            courseStart = courseStart + ", "+courseStartCheckBox[i].value;
        }
    }

    var location = document.getElementById('location').value
    var overview = document.getElementById('overview').value
    var entryRequirements = document.getElementById('entryRequirements').value
    var moduleData = JSON.parse(window.localStorage.getItem('ModuleData'))
    var feeData = JSON.parse(window.localStorage.getItem('feeData'))

    var courseData = {
        "title": title,
        "level": level,
        "full_time_duration": full_time,
        "full_time_with_placement_duration": full_time_with_placement,
        "full_time_foundation_duration": full_time_foundation,
        "part_time_duration": part_time,
        "location": location,
        "start": courseStart,
        "overview": overview,
        "modules": moduleData,
        "fees": feeData,
        "entryRequirements": entryRequirements
    };

    console.log(courseData);
     $.ajax({
        url: "http://localhost:3000/addCourse.php",
        type: "POST",
        data: courseData,
        dataType: "html",
        success: function(data) {
            console.log(data);
            $("body").removeClass("loading");
            console.log("course added successfully");
        },
        error: function(xhr, status, error) {
            $("body").removeClass("loading");
            console.log(error);
        },
    });
        //clearPageData();
    }
    else{
      showErrorMessage("Fee Information is required for adding courses")
    }

    }
    else{
     showErrorMessage("Modules are required for adding courses")
    }
   


}


function clearPageData(){
    window.localStorage.removeItem('ModuleData')
    window.localStorage.removeItem('feeData');


    //clearing module table
    var moduleTable = document.getElementById('moduletable');
    var rowCount = moduleTable.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        moduleTable.deleteRow(i);
    }

    //clearing fee table
    var feeTable = document.getElementById('feeTable');
    var rowCount = feeTable.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        feeTable.deleteRow(i);
    }
}