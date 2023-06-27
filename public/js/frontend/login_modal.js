const emailPattern = new RegExp('^[a-z_0-9]+@[a-z]+\.[a-z]+$');

const user_email_login = document.getElementById("user_email_login");
const user_pass_login = document.getElementById("user_pass_login");
const user_email_signup = document.getElementById("user_email_signup");
const user_pass_signup = document.getElementById("user_pass_signup");
const user_pass_rep_signup = document.getElementById("user_pass_rep_signup");

document.getElementById("submit_login").addEventListener("click", (event) => {
    if (user_email_login.value === "" || user_pass_login.value === "") {
        showLogError("Fields cannot be empty!")
    }
    else if (!emailPattern.test(user_email_login.value)) {
        showLogError("Email should be correct!");
    }
    else {
        let loginData = {
            "user_email": user_email_login.value ,
            "user_password": user_pass_login.value
        }
        fetch("/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(loginData)
        }).then((res) => {
            switch (res.status){
                case 204: console.log("loged successfully");
                    break;
                case 404: showLogError("This account does not exists.");
            }
        })
    }
});

function closeAccountModal(){
     user_email_login.value = "";
     user_pass_login.value = "";
     user_email_signup.value = "";
     user_pass_signup.value = "";
     user_pass_rep_signup.value = "";
     error_text_reg.style.display = "none";
     error_text_log.style.display = "none";
     account_modal.style.display = "none";
     error_text_reg.style.display = "none"
//   emptyFieldAlarm.style.display = "none";
}
function showLogError(errorText){
    error_text_log.style.display = "block";
    error_text_log.innerHTML = errorText;
}
function showRegError(errorText){
    error_text_reg.style.display = "block";
    error_text_reg.innerHTML = errorText;
}
document.getElementById("submit_signup").addEventListener("click", (event) => {
    // console.log(user_email_signup_value, emailReg.test(user_email_signup_value))
    if (user_email_signup.value === "" || user_pass_signup.value === "" || user_pass_rep_signup.value === "") {
        showRegError("Fields cannot be empty!");
    }
    else if (!emailPattern.test(user_email_signup.value)) {
        showRegError("Email should be correct!");
    }
    else if (user_pass_signup.value !== user_pass_rep_signup.value) {
        showRegError("Passwords must be the same!");
    }
    else {
        let loginData = {
            "user_email": user_email_signup.value,
            "user_password": user_pass_signup.value
        }
        fetch("/auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(loginData)
        }).then((res) => {
            if (res.status == 201) {
                console.log("New account registered.");
            }
            else if (res.status === 403){
                showRegError("Account already exists!");
            }
            else {
                console.log("error occured: wrong signup data");
            }
        }).catch(err => console.log("Server's response: ", err));
    }
    // account_modal.style.display = "none";
});
