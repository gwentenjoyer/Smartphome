// document.getElementById("navbar-search-button").addEventListener("click");
let modal_product_view = document.getElementById("modal-product-view");
const cards_container = document.getElementById('cards_container');
async function refreshProducts (event) {
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
    sessionStorage.setItem("products", JSON.stringify(data));
    // console.log(sessionStorage.getItem("products"));
    // debugger;
    cards_container.innerHTML = "";
    for (let el of data) {
      let card = document.createElement('div');
      card.innerHTML = `
        <div id="${el._id}" class="card m-1 d-flex flex-column align-items-center h-100 productInstance" style="width: 18rem;">
          <div style="height: 390px;" class="d-flex justify-content-center">
            <img src="${el.clPublicLink}"  style="max-width: 390px; object-fit: contain;" class="card-img-top" alt="phone_photo">
          </div>
          <div class="card-body d-flex flex-column align-items-center">
              <h5 class="card-title card-model-title">${el.manufacturer + " " + el.model}</h5>
              <p class="card-text card-model-version">${el.price}грн.</p>
              <!-- <a class="card-text card-model-version route-link" href="?id=${el._id}">${el.price}грн.</a> -->
          </div>
        </div>
      `;
      card.addEventListener("click", () => {
        sessionStorage.setItem("currentItem", el._id);
        modal_product_view.style.display = "flex";
        document.getElementById("product-view-manufacturer").innerHTML = el.manufacturer;
        document.getElementById("product-view-model").innerHTML = el.model;
        document.getElementById("product-view-diagonal").innerHTML = el.diagonal;
        document.getElementById("product-view-cpu").innerHTML = el.cpu;
        document.getElementById("product-view-ram").innerHTML = el.ram;
        document.getElementById("product-view-rom").innerHTML = el.rom;
        document.getElementById("product-view-price").innerHTML = el.price;
        document.getElementById("product-view-picture-preview").src = el.clPublicLink;
        document.getElementById("product-view-id").innerHTML = el._id;  
      });
      cards_container.appendChild(card);
    }
  })
};
refreshProducts();

function openModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
}

document.getElementById("product-view-delete").addEventListener("click", () => {
  const delElementId = document.getElementById("product-view-id").innerHTML;
  // console.log(delElementId);
  fetch("/products/deleteProduct", {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({delElementId})
  }).then((res) => {
    if (res.ok) {
      modal_product_view.style.display = "none";
      console.log("Successfully deleted product.")
      refreshProducts();
    }
    else {console.log("error emmited while deleting")}
    })
});


let allModals = document.getElementsByClassName("modal-local");
let closeButtons = document.getElementsByClassName('modal-button-close');

let account_modal = document.getElementById("account-modal");
document.getElementById("clickable-div-account").addEventListener("click",
  // (event) => { account_modal.style.display = "block"; });
  (event) => { account_modal.style.display = "flex"; });

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
    case modal_product_view:
      modal_product_view.style.display = "none";
      break;
    // case modal_product_info:
    //   // modal_product_info.style.display = "none";
    //   closeProdForm();
    //   break;
  }
}

let cart_modal = document.getElementById("cart-modal");
document.getElementById("clickable-div-cart").addEventListener("click", (event) => {
  // cart_modal.style.display = "block";
  cart_modal.style.display = "flex";
});
document.getElementsByClassName("btn-close")[0].addEventListener("click", (e) => {
  cart_modal.style.display = "none";
});

document.getElementById("modal-product-info-close-cross").addEventListener("click", (event) => {closeProdForm();});

let product_info_diagonal_state = "0";
const dropDown = document.getElementById('product-info-diagonal');

dropDown.addEventListener('change', (event) => {
  product_info_diagonal_state = event.target.value;
});
let prodPicInp = document.getElementById("product-info-picture");
let prodPicPrev = document.getElementById("product-info-picture-preview");
prodPicInp.onchange = evt => {
  prodPicPrev.style.display = "inline";
  const [file] = prodPicInp.files;
  if (file) {
    prodPicPrev.src = URL.createObjectURL(file);
  }
}

let product_info_picture_input = document.getElementById("product-info-picture");
// let product_info_submit = document.getElementById("product-info-submit");
let emptyFieldAlarm = document.getElementById("emptyfield");
let product_view_edit = document.getElementById("product-view-edit");

function showCreateEmptyWarn() {   // bool here?
  emptyFieldAlarm.style.display = "block";
}  

function closeProdForm(){
  document.forms["productForm"].reset();
  prodPicPrev.style.display = "none";
  prodPicPrev.src = "#";
  modal_product_info.style.display = "none";
  emptyFieldAlarm.style.display = "none";
}
