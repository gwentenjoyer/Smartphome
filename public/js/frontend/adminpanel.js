// let tableUsers = document.querySelector(".tbody");
// (function fillUsers(){
//     fetch("/edit/showUsers", {
//     method: "GET"
//     })
//     .then(res => {return res.json()})
//     .then((usersInfo) => {
//         for (const key in usersInfo) {
//         let tableRow = document.createElement("tr");
//         tableRow.id= "column-"+key;
//         tableRow.className= "column-"+key;
//         //   stripe.id = key;
//         tableRow.innerHTML =
//           `
//             <td>${key}</td>
//             <td>${usersInfo[key].user_email}</td>
//             <td>${usersInfo[key].user_password}</td>
//             <td class="userRole">${usersInfo[key].isAdmin}</td>
//           `;
//         tableUsers.append(tableRow);
//         }
//         // console.log(tableUsers.childNodes.length)
//     });
// }())

// let buttonEdit = document.getElementById("reduct_user");
// let buttonCancelEdit = document.getElementById("red_cancel_user");

// let delete_user = document.getElementById("delete_user");
// let cancel_user = document.getElementById("cancel_user");

// // buttonEdit.addEventListener("click", function (){
// //   buttonEdit.style.display = "none";
// //   buttonCancelEdit.style.display = "block";
// //   delete_user.style.display = "none";
// //   cancel_user.style.display = "block";

// // //   for(let node in tableUsers.childNodes){
// //     // console.log(tableUsers.childNodes.length)
// // for(let node=1; node<tableUsers.childNodes.length; node++) {
// //     let userData = document.getElementById("column-"+node);
// //     console.log("userData.childNodes.length", userData.childNodes[6].childNodes.length)
// //     let roleSelect = document.createElement('select');
// //     roleSelect.onchange = updateRole;
// //     roleSelect.id = node;
// //     roleSelect.required = true;
// //     if(userData.childNodes[6].textContent==="true") {
// //         // if(document.getElementsByClassName("userRole")[node].textContent==="true") {
// //         console.log("admin")
//         // roleSelect.innerHTML = `
//         // <option selected>admin</option>
//         // <option >user</option>
// //     `
// //     }else{
// //         console.log("user")
// //     roleSelect.innerHTML = `
// //         <option selected>user</option>
// //         <option>admin</option>
// //     `
// //     }
// //     console.log(node)
// //     document.getElementsByClassName("userRole")[node].replaceWith(roleSelect);
    
// //   }

// // })
// buttonEdit.onclick = function (){
//     buttonEdit.style.display = "none"
//     buttonCancelEdit.style.display = "block"
//     delete_user.style.display = "none"
//     cancel_user.style.display = "block";
//     for(let i=1; i<tableUsers.childNodes.length; i++) {
//       let userDataRow = document.getElementsByClassName("column-"+i)[0]
  
//       let roleSelect = document.createElement('select')
//       roleSelect.className = "editRole"
//       roleSelect.onchange = updateRole
//       roleSelect.id = i;
//       roleSelect.required = true
//       if(userDataRow.childNodes[6].textContent==="true") {
//         roleSelect.innerHTML = `
//             <option selected>admin</option>
//             <option >user</option>`
//       }else{
//         roleSelect.innerHTML = `
//         <option >admin</option>
//         <option selected>user</option>`
//       }
//       userDataRow.childNodes[6].childNodes[0].replaceWith(roleSelect)
//     }
//   }
// updateRole = function(){
//   let isAdmin = this.value
//   let id = this.id
//   let toSendData = {
//     "old_user_email":document.getElementsByClassName("column-"+id)[0].childNodes[2].childNodes[0].value,
//     "old_user_password": document.getElementsByClassName("column-"+id)[0].childNodes[4].childNodes[0].value
//   }
//   if(role === "admin"){
//     toSendData.old_isAdmin = true;
//     toSendData.newRole = false;
//   }else{
//     toSendData.old_isAdmin = false;
//     toSendData.newRole = true;
//   }
//   console.log(toSendData);
//   fetch("/edit/updateUser", {
//     method: 'POST',
//     headers:{
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Headers': '*'
//     },
//     body: JSON.stringify(toSendData)})
// }

// cancel_user.onclick = function(){
//   cancel_user.style.display = "none";
//   delete_user.style.display = "block";
//   buttonEdit.style.display = "block"
//   for (let i = 1; i < tableUsers.childNodes.length; i++) {
//     let cross = document.getElementsByClassName("cross6")[0];
//     cross.remove()
//   }
// }

// delete_user.onclick = function () {
//   cancel_user.style.display = "block";
//   delete_user.style.display = "none";
//   buttonEdit.style.display = "none"
//   for (let i = 1; i < tableUsers.childNodes.length; i++) {
//     let cross = document.createElement("span");
//     cross.className = "cross6";
//     cross.id = i;
//     cross.innerHTML = "&times;";
//     tableUsers.childNodes[i].append(cross);
//   }
//   cross = document.querySelectorAll(".cross6");
//   document.onclick = function (event) {
//     if (event.target.className === "cross6") {
//       cross_id = event.target.id;
//       const delete_us =
//           document.querySelectorAll(".dat"+cross_id)[0].childNodes[2].textContent;
//       const del_pass =
//           document.querySelectorAll(".dat"+cross_id)[0].childNodes[4].textContent;
//       const del_role =
//           document.querySelectorAll(".dat"+cross_id)[0].childNodes[6].textContent;
//       console.log(delete_us)
//       let formData = {
//         "user_email":delete_us,
//         "user_password":del_pass,
//         "role":del_role
//       }
//       fetch('/edit/deleteUser',{
//         method:'POST',
//         headers:{
//           'Content-Type': 'application/json',
//           'Access-Control-Allow-Headers': '*'
//         },
//         body: JSON.stringify(formData)})
//           .then(res=>{
//             if(res.ok)
//               document.location.reload();
//             else
//               document.location = "/"
//           })
//     }
//   }
// }

let tables = document.querySelector(".tbody");
let h = 0;
fetch("/edit/showUsers", {
    method: "GET"
    })
  .then(res => res.json())
  .then((dataUser) => {
    for (const key in dataUser) {
      let stripe = document.createElement("tr");
      h++;
      stripe.className= "dat"+h;
      stripe.id = h;
      stripe.innerHTML =
      `
        <td>${key}</td>
        <td>${dataUser[key].user_email}</td>
        <td>${dataUser[key].user_password}</td>
        <td class="userRole">${dataUser[key].isAdmin?"admin":"user"}</td>
      `;
      tables.append(stripe);
    }
  });

let btnEdit = document.getElementById("reduct_user");
let btnCanEdit = document.getElementById("red_cancel_user");

let check_user = document.getElementById("delete_user");
let cancel_user = document.getElementById("cancel_user");

btnEdit.addEventListener("click", ()=>{
  btnEdit.style.display = "none"
  btnCanEdit.style.display = "block"
  check_user.style.display = "none"
  for(let i=1; i<tables.childNodes.length; i++) {
    let datas = document.getElementsByClassName("dat"+i)[0]

    let lge = document.createElement('select')
    lge.className = "editRole"
    lge.onchange = updateRole
    lge.id = i;
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
})

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
    console.log(toSendData);
    fetch("/edit/updateUser", {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*'
      },
      body: JSON.stringify(toSendData)})
  }

cancel_user.onclick = function(){
  cancel_user.style.display = "none";
  check_user.style.display = "block";
  btnEdit.style.display = "block"
  for (let i = 1; i < tables.childNodes.length; i++) {
    let cross = document.getElementsByClassName("cross6")[0];
    cross.remove()
  }
}

check_user.onclick = function () {
  cancel_user.style.display = "block";
  check_user.style.display = "none";
  btnEdit.style.display = "none"
  for (let i = 1; i < tables.childNodes.length; i++) {
    let cross = document.createElement("span");
    cross.className = "cross6";
    cross.id = i;
    cross.innerHTML = "&times;";
    tables.childNodes[i].append(cross);
  }
  cross = document.querySelectorAll(".cross6");
  document.onclick = function (event) {
    if (event.target.className === "cross6") {
      cross_id = event.target.id;
      const delete_us =
          document.querySelectorAll(".dat"+cross_id)[0].childNodes[2].textContent;
      const del_pass =
          document.querySelectorAll(".dat"+cross_id)[0].childNodes[4].textContent;
      const del_role =
          document.querySelectorAll(".dat"+cross_id)[0].childNodes[6].textContent;
      console.log(delete_us)
      let formData = {
        "user_email":delete_us,
        "user_password":del_pass,
        "role":del_role
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
              document.location.reload();
            else
              document.location = "/"
          })
    }
  }
}