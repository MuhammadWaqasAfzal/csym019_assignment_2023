// event listener when page get is loaded
document.addEventListener("DOMContentLoaded", onPageLoad); //myLoadEvent);

function onPageLoad() {
    loadPage("generateReport.html");
}

/* 
This fucntion gets called wheneever page is laoded.
It  loads generate report page inside body of this page . 
*/
function onPageLoad() {
    loadPage("generateReport.html");
	onGenerateReportLoad();

    // sets user name on navbar
    setUserName();
 }

/* 
 This function gets user name from local Storage.
 Displays it on top nav bar. 
 */
 function setUserName(){
    document.getElementById("name").innerHTML = capitalizeFirstLetter(localStorage.getItem("userName"));
 }

/*  
 This fucntion loads page that is passed to it, inside main conatiner of this page.
 */
function loadPage(fileName) {
    let xhttp;
    let element = document.getElementById("main") // getting main div of page.

    if (fileName) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) { // if page is ready loading its html inside main div
                element.innerHTML = this.responseText;
            }
        }
        xhttp.open("GET", fileName, true);
        xhttp.send();
        return;
    }
}

/* 
This function logouts out user from application and takes him to login page. 
*/
 function logout(){
    window.location.replace("login.html");
 }


 /* 
This function diplays notification wiht string passed to it as parameter
 */
function showMessage(message) {
    const notification = document.getElementById("success-notification"); // getting notification element.
    const messageSpan = notification.querySelector(".message"); // getting spann inside notification div.
    messageSpan.textContent = message; // setting passed string to span as text.  
    notification.classList.add("show"); // showing notification on top right cornor.
    setTimeout(function () {
        notification.classList.remove('show');  // removing notification message.
    }, 3000); // Change the timeout duration as needed (in milliseconds)
}
  