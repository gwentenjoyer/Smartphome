const emailReg = new RegExp('^[a-z_0-9]+@[a-z]+\.[a-z]+$');

document.getElementById("submit_login").addEventListener("click", (event) => {
    let user_email_login_value = document.getElementById("user_email_login").value;
    let user_pass_login_value = document.getElementById("user_pass_login").value;
    if (user_email_login_value === "" || user_pass_login_value === "") {
        console.log("cannot be empty");
    }
    else {
        let loginData = {
            "user_email": user_email_login_value,
            "user_password": user_pass_login_value
        }
        fetch("/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(loginData)
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                console.log("error occured: wrong login data");
            }
        }).then(data => console.log("Server's response: ", data));         // dangerous when else fulfilled

    }
});

document.getElementById("submit_signup").addEventListener("click", (event) => {
    let user_email_signup_value = document.getElementById("user_email_signup").value;
    let user_pass_signup_value = document.getElementById("user_pass_signup").value;
    let user_pass_rep_signup_value = document.getElementById("user_pass_rep_signup").value;
    // console.log(user_email_signup_value, emailReg.test(user_email_signup_value))
    if (user_email_signup_value === "" || user_pass_signup_value === "" || user_pass_rep_signup_value === "") {
        console.log("Fields cannot be empty!");
    }
    else if (!emailReg.test(user_email_signup_value)) {
        console.log("Email should be correct!");
    }
    else if (user_pass_signup_value !== user_pass_rep_signup_value) {
        console.log("Passwords must be the same!");
    }
    else {
        let loginData = {
            "user_email": user_email_signup_value,
            "user_password": user_pass_signup_value
        }
        fetch("/auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': '*'
            },
            body: JSON.stringify(loginData)
        }).then((res) => {
            if (res.ok) {
                console.log("New account registered.");
            }
            else {
                console.log("error occured: wrong signup data");
            }
        }).catch(err => console.log("Server's response: ", err));         // dangerous when else fulfilled
    }
    // account_modal.style.display = "none";
});
