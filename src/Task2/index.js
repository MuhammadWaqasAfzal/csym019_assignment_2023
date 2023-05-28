

function onPageLoad() {
    loadPage("generateReport.html");
    //loadPage("addCourse.html")
}

document.addEventListener("DOMContentLoaded", onPageLoad); //myLoadEvent);



function onPageLoad() {
   // loadPage("addCourse.html");

    loadPage("generateReport.html");
	onGenerateReportLoad();
     setUserName();

 }

 function setUserName(){
    console.log(localStorage.getItem("userName")+ " name");
    document.getElementById("name").innerHTML = localStorage.getItem("userName");
 }
 
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



 function logout(){
    window.location.replace("login.html");
 }