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
    printProducts(data);
  })
};
refreshProducts();

function openModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
}

// let closeButtons = document.getElementsByClassName('modal-button-close');

let account_modal = document.getElementById("account-modal");

function searchProduct(value){
  let block = document.querySelectorAll(".productInstance");
  if(value !== ''){
      block.forEach((names)=>{
          if(names.childNodes[3].childNodes[1].textContent.toLowerCase().search(value) === -1 && names.childNodes[3].childNodes[1].textContent.search(value) === -1){
              names.parentNode.style.display = "none"
          }else if(names.childNodes[3].childNodes[1].textContent.search(value) === -1){
              names.parentNode.style.display = "block"
          }else{
              names.parentNode.style.display = "block"
          }
      })
  }else{
      block.forEach((names)=>{
          names.parentNode.style.display = "block"
      })
  }
}


document.getElementsByClassName("modal-button-close")[0].addEventListener("click",
  (event) => { closeAccountModal(); });
document.getElementsByClassName("modal-button-close")[1].addEventListener("click",
  (event) => { closeAccountModal(); });

window.onclick = function (event) {
  switch (event.target) {
    case account_modal:
      closeAccountModal();
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

function sortPhones(){
  const products = JSON.parse(sessionStorage.getItem("products"))
  let value = document.getElementById("sortby").value;
  if (value === "0") printProducts(products);
  else if(value === "1"){
    printProducts(products.sort((a, b) => a.price - b.price))
  }
  else{
    printProducts(products.sort((a, b) => b.price - a.price))
  }
}

function printProducts(prods){
  cards_container.innerHTML = "";
  for (let el of prods) {
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
}