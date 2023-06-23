document.getElementById("navbar-search-button").addEventListener("click", async function (event) {
  event.preventDefault();

  fetch("/products/list", {
    method: 'GET'
  }).then((res) => {
    if (res.ok) {
      // console.log(res.body.json)
      return res.json()
    }
    else {
      console.log("error occured: wrong login data");
    }
  }).then((data) => {
    console.log(data);
    for (let el of data) {
      document.getElementById('cards_container').innerHTML += `
        <div class="card m-1 d-flex flex-column align-items-center h-100" style="width: 18rem;">
          <div>
            <img src="${el.clPublicLink}" class="card-img-top" alt="phone_photo">
          </div>
          <div class="card-body d-flex flex-column align-items-center">
              <h5 class="card-title card-model-title">${el.manufacturer}</h5>
              <p class="card-text card-model-version">${el.model}</p>
              <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
          </div>
        </div>
      `;
    }
  })
});

let allModals = document.getElementsByClassName("modal-local");
let closeButtons = document.getElementsByClassName('modal-button-close');

let account_modal = document.getElementById("account-modal");
document.getElementById("clickable-div-account").addEventListener("click",
  (event) => { account_modal.style.display = "block"; });

document.getElementsByClassName("modal-button-close")[0].addEventListener("click",
  (event) => { account_modal.style.display = "none"; });
document.getElementsByClassName("modal-button-close")[1].addEventListener("click",
  (event) => { account_modal.style.display = "none"; });

// for (el of closeButtons) {
//   el.addEventListener("click", (event) => {
//     for (elem of allModals) {
//       elem.style.display = "none";
//     }
//   })
// }

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

document.getElementById("modal-product-info-close-cross").addEventListener("click",
  (event) => {
    document.forms["productForm"].reset()
    modal_product_info.style.display = "none";
  });

// todo function to check if creation/editon modals changed. verifuing changes

let product_info_diagonal_state = "0";
const dropDown = document.getElementById('product-info-diagonal');

dropDown.addEventListener('change', (event) => {
  product_info_diagonal_state = event.target.value;
  // console.log("dropdown", event.target.value);
});
let prodPicInp = document.getElementById("product-info-picture");
let prodPicPrev = document.getElementById("product-info-picture-preview");
prodPicInp.onchange = evt => {
  const [file] = prodPicInp.files;
  if (file) {
    prodPicPrev.src = URL.createObjectURL(file);
  }
}

let product_info_picture_input = document.getElementById("product-info-picture");
let product_info_submit = document.getElementById("product-info-submit");

function showCreateEmptyWarn() {   // bool here?
  let elem = document.getElementById("emptyfield");
  elem.style.display = "block";
}