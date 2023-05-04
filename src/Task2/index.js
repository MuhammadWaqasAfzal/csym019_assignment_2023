function loadPage(fileName) {
    let xhttp;
    let element = document.getElementById("main")

    if (fileName) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            //  console.log(this.readyState);

            if (this.readyState == 4) {
                element.innerHTML = this.responseText;
            }
        }
        xhttp.open("GET", fileName, true);
        xhttp.send();
        return;
    }
}

function onPageLoad() {
    loadPage("generateReport.html");
    //loadPage("addCourse.html")
}

document.addEventListener("DOMContentLoaded", onPageLoad); //myLoadEvent);