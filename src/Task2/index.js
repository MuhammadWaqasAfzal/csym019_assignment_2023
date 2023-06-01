

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
    document.getElementById("name").innerHTML = capitalizeFirstLetter(localStorage.getItem("userName"));
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


 function showMessage(message) {
    const notification = document.getElementById('success-notification');
    const messageSpan = notification.querySelector('.message');
  
    messageSpan.textContent = message;
    notification.classList.add('show');
  
    setTimeout(function() {
      notification.classList.remove('show');
    }, 3000); // Change the timeout duration as needed (in milliseconds)
  }
  