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
(event) => { modal_product_info.style.display = "none"; });

// todo function to check if creation/editon modals changed. verifuing changes

let product_info_diagonal_state = "0";
  const dropDown = document.getElementById('product-info-diagonal');
  // const textBox = document.getElementById('textBox');

  dropDown.addEventListener('change', (event) => {
    product_info_diagonal_state = event.target.value;
    console.log("dropdown", event.target.value);
    // textBox.value = event.target.value;
   });
let prodPicInp = document.getElementById("product-info-picture");
let prodPicPrev = document.getElementById("product-info-picture-preview");
prodPicInp.onchange = evt => {
    const [file] = prodPicInp.files;
    if (file) {
      prodPicPrev.src = URL.createObjectURL(file);
      console.log(file);
      // console.log(prodPicInp.files);
      console.log(URL.createObjectURL(file));
    }
  }
  // console.log(prodPicInp.files);

let product_info_picture_input = document.getElementById("product-info-picture");

let product_info_submit = document.getElementById("product-info-submit");

product_info_submit.addEventListener("click", (event) =>{
  let createData = {
    manufacturer: document.getElementById("product-info-manufacturer").value,
    model: document.getElementById("product-info-model").value,
    diagonal: product_info_diagonal_state,
    cpu: document.getElementById("product-info-processor").value,
    ram: document.getElementById("product-info-ram").value,
    rom: document.getElementById("product-info-rom").value
  };
  console.log(createData);
});