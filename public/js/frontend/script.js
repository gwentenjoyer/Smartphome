document.getElementById("navbar-search-button").addEventListener("click", function (event) {
  event.preventDefault();
  // document.getElementsByClassName('cards-container')[0].appendChild('sdfasdfasgdedg');
  document.getElementsByClassName('cards-container')[0].innerHTML += `
        <div class="card m-2" style="width: 18rem;">
            <img src="/img/001.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the
                    bulk
                    of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    `;
});

let account_modal = document.getElementById("account-modal");
document.getElementById("clickable-div-account").addEventListener("click",
  (event) => { account_modal.style.display = "block"; });

document.getElementsByClassName("modal-button-close")[0].addEventListener("click",
  (event) => { account_modal.style.display = "none"; });
document.getElementsByClassName("modal-button-close")[1].addEventListener("click",
  (event) => { account_modal.style.display = "none"; });

window.onclick = function (event) {
  if (event.target == account_modal) {
    account_modal.style.display = "none";
  }
  else if (event.target == cart_modal) {
    cart_modal.style.display = "none";
  }
}

let cart_modal = document.getElementById("cart-modal");
document.getElementById("clickable-div-cart").addEventListener("click", (event) => {
  cart_modal.style.display = "block";
});
document.getElementsByClassName("btn-close")[0].addEventListener("click", (e) => {
  cart_modal.style.display = "none";
});

document.getElementById("submit_login").addEventListener("click", (event) => {
  let user_email_login_value = document.getElementById("user_email_login").value;
  let user_pass_login_value = document.getElementById("user_pass_login").value;
  if (user_email_login_value === "" || user_pass_login_value === "") {
    console.log("cannot be empty");
  }
  else {
    let loginData = {
      "user_email": user_email_login_value,
      "user_pass": user_pass_login_value
    }
    fetch("/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify(loginData)
    }).then((res) => {
      if(res.ok){
        return res.json()
        // const safd = await res.json();
        // console.log("you're in", await res.json());
      }
      else{
        console.log("error occured: wrong login data");
      }
    }).then(data => console.log(data));
  }

  // console.log(JSON.stringify(loginData));
  // account_modal.style.display = "none";
});

document.getElementById("submit_sighup").addEventListener("click", (event) => {
  let user_email_signup_value = document.getElementById("user_email_signup").value;
  let user_pass_signup_value = document.getElementById("user_pass_signup").value;
  let user_pass_rep_signup_value = document.getElementById("user_pass_rep_signup").value;

  let loginData = {
    "user_email": user_email_signup_value,
    "user_pass": user_pass_signup_value
  }
  console.log(JSON.stringify(loginData));

  // account_modal.style.display = "none";

});

// let emailReg = new RegExp('\w{4,18}@\w{2,8}\.[a-z]{2,3}');
const emailReg = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
let emailExample = "bokuwaikitei@gmail.com";
console.log("res: ", emailReg.test(emailExample));