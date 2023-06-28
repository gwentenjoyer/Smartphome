document.getElementById("product-view-buy").addEventListener("click", ()=>{
    const oldCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    oldCart.push(document.getElementById("product-view-id").innerHTML); 
    sessionStorage.setItem('cart', JSON.stringify(oldCart));
})

const table_cart = document.getElementById("table-cart");
function openCart(){
    table_cart.innerHTML = "";
    const cartObj = JSON.parse(sessionStorage.getItem('cart'));
    const allProds = JSON.parse(sessionStorage.getItem("products"));
    let sum = 0;
    console.log(cartObj);
    for(obj of cartObj){
        const desiredObject = allProds.find(object => object._id === obj);
        var row = document.createElement('tr');
        row.innerHTML = `
            <tr>
                <td>${desiredObject.manufacturer}</td>
                <td>${desiredObject.model}</td>
                <td>${desiredObject.price}</td>
                <td>close</td>
            </tr>
        `
        sum += desiredObject.price;
        table_cart.appendChild(row);
    }
    let lastRow = document.createElement('tr');
    lastRow.innerHTML = `
    <tr id="total-sum">
        <td colspan="2"style="text-align:right; padding: 0px 10px;"><b>Total sum:</b></td>
        <td class="text-success" style="font-weight:bold;">${sum}</td>
        <td></td>
    </tr>
    `
    table_cart.appendChild(lastRow);
    const btn = document.getElementById("button-order");
    // btn.addEventListener("click", (e)=>{})
}
document.getElementById("clickable-div-cart").addEventListener("click", (event) => {
    cart_modal.style.display = "flex"; 
    openCart()
});