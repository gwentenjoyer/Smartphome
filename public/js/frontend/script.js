document.getElementById("navbar-search-button").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById('cards_container').innerHTML += `
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

let allModals = document.getElementsByClassName("modal-local");
let closeButtons = document.getElementsByClassName('modal-button-close');

let account_modal = document.getElementById("account-modal");
document.getElementById("clickable-div-account").addEventListener("click",
  (event) => { account_modal.style.display = "block"; });

for (el of closeButtons) {
  el.addEventListener("click", (event) => {
    for (elem of allModals) {
      elem.style.display = "none";
    }
  })
}

window.onclick = function (event) {
  switch (event.target) {
    case account_modal:
      account_modal.style.display = "none";
      break;
    case cart_modal:
      cart_modal.style.display = "none";
      break;
    case modal_product_info:
      modal_product_info.style.display = "none";
      break;
  }
}

let cart_modal = document.getElementById("cart-modal");
document.getElementById("clickable-div-cart").addEventListener("click", (event) => {
  cart_modal.style.display = "block";
});
document.getElementsByClassName("btn-close")[0].addEventListener("click", (e) => {
  cart_modal.style.display = "none";
});

const emailReg = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

let modal_product_info = document.getElementById("modal-product-info");
document.getElementById("clickable-div-create").addEventListener("click", (e) => {
  modal_product_info.style.display = "block";
});
