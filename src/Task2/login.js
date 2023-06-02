
/* 
This function calls api to login user. 
*/
function callLoginApi(email, password) {

    $.ajax({
        url: "http://localhost:3000/login.php",
        type: "POST",
        data: { email: email, password: password },
        dataType: "json",
        success: function(data) {
            saveUserData(data); // on succes of api saving user data in local storage.
            return true
        },
        error: function(xhr, status, error) {
            document.getElementById("errorMsg").innerHTML = error // in caser of error displaying error to user.
            return false;
        },
    });
}

/* 
This function calls api to signup user. 
*/
function callSignUpApi(userName, email, password, signConfirmPassword) {
    $.ajax({
        url: "http://localhost:3000/register.php",
        type: "POST",
        data: { userName: userName, email: email, password: password, confirmPassword: signConfirmPassword },
        dataType: "json",
        success: function(data) {
            saveUserData(data); // on succes of api saving user data in local storage.
            return true
        },
        error: function(xhr, status, error) {
            document.getElementById("errorMsg").innerHTML = error  // in caser of error displaying error to user.
            return false;
        },
    });
}

/* 
This function validated login form.
Email and password cannot be empty.
Length of password must be greater than or equal to 8.
 */
function validateLoginForm() {
    event.preventDefault();
    var email = document.getElementById("logEmail").value;
    var password = document.getElementById("logPassword").value;
    document.getElementById("errorMsg").style = "color:red"

    if (email == "" || password == "") {
        document.getElementById("errorMsg").innerHTML = "Please fill the required fields"
        return false;
    } else if (password.length < 8) {
        document.getElementById("errorMsg").innerHTML = "Your password must include atleast 8 characters"
        return false;
    } else {
        return callLoginApi(email, password) // if email and password is correct, callinf logina api.
    }
}

/* 
This function validated signup form.
Email, name and password cannot be empty.
Length of password must be greater than or equal to 8.
*/
function validateSignupForm() {
    event.preventDefault();
    var signUserName = document.getElementById("signUserName").value;
    var email = document.getElementById("signEmail").value;
    var password = document.getElementById("signPassword").value;
    var signConfirmPassword = document.getElementById("signConfirmPassword").value;
    document.getElementById("errorMsgSignUp").style = "color:red";

    if (email == "" || signUserName == "" ||  password == "") {
        document.getElementById("errorMsgSignUp").innerHTML = "Please fill the required fields";
        return false;
    } else if (password.length < 8) {
        document.getElementById("errorMsgSignUp").innerHTML = "Your password must include atleast 8 characters";
        return false;
    } else {
         return callSignUpApi(signUserName, email, password, signConfirmPassword)
    }
}

/* 
This function saves user information in local Storage.
It calls index.html page to enter into application. 
*/
function saveUserData(data){
    localStorage.setItem('userId', data.data.Id);
    localStorage.setItem('userName', data.data.userName);
    localStorage.setItem('email', data.data.email);
    localStorage.setItem('password', data.data.password);
   window.location.replace("index.html");

}