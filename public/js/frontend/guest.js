document.getElementById("clickable-div-account").addEventListener("click",
  (event) => { account_modal.style.display = "flex"; });
const error_text_log = document.getElementById("error-text-log");
const error_text_reg = document.getElementById("error-text-reg");

document.getElementById("clickable-div-cart").addEventListener("click", (event) => {
    cart_modal.style.display = "flex";
});