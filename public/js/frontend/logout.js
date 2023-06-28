document.getElementById("clickable-div-logout").addEventListener("click", () =>{
    fetch("/auth/logout", {
        method: "POST"
    })
    .then(res => {
        sessionStorage.clear();
        window.location.href = '/';
    })
});