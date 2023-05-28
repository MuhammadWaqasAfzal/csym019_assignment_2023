

function callLoginApi(email, password) {

    $.ajax({
        url: "http://localhost:3000/login.php",
        type: "POST",
        data: { email: email, password: password },
        dataType: "json",
        success: function(data) {
            saveUserData(data);
            return true
        },
        error: function(xhr, status, error) {
            document.getElementById("errorMsg").innerHTML = error
            return false;
        },
    });
}



function callSignUpApi(userName, email, password, signConfirmPassword) {
    $.ajax({
        url: "http://localhost:3000/register.php",
        type: "POST",
        data: { userName: userName, email: email, password: password, confirmPassword: signConfirmPassword },
        dataType: "json",
        success: function(data) {
            saveUserData(data);
            return true
        },
        error: function(xhr, status, error) {
            document.getElementById("errorMsg").innerHTML = error
            return false;
        },
    });
}




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
        return callLoginApi(email, password)
    }
}


function validateSignupForm() {
    event.preventDefault();
    var firstName = document.getElementById("signFirstName").value;
    var lastName = document.getElementById("signLastName").value;
    var email = document.getElementById("signEmail").value;
    var password = document.getElementById("signPassword").value;
    var signConfirmPassword = document.getElementById("signConfirmPassword").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    document.getElementById("errorMsgSignUp").style = "color:red";

    if (email == "" || firstName == "" || lastName == "" || password == "") {
        document.getElementById("errorMsgSignUp").innerHTML = "Please fill the required fields";
        return false;
    } else if (password.length < 8) {
        document.getElementById("errorMsgSignUp").innerHTML = "Your password must include atleast 8 characters";
        return false;
    } else {
         return callSignUpApi(firstName + " " +lastName, email, password, signConfirmPassword)
    }
}



function saveUserData(data){
    console.log(data);
    localStorage.setItem('userId', data.data.Id);
    localStorage.setItem('userName', data.data.userName);
    localStorage.setItem('email', data.data.Email);
    localStorage.setItem('password', data.data.Password);
   window.location.replace("index.html");

}