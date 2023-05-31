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
    (event) => { account_modal.style.display = "none";});
document.getElementsByClassName("modal-button-close")[1].addEventListener("click",
    (event) => { account_modal.style.display = "none";});

window.onclick = function(event) {
  if (event.target == account_modal) {
    account_modal.style.display = "none";
  }
  else if (event.target == busket_modal) {
    busket_modal.style.display = "none";
  }
}


let busket_modal = document.getElementById("busket-modal");
document.getElementById("clickable-div-busket").addEventListener("click", (event) => {
  busket_modal.style.display = "block";
});
document.getElementsByClassName("btn-close")[0].addEventListener("click", (e)=>{
  busket_modal.style.display="none";
});
// window.onclick = function(event) {
//   if (event.target == busket_modal) {
//     busket_modal.style.display = "none";
//   }
// };
