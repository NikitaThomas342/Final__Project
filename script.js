
function addStudentToTable(index,student){
    const tbody = document.getElementById('tbody')

    let row = document.createElement('tr')
    let cell = document.createElement('th')
    cell.setAttribute('score','row')
    cell.innerHTML = index
    row.appendChild(cell)
    cell = document.createElement('td')
    let names = document.createElement('p')
    names.innerHTML = `${student.name} ${student.surname}`
    names.addEventListener('click',function(){
        showsingleClick(student.id)
    })
    cell.appendChild(names)
    row.appendChild(cell)
    cell = document.createElement('td')
    let image = document.createElement('img')
    image.src = student.image
    image.height = 200

    cell.appendChild(image)
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.gpa
    row.appendChild(cell)

    cell = document.createElement('td')
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-primary')
    button.setAttribute('type','button')
    button.innerText ='edit'
    button.addEventListener('click', function (){
        editStudent(student.id)
    })
    cell.appendChild(button)
    row.appendChild(cell)


    cell = document.createElement('td')
    button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-danger')
    button.setAttribute('type','button')
    button.innerText ='delete'
    button.addEventListener('click', function () { 
        let confirmDel = confirm(`Are you sure you want to delete ${student.name}?`)
        if(confirmDel){
            console.log(student.id)
            deleteStudent(student.id)
        } 
    })
    cell.appendChild(button)
    row.appendChild(cell)
    row.appendChild(cell)
    tbody.appendChild(row)

}
function addStudentList(StudentList){
    let counter = 1;
    const tbody = document.getElementById('tbody')
    tbody.innerHTML = ''
    for (student of StudentList){
        addStudentToTable(counter++,student)
    }
}
function showAllStudents(){
    fetch('https://dv-student-backend-2019.appspot.com/students')
    .then((response) => {
        return response.json()
    }).then(data =>{
        addStudentList(data)
    })
}
function addStudentToDB(student){
    fetch('https://dv-student-backend-2019.appspot.com/students',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    }).then(response =>{
        if(response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data =>{
        alert('Success')
        showAllStudents()
    })
}
function onAddStudentClick(){
    let student = {}
    student.name = document.getElementById('nameInput').value
    student.surname = document.getElementById('surnameInput').value
    student.studentId = document.getElementById('studentIdInput').value
    student.gpa = document.getElementById('gpaInput').value
    student.image = document.getElementById('imageLinkInput').value
    addStudentToDB(student)
}

function onSearchClick(){
    id = document.getElementById('searchValue').value
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`)
    .then((response) => {
        return response.json()
    }).then(data => {
        searchResultList(data);
    })
}

function searchResultList(resultList){
    let counter = 1;
    const searchResultBody = document.getElementById('searchResultBody')
    searchResultBody.innerHTML = ''
    searchResultData(counter++,resultList)
}

function searchResultData(index,student){
    const searchResultBody = document.getElementById('searchResultBody')

    let row = document.createElement('tr')
    let cell = document.createElement('th')
    cell.setAttribute('score','row')
    cell.innerHTML = index
    row.appendChild(cell)
    cell = document.createElement('td')
    let names = document.createElement('p')
    names.innerHTML = `${student.name} ${student.surname}`
    names.addEventListener('click',function(){
        showsingleClick(student.id)
    })
    cell.appendChild(names)
    row.appendChild(cell)
    cell = document.createElement('td')
    let image = document.createElement('img')
    image.src = student.image
    image.height = 200

    cell.appendChild(image)
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.gpa
    row.appendChild(cell)

    cell = document.createElement('td')
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-primary')
    button.setAttribute('type','button')
    button.innerText ='edit'
    button.addEventListener('click', function (){
        editStudent(student.id)
    })
    cell.appendChild(button)
    row.appendChild(cell)

    cell = document.createElement('td')
    button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-danger')
    button.setAttribute('type','button')
    button.innerText ='delete'
    button.addEventListener('click', function () { 
        let confirmDel = confirm(`Are you sure you want to delete ${student.name}?`)
        if(confirmDel){
            console.log(student.id)
            deleteStudent(student.id)
        } 
    })
    cell.appendChild(button)
    row.appendChild(cell)
    row.appendChild(cell)
    searchResultBody.appendChild(row)

}
function showsingleClick(id){
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`)
    .then((response) => {
        return response.json()
    }).then(data => {
        hideAll()
        singleStudentResult.style.display="block"
        addStudentData(data);
    })
}
function addStudentData(student){
    let idElem = document.getElementById('id')
    idElem.innerHTML = student.id
    let studentIdElem = document.getElementById('studentId')
    studentIdElem.innerHTML = student.studentId
    let nameElem = document.getElementById('name')
    nameElem.innerHTML = `${student.name} ${student.surname}`
    let gpaElem = document.getElementById('gpa')
    gpaElem.innerHTML = student.gpa
    let profileElem = document.getElementById('image')
    profileElem.setAttribute('src',student.image)
    profileElem.height=300
}

function deleteStudent(id){
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`,{
        method: 'DELETE'
    }).then(response =>{
        if(response.status == 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data =>{
        alert(`Student name ${data.name} is now deleted`)
        showAllStudents()
    }).catch(error =>{
        alert('your input student id is not in the database')
    })
}

function editStudent(id){
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`)
    .then(response => {
        if(response.status == 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data =>{
        hideAll()
        editForm(data)
    })
}

function editForm(data){
    editPage.style.display="block"
    let idElem = document.getElementById('editid')
    idElem.innerHTML = data.id
    let studentIdElem = document.getElementById('editstudentId')
    studentIdElem.innerHTML = data.studentId
    let nameElem = document.getElementById('editname')
    nameElem.innerHTML = `${data.name} ${data.surname}`
    let gpaElem = document.getElementById('editgpa')
    gpaElem.innerHTML = data.gpa
    let profileElem = document.getElementById('editimage')
    profileElem.setAttribute('src',data.image)
    profileElem.width=200
    profileElem.height=200
    editid = data.id
}
var editid
document.getElementById('editButton').addEventListener('click',(event)=>{
        editonClick()
})
function editonClick(){
    let edit = {}
    edit.id = editid
    edit.name = document.getElementById('editnameInput').value
    edit.surname = document.getElementById('editsurnameInput').value
    edit.studentId = document.getElementById('editstudentIdInput').value
    edit.gpa = document.getElementById('editgpaInput').value
    edit.image = document.getElementById('editimageLinkInput').value
    console.log(JSON.stringify(edit))
    edittoDB(edit)
}
function edittoDB(data){
    
    console.log(id)
    fetch(`https://dv-student-backend-2019.appspot.com/students`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response =>{
        if(response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data =>{
        alert('Success')
        showAllStudents()
    })
}

function onLoad(){
    
    fetch('https://dv-student-backend-2019.appspot.com/students').then((response) => {
        return response.json()
    }).then(data => {
        hideAll()
        listStudentResult.style.display="block"
        addStudentList(data);
    })
}

document.getElementById('searchButton').addEventListener('click',(event)=>{
    onSearchClick()
})

document.getElementById('addButton').addEventListener('click',(event)=>{
    onAddStudentClick()
})

var singleStudentResult = document.getElementById('single_student_result')
var listStudentResult = document.getElementById('output')
var addUserDetail= document.getElementById('addUserDetail')
var searchBar = document.getElementById('searchBar')
var searchResult =document.getElementById('searchResult')
var editPage = document.getElementById('edit_student_result')

function hideAll(){
    singleStudentResult.style.display='none'
    listStudentResult.style.display='none'
    addUserDetail.style.display='none'
    searchBar.style.display='none'
    searchResult.style.display='none'
    editPage.style.display='none'
}

document.getElementById('allStudentMenu').addEventListener('click',(event)=>{
    hideAll()
    listStudentResult.style.display="block"
    showAllStudents()
})
document.getElementById('addStudentMenu').addEventListener('click',(event)=>{
    hideAll()
    addUserDetail.style.display='block'
})
document.getElementById('searchMenu').addEventListener('click',(event)=>{
    hideAll()
    searchBar.style.display='inline'
    searchResult.style.display='block'
})