let tableUsers = document.querySelector(".tbody");
let key = 0;
const retrieveUsers = async function() {
    tableUsers.innerHTML = ""
    fetch("/edit/showUsers", {
    method: "GET"
    })
  .then(res => res.json())
  .then((usersInfo) => {
    for (key in usersInfo) {
      let accountRow = document.createElement("tr");
      accountRow.className= "dat"+key;
      accountRow.id = key;
      accountRow.innerHTML =
      ` <td>${key}</td>
        <td>${usersInfo[key].user_email}</td>
        <td>${usersInfo[key].user_password}</td>
        <td class="userRole">${usersInfo[key].isAdmin?"admin":"user"}</td>
        <td ><span class="cross-del-acc" id="t${key}">&times</span></td>
      `;
      tableUsers.append(accountRow);
      func();
      document.getElementById(`t${key}`).addEventListener("click", (event) =>{
        console.log(event)
        cross = document.querySelectorAll(".cross-del-acc");
      cross_id = event.target.id;
    let formData = {
        "user_email": document.querySelectorAll(".da"+cross_id)[0].childNodes[3].textContent,
        "user_password": document.querySelectorAll(".da"+cross_id)[0].childNodes[5].textContent,
        "idAdmin": document.querySelectorAll(".da"+cross_id)[0].childNodes[7].textContent
      }
      fetch('/edit/deleteUser',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': '*'
        },
        body: JSON.stringify(formData)})
          .then(res=>{
            if(res.ok)
                retrieveUsers();
            else
                console.log("Error occured while deleting an account.")
          })
      }
    )
    }
  });
}
retrieveUsers();

function func(){
    if(key != 0){
    let datas = document.getElementsByClassName("dat"+key)[0]

    let lge = document.createElement('select')
    lge.className = "editRole"
    lge.onchange = updateRole
    lge.id = key;
    lge.required = true
    if(datas.childNodes[7].textContent==="admin") {
      lge.innerHTML = "<option>user</option>\n" +
          "<option selected>admin</option>"
    }else{
      lge.innerHTML = "<option selected>user</option>\n" +
          "<option>admin</option>"
    }
    datas.childNodes[7].childNodes[0].replaceWith(lge)
}
}
updateRole = function(){
    let isAdmin = this.value
    let id = this.id
    let toSendData = {
      "old_user_email":document.getElementsByClassName("dat"+id)[0].childNodes[3].childNodes[0].textContent,
      "old_user_password": document.getElementsByClassName("dat"+id)[0].childNodes[5].childNodes[0].textContent
    }
    if(isAdmin === "admin"){
      toSendData.old_isAdmin = false;
      toSendData.new_isAdmin = true;
    }else{
        toSendData.old_isAdmin = true;
        toSendData.new_isAdmin = false;
    }
    fetch("/edit/updateUser", {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify(toSendData)})
  }
