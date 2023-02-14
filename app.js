const form = document.querySelector("form")
const tbody = document.querySelector("tbody")
const table = document.querySelector("table")
const checkAll = document.querySelector("#checkAll")
const deleteAll = document.getElementById(`g-delete`)
const showDone=document.getElementById("g-showDone")
const showAll =document.getElementById("g-showAll")


let editId
let users = []
let isedit = false


form.addEventListener("submit", (e) => {
    e.preventDefault()
    const firstname = e.target.fname.value
    const lastname = e.target.lname.value
    if (!isedit) {
        const user = {
            id: Date.now(),
            ischecked: false,
            firstname,
            lastname,
        }
        users.push(user)

    } else {
        users = users.map(user => {
            if (editId == user.id) {
                user.firstname = firstname
                user.lastname = lastname
            }
            return user
        })
        isedit = false
        form.addbtn.value = "add"
    }
    render(users)
    form.reset()
})


// ***********ADD TABLE*************

function render(usersArr) {
    tbody.innerHTML = ""
    usersArr.forEach(user => {
        tbody.innerHTML += `
        <tr id="${user.id}">

        <td><input class="form-check-input" type="checkbox" ${user.ischecked==true ? "checked" :null}></td>
        
        <td>${user.firstname}</td>
        
        <td>${user.lastname}</td>
        
        <td><div class="btn-group"><button id="btn-del" class="btn btn-danger btn-del">Delete</button><button id="btn-ed" class="btn btn-success btn-del">Edit</button></div></td>
        </tr>`

    })
    // users = usersArr

}
// ***********END ADD TABLE*************
table.addEventListener("click", (e) => {

    if (e.target.tagName !== "BUTTON" && e.target.tagName !== "INPUT") return
    if (e.target.id === "btn-del") {
        let deletId = e.target.closest("tr").id
        console.log(deletId);
        users= users.filter(user => user.id !== +deletId)
        render(users)
       
    }
    if (e.target.id === "btn-ed") {
        form.addbtn.value = "edit"
        editId = e.target.closest("tr").id
        const editUser = users.find(user => user.id === +editId)
        console.log(editUser);
        form.fname.value = editUser.firstname
        form.lname.value = editUser.lastname
        isedit = true
    }
    if (e.target.type === `checkbox`) {
        checkhandler();
    }
})
checkAll.addEventListener(`change`, (e) => {
    const checks = table.querySelectorAll(`[type=checkbox]`);
    if (e.target.checked === true) {
        checks.forEach(element => element.checked = true)
    } else {
        checks.forEach(element => element.checked = false)
    }
    checkhandler()
})
deleteAll.addEventListener(`click`, () => {
    users = users.filter(user => user.ischecked != true)
    checkAll.checked = false;
    render(users)
})

function checkhandler() {
    let alloftheckeckedones = table.querySelectorAll(`[type=checkbox]`)
    alloftheckeckedones.forEach(element => {
        let elementid = element.parentElement.parentElement.id;
        if (elementid) {
            if (element.checked === true) {
                users.forEach(user => {
                    if (user.id === +elementid) {
                        user.ischecked = true;
                    }
                    return user;
                })
            } else {
                users.forEach(user => {
                    if (user.id === +elementid) {
                        user.ischecked = false;
                    }
                    return user;
                })
            }
        }
    })
    console.log(users);
}

showDone.addEventListener("click",()=>{
 const showDoneFillter=users.filter(user=>user.ischecked==true)

 render(showDoneFillter)

checkhandler()


})
showAll.addEventListener("click",()=>{
    render(users)
}

)