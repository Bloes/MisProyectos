const toDoItems = [];

let createdBy = document.querySelector("#createdBy");
createdBy.innerHTML  = "Aplicacion creada por: Brayan Lopez Espitia";

function ToDo(description){
    this.description = description;
    this.complete = false;
}

ToDo.prototype.completeToDO = function(){
    this.complete = true;
}

function buidToDo(todo,index){
    let toDoShell = document.createElement("div");
    toDoShell.className = "toDoShell";
    let toDoText = document.createElement("span");
    toDoText.innerHTML = todo.description;
    toDoText.id = index;

    if(todo.complete){
        toDoText.className = "completeText";
    }
    toDoShell.appendChild(toDoText);
    toDoShell.addEventListener("click", completeToDO)

    return toDoShell;
}

function buildToDos(toDos){
    let toDoArray = toDos.map(buidToDo);
    return toDoArray;
}

function displayToDos(){
    let toDoContainer = document.getElementById("toDoContainer");
    toDoContainer.innerHTML = "";
    let result = buildToDos(toDoItems);
    result.map(function(elemets){
        if(elemets.children[0].innerHTML === ""){
            return false;
        }
        else{
            toDoContainer.appendChild(elemets);
        }
    })

}

function addToDo(){
    let inputTodo = document.getElementById("toDoInput");
    let todo = new ToDo(inputTodo.value);
    toDoItems.push(todo);
    inputTodo.value = "";
    displayToDos();
}

let boton = document.getElementById("addButton");
boton.addEventListener("click", addToDo);

function completeToDO(event){
    const index = event.target.id;
    toDoItems[index].completeToDO();
    displayToDos();
}

displayToDos();