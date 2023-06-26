let modal_product_info = document.getElementById("modal-product-info");
let modal_product_info_header = document.getElementById("modal-product-info-header");
let product_info_button_container = document.getElementById("product-info-button-container");

document.getElementById("clickable-div-create").addEventListener("click", (e) => {
  product_info_button_container.innerHTML = 
  `<button type="button" class="btn btn-success" id="product-info-submit">Add new</button>`;
  document.getElementById("product-info-submit").addEventListener("click", () => {
    const formData = new FormData(document.getElementById('idProductForm'));
    prepareFormData(formData);
    if (validateProductForm()) {
        console.log("failed")
        showCreateEmptyWarn();
    }
    else {
        fetch("/products/addNew", {
            method: 'POST',
            body: formData
        }).then((res) => {
            if (res.ok) {
                console.log("Successfully writed.");
                closeProdForm();
                refreshProducts();
            }
            else {
                console.log("error occured while sending add_new data");
            }
        })
    }
  });
  modal_product_info_header.innerHTML = "Add new product";
  modal_product_info.style.display = "flex";
});

document.getElementById("product-view-edit").addEventListener("click", (e) => {
  // modal_product_info.style.display = "block";
  // const
  modal_product_view.style.display = "none";
  modal_product_info_header.innerHTML = "Edit product";
  product_info_button_container.innerHTML = 
  `<button type="button" class="btn btn-warning" id="product-info-edit">Update data</button>`;

  document.getElementById("product-info-edit").addEventListener("click", () => {
    const formData = new FormData(document.getElementById('idProductForm'));
    prepareFormData(formData);
    formData.append("currentItem", sessionStorage.getItem("currentItem"));
    if (validateProductForm()) {
        console.log("failed")
        showCreateEmptyWarn();
    }
    else {
        fetch("/products/updateProduct", {
            method: 'PUT',
            body: formData
        }).then((res) => {
            if (res.ok) {
                // console.log("Successfully writed.");
                closeProdForm();
                refreshProducts();
                console.log("edited")
            }
            else {
                console.log("error occured while sending add_new data");
            }
        })
    }
  });
  const prodObj = JSON.parse(sessionStorage.getItem("products")).find(obj => obj._id === sessionStorage.getItem("currentItem"));
  document.getElementById("product-info-manufacturer").value = prodObj.manufacturer;
  document.getElementById("product-info-model").value = prodObj.model;
  document.getElementById("product-info-diagonal").value = prodObj.diagonal;
  document.getElementById("product-info-processor").value = prodObj.cpu;
  document.getElementById("product-info-ram").value = prodObj.ram;
  document.getElementById("product-info-rom").value = prodObj.rom;
  document.getElementById("product-info-price").value = prodObj.price;
  document.getElementById("product-info-picture-preview").src = prodObj.clPublicLink;
  document.getElementById("product-info-picture-preview").style.display = "inline";
  modal_product_info.style.display = "flex";
});


function prepareFormData(fdata){
    // console.log("before", ...fdata);
      for (let [key, value] of fdata.entries()) {
        if (!(value instanceof File)) {
            fdata.set(key, value.trim());
        }
      }
    //   console.log("before", ...fdata);
}
function validateProductForm(){
    const fdata = new FormData(document.getElementById('idProductForm'));
    let isEmptyFlag = false;
    fdata.delete("image");
    for (let value of fdata.values()) {
        // console.log(value)
        if (value.trim() === "") {
            isEmptyFlag = true;
          break;
        }
      }
    return isEmptyFlag;
}