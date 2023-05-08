function moduleValues(e) {
    e.preventDefault();
    if (window.localStorage.getItem('ModuleData') !== null) {
        var category = document.getElementById('category').value;
        var name = document.getElementById('name').value;
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

    } else {
        var category = document.getElementById('category').value;
        var name = document.getElementById('name').value;
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
        window.localStorage.setItem('ModuleData', JSON.stringify(moduleData));
    }
    // document.getElementById("ModuleForm").reset()
    var inputs = document.getElementById("ModuleForm").getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    toggleModal()
    makeModuleList()

    // let element = document.getElementById("addModule")
    //$('addModuleModal').modal('show');
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
    var uk_part_time = {
        fees: document.getElementById('fees').value,
        year: document.getElementById('year').value,
        credit_hours: document.getElementById('credit_hours').value,
        per_credit_hour: document.getElementById('per_credit_hour').value
    }
    var uk_full_time = document.getElementById('uk_full_time').value;
    var uk_integrated_foundation_year = document.getElementById('uk_integrated_foundation_year').value;
    var international_integrated_foundation_year = document.getElementById('international_integrated_foundation_year').value;
    var placement_fee = document.getElementById('placement_fee').value;
    var additional_cost = document.getElementById('additional_cost').value;


    const feeData = {
        session: session,
        uk_part_time: uk_part_time,
        uk_full_time: uk_full_time,
        uk_integrated_foundation_year: uk_integrated_foundation_year,
        international_integrated_foundation_year: international_integrated_foundation_year,
        placement_fee: placement_fee,
        additional_cost: additional_cost,

    }
    window.localStorage.setItem('feeData', JSON.stringify(feeData));
    toggleModalFee()
    FeeListng()
        // let element = document.getElementById("addModule")
        //$('addModuleModal').modal('show');
}

function onLoadPage() {
    makeModuleList()
    FeeListng()
}

function makeModuleList() {
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
}

function FeeListng() {
    const data = JSON.parse(window.localStorage.getItem('feeData'));
    var list = document.getElementById("myList");
    for (var key in data) {

        if (data[key] !== "") {
            if (key == 'uk_part_time') {
                for (var inn in data[key]) {
                    if (data[key][inn] !== "") {
                        var li = document.createElement("li");
                        li.textContent = convertToTitleCase(inn) + " : " + data[key][inn];
                        list.appendChild(li);
                    }
                }
            } else {

                var li = document.createElement("li");
                li.textContent = convertToTitleCase(key) + " : " + data[key];
                list.appendChild(li);
            }
        }
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
    event.preventDefault()
    var title = document.getElementById('title').value
    var level = document.querySelector('input[name="level"]:checked').value
    var full_time = document.getElementById('full_time').value
    var full_time_with_placement = document.getElementById('full_time_with_placement').value
    var full_time_foundation = document.getElementById('full_time_foundation').value
    var part_time = document.getElementById('part_time').value
    var starting = document.getElementById('starting').value
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
        "start": starting,
        "overview": overview,
        "modules": moduleData,
        "fees": feeData,
        "entryRequirements": entryRequirements
    };




    $.ajax({
        url: "http://localhost:3000/addCourse.php",
        type: "POST",
        data: courseData,
        dataType: "html",
        success: function(data) {
            console.log("course added successfully");
        },
        error: function(xhr, status, error) {
            console.log(error);
        },
    });



}