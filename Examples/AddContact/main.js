// button for add user
let addUser = document.getElementById('adduser')
// window of form
let FormView = document.getElementById('formoverlay')
// button of exit form
let exit = document.getElementById('exit')
//submit button of form
let submitdata = document.getElementById('submit')
// ---------------- contact data  ---------
// user name
let username = document.getElementById('username')
// user phone number
let userphonenumber = document.getElementById('userphonenumber')
// user email
let userEmail = document.getElementById('userEmail')
// user address
let userAdress = document.getElementById('userAdress')
// table body.
let addContact = document.getElementById('addContact')
// search inpute
let searchInput = document.getElementById('search')
// the data set
let contactData = []
contactData =JSON.parse(window.localStorage.getItem('data')||'[]')
addContactData()

addUser.onclick = () => { 
    FormView.style.display = 'block';

}

exit.onmouseover = () => exit.style = `color:red`
exit.onmouseleave = () => exit.style.color = 'black'    
exit.onclick = () => {
    FormView.style.display = 'none';
    clearform()
    
}

let data = {}
function addContactData() {
     let row=``
     contactData.forEach((element) => {
          row += `<tr data-id=${element.id}>
                <td>${element.id}</td>
                <td>${element.userName}</td>
                <td>${element.userphonenumber}</td>
                <td >${element.userEmail}</td>
                <td >${element.userAdress}</td>
                <td class="edit">Edit</td>
                <td class="delete">Delete</td>
            </tr>`
    })
    addContact.innerHTML = row
}
function clearform() {
    username.value = ""
    userphonenumber.value=""
    userEmail.value=""
    userAdress.value=""
}
function addDataTodataSet() {
        contactData.push({
        'userName': username.value,
        'userphonenumber': userphonenumber.value,
        'userEmail': userEmail.value,
        'userAdress': userAdress.value,
        'id':contactData.length+1
        })
    window.localStorage.setItem("data",JSON.stringify(contactData))
}
let check = () => {
    if ( username.value === "")
        return 0;
    else if (userphonenumber.value==="")
        return 0;
     else if ( userEmail.value==="")
        return 0;
     else if (userAdress.value==="")
        return 0;
    else
        return 1
}
let logo = document.getElementById('logo')
let saveUserData = (e) => {
    if (check()) { 
        e.preventDefault()
        addDataTodataSet()
        addContactData()
        clearform()
        FormView.style.display = 'none';
    }
    else {
        logo.style.color = 'red'
        setTimeout(()=> {
            logo.style.color = 'black'            
        },200)
    }

}

submitdata.addEventListener('click',saveUserData)
addContact.onclick = (e) => {
    if (e.target.classList.contains('edit')) {
        submitdata.removeEventListener('click', saveUserData)
        FormView.style.display = 'block';
        let rw = e.target.parentElement
        let selectedId = rw.dataset.id
        console.log(selectedId)
        console.log(contactData[selectedId-1].userAdress)  
        username.value = contactData[selectedId-1].userName
        userphonenumber.value=contactData[selectedId-1].userphonenumber
        userEmail.value=contactData[selectedId-1].userEmail
        userAdress.value = contactData[selectedId-1].userAdress
 
       let updateUserdata = ()=>
        {
            contactData[selectedId-1].userName =  username.value
            contactData[selectedId-1].userEmail = userEmail.value
            contactData[selectedId -1].userphonenumber =userphonenumber.value
            contactData[selectedId -1].userAdress = userAdress.value
            addContactData()
           clearform()
            FormView.style.display = 'none';
            submitdata.removeEventListener('click', updateUserdata)
            submitdata.addEventListener('click', saveUserData)
            window.localStorage.setItem("data",JSON.stringify(contactData))
            }
        submitdata.addEventListener('click',updateUserdata)
            
    }
    else if (e.target.classList.contains('delete')) {
        let idCounter = 0;
        let rw = e.target.parentElement
        let selectedId = rw.dataset.id
        contactData.splice(selectedId - 1, 1)
        contactData.forEach((element)=> {
            element.id =++idCounter
        })
        window.localStorage.setItem("data",JSON.stringify(contactData))
        addContactData()
    }
}

let searchForm = searchInput.parentElement
searchForm.onsubmit = e => e.preventDefault()
let trs = document.querySelectorAll('tr')
searchInput.onkeyup = (e) => {
    let searchValue = e.target.value.toLowerCase();
    trs.forEach((row)=> {
        let thename = row.children[1].textContent.toLowerCase();
        if (thename.includes(searchValue))
            row.style.display = ''
        else
             row.style.display = 'none'
    })
}

