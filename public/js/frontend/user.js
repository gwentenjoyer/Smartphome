document.getElementById("clickable-div-logout").addEventListener("click", () =>{
fetch("/auth/logout", {
    method: "POST"
})
.then(res => {
    window.location.href = '/';
})
});
const product_view_buy = document.getElementById("product-view-buy").addEventListener("click", ()=>{
    const oldCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    oldCart.push(document.getElementById("product-view-id").innerHTML); 
    sessionStorage.setItem('cart', JSON.stringify(oldCart));
})
function openCart(){
    
}