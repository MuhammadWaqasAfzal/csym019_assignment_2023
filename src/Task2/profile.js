//document.addEventListener("DOMContentLoaded", onPageLoad); //myLoadEvent);

function onProfilePageLoad() {
  setTimeout(() => {
    console.log("waqas");
    document.getElementById("userName").value =
      localStorage.getItem("userName");
    document.getElementById("userName").readOnly = true;

    document.getElementById("email").value = localStorage.getItem("email");
    document.getElementById("email").readOnly = true;

    document.getElementById("password").value =
      localStorage.getItem("password");
    document.getElementById("password").readOnly = true;

    //  document.getElementById("confirmPassword").value = localStorage.getItem("password") ;
    //  document.getElementById("confirmPassword").readOnly = true;

    document.querySelector("#cancelBtn").style.display = "none";
    document.querySelector("#updateBtn").style.display = "none";
    document.querySelector("#editBtn").style.display = "block";
    $("body").removeClass("loading");
  }, 100);
}

function showPassword() {
  var password = document.getElementById("password");
  // var confirmPassword = document.getElementById("confirmPassword");

  if (password.type === "password") {
    password.type = "text";
    //  confirmPassword.type = "text";
  } else {
    password.type = "password";
    //   confirmPassword.type = "password";
  }
}

function editProfile() {
  document.getElementById("userName").readOnly = false;
  document.getElementById("userName").focus();
  document.getElementById("password").readOnly = false;
  // document.getElementById("confirmPassword").readOnly = false;

  document.querySelector("#editBtn").style.display = "none";
  document.querySelector("#cancelBtn").style.display = "block";
  document.querySelector("#updateBtn").style.display = "block";
}

function cancelUpdate() {
  document.getElementById("userName").readOnly = true;
  document.getElementById("password").readOnly = true;
  // document.getElementById("confirmPassword").readOnly = true;

  document.querySelector("#editBtn").style.display = "block";
  document.querySelector("#cancelBtn").style.display = "none";
  document.querySelector("#updateBtn").style.display = "none";
}

function updateProfile() {
  $("body").addClass("loading");
 
  cancelUpdate();

  $.ajax({
    url: "http://localhost:3000/editUserName.php",
    type: "POST",
    dataType: "json",
    data: {
      userName: document.getElementById("userName").value,
      email: localStorage.getItem("email"),
      password :  document.getElementById("password").value
    },
    success: function (data) {
      localStorage.setItem("userId", data.data.Id);
      localStorage.setItem("userName", data.data.userName);
      localStorage.setItem("email", data.data.email);
      localStorage.setItem("password", data.data.password);
      setUserName();
      $("body").removeClass("loading");
    },
    error: function () {
      $("body").removeClass("loading");

      console.log("Fetch Error");
    },
  });
}
