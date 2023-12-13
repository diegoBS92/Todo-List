import './style.css'

let addbtn = document.querySelector('.btnadd')
let subbtn = document.querySelector('.submit')
let addprojectbtn = document.querySelector('.addproject')
let submitproject  = document.querySelector('.submitproject')
let title = document.querySelector('.title')
let description = document.querySelector('.description')
let date = document.querySelector('.date')
let priority = document.querySelector('#priority')
let selectform = document.querySelector('#todoarray')
let newproject = document.querySelector('.newproject')
let displayprojects = document.querySelector('.displayprojects')
let displaytodos = document.querySelector('.displaytodos')
let dialogtodo = document.querySelector('.dialognewtodo')
let dialogproject = document.querySelector('.dialognewproject')



//array of todos
let mainarray = [
    {
        maintitle: 'home',
        todos: [
            {
                title: 'newproject',
                descripcion: 'make a new project',
                duedate: '20/12/23',
                priority: 'low',
            },
            {
                title: 'do dishes',
                descripcion: 'after winishing my dinner',
                duedate: '20/12/23',
                priority: 'medium',

            },
        ]
    
    }]

   
    

//constructor of every added todo
class Todoitem {
    constructor(title, descripcion, date, priority) {
        this.title = title
        this.descripcion = descripcion
        this.date = date 
        this.priority = priority
    }
}
    
console.log(mainarray)
displayhome()

function displayhome() {
    mainarray.forEach(element => {
        let div = document.createElement('div')
        div.textContent = element.maintitle
        displayprojects.appendChild(div)

        addoption(div.textContent)
        div.addEventListener('click', displaytodosfunction)

    })
    
}

function displaytodosfunction(e) {
    displaytodos.innerHTML = ''
    //set the table head for the todos
    let head = document.createElement('div')
    let firstdiv = document.createElement('div')
    firstdiv.textContent = 'check'
    head.appendChild(firstdiv)
    for (let prop in mainarray[0].todos[0]) {
        let newdiv = document.createElement('div')
        newdiv.textContent = prop
        head.appendChild(newdiv)
    }
    let lastdiv = document.createElement('div')
    lastdiv.textContent = 'delete'
    head.appendChild(lastdiv)
    head.classList.add('todoshead')
    displaytodos.appendChild(head)

    //
    let stringtitle = e.target.textContent
    let index
    mainarray.forEach((obj, i) => {
        if(obj.maintitle == stringtitle) index = i
    })
    let arrayoftodos = mainarray[index].todos
    for (let obj of arrayoftodos){
        let maindiv = document.createElement('div')
        let check = document.createElement('input')
        check.setAttribute('type', 'checkbox')
        check.addEventListener('click', ()=> {
            maindiv.classList.add('checked')
        })
        maindiv.appendChild(check)
        for (let prop in obj){
            if(prop == 'title') maindiv.setAttribute('id', `${obj[prop]}`)
            let div = document.createElement('div')
            div.textContent = obj[prop]
            maindiv.append(div)

        }
        let deletebtn = document.createElement('button')
        deletebtn.textContent = 'x'
        deletebtn.addEventListener('click', () => {
            maindiv.remove()
            let idmaindiv = maindiv.getAttribute('id')
            mainarray[index].todos.forEach((obj, indexx) => {
                if(obj.title == idmaindiv) {
                    
                    mainarray[index].todos.splice(indexx, 1)
                    console.table(mainarray)

                }
                
                
            })
            

        })
        let deletebtndiv = document.createElement('div')
        deletebtndiv.appendChild(deletebtn)
        maindiv.appendChild(deletebtndiv)
        maindiv.classList.add('todo')
        displaytodos.appendChild(maindiv)
    }  
    
}

function addprojectfunction(){
    let obj = {}
    obj.maintitle = newproject.value
    obj.todos = []
    mainarray.push(obj)
    console.table(mainarray)
    let maindiv = document.createElement('div')
    let divtitle = document.createElement('div')
    let erasebtn = document.createElement('button')
    divtitle.textContent = newproject.value
    erasebtn.textContent = 'delete'
    erasebtn.setAttribute('id', newproject.value)
    divtitle.addEventListener('click', displaytodosfunction)
    erasebtn.addEventListener('click', (e)=>{
        
        maindiv.remove()
        let index
        let id = e.target.getAttribute('id')
        mainarray.forEach((obj, i) => {
        if(obj.maintitle == id) index = i
        })
        mainarray.splice(index, 1)
        updateLocalStorage()
    })
    maindiv.appendChild(divtitle)
    maindiv.appendChild(erasebtn)
    maindiv.classList.add('project')
    displayprojects.appendChild(maindiv)

    addoption(newproject.value)
   
    dialogproject.close()
}


function addoption(title) {
    let option = document.createElement('option')
        option.value = title
        option.textContent= title
        selectform.appendChild(option)

}

//btn that add a new project
addprojectbtn.addEventListener('click', ()=>{
    dialogproject.showModal()
    })

    //btn that submit a new project
submitproject.addEventListener('click', addprojectfunction)

//btn that add a new todo
addbtn.addEventListener('click', ()=> {
    dialogtodo.showModal()
})

//btn that submit a new todo
subbtn.addEventListener('click', () => {
    let obj = new Todoitem(title.value, description.value, date.value, priority.value)
    
    mainarray.forEach((element) => {
        if(element.maintitle == selectform.value) element.todos.push(obj)
    })
    
    dialogtodo.close()

})



//next thing to do: integrate the checks, store data in t he back, css

