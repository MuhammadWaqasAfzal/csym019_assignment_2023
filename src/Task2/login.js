$(window).on("hashchange", function() {
    if (location.hash.slice(1) == "signup") {
        $(".page").addClass("extend");
        $("#login").removeClass("active");
        $("#signup").addClass("active");
    } else {
        $(".page").removeClass("extend");
        $("#login").addClass("active");
        $("#signup").removeClass("active");
    }
});
$(window).trigger("hashchange");

function validateLoginForm() {
    event.preventDefault();
    var email = document.getElementById("logEmail").value;
    var password = document.getElementById("logPassword").value;

    if (email == "" || password == "") {
        document.getElementById("errorMsg").innerHTML = "Please fill the required fields"
        return false;
    } else if (password.length < 8) {
        document.getElementById("errorMsg").innerHTML = "Your password must include atleast 8 characters"
        return false;
    } else {
        return callLoginApi(email, password)
            //return true;
    }
}

function callLoginApi(email, password) {

    $.ajax({
        url: "http://localhost:3000/login.php",
        type: "POST",
        data: { email: email, password: password },
        dataType: "json",
        success: function(data) {
            window.location.replace("index.html");
            return true
        },
        error: function(xhr, status, error) {
            document.getElementById("errorMsg").innerHTML = error
            return false;
        },
    });
}

function validateSignupForm() {
    event.preventDefault();
    var email = document.getElementById("signEmail").value;
    var userName = document.getElementById("signName").value;
    var password = document.getElementById("signPassword").value;
    var signConfirmPassword = document.getElementById("signConfirmPassword").value;

    if (email == "" || userName == "" || password == "") {
        document.getElementById("errorMsg").innerHTML = "Please fill the required fields"
        return false;
    } else if (password.length < 8) {
        document.getElementById("errorMsg").innerHTML = "Your password must include atleast 8 characters"
        return false;
    } else {
        // alert("Successfully signed up");
        return callSignUpApi(userName, email, password, signConfirmPassword)
    }
}

function callSignUpApi(userName, email, password, signConfirmPassword) {
    $.ajax({
        url: "http://localhost:3000/register.php",
        type: "POST",
        data: { userName: userName, email: email, password: password, confirmPassword: signConfirmPassword },
        dataType: "json",
        success: function(data) {
            window.location.replace("index.html");
            return true
        },
        error: function(xhr, status, error) {
            document.getElementById("errorMsg").innerHTML = error
            return false;
        },
    });
}