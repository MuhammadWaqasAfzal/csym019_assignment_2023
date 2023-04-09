function moduleValues() {
    console.log(window.localStorage.getItem('ModuleData'))
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
        const newData = Object.entries(window.localStorage.getItem('ModuleData'));
        newData.push(moduleData);
        // Alert the array value
        console.log(newData);  // Should be something like [Object array]
        // Re-serialize the array back into a string and store it in localStorage
        window.localStorage.setItem('ModuleData', JSON.stringify(newData));
        console.log("waqas");

    } else {
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
        window.localStorage.setItem('ModuleData', JSON.stringify(moduleData));
    }
    // let element = document.getElementById("addModule")
    //$('addModuleModal').modal('show');
}
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");
console.log(trigger);
console.log(closeButton);
function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);


const modalFee = document.querySelector(".modalFee");
const triggerFee = document.querySelector(".triggerFee");
const closeButtonFee = document.querySelector(".close-buttonFee");
console.log(triggerFee);
console.log(closeButtonFee);
function toggleModalFee() {
    modalFee.classList.toggle("show-modalFee");
}

function windowOnClick(event) {
    if (event.target === modalFee) {
        toggleModalFee();
    }
}

triggerFee.addEventListener("click", toggleModalFee);
closeButtonFee.addEventListener("click", toggleModalFee);
window.addEventListener("click", windowOnClick);


function showfull() {
    document.getElementById('ukFull').style.display = 'block';
    document.getElementById('UkPart').style.display = 'none';
}
function showpart() {
    document.getElementById('UkPart').style.display = 'block';
    document.getElementById('ukFull').style.display = 'none';
}
function FEEValues() {
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

    // let element = document.getElementById("addModule")
    //$('addModuleModal').modal('show');
}