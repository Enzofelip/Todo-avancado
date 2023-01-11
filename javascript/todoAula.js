const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const calcelEditbtn = document.querySelector("#cancel-edit-btn");
let especialInput;
const surchInput = document.querySelector("#search-input");

const botaourch = document.querySelector("#erase-button");

const filterBtn = document.querySelector("#filter-select");


// Funções
const inserindoTodo = (text, done = 0, save = 1) =>{
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const tituloValor = document.createElement("h3");
    tituloValor.innerText = text;
    todo.appendChild(tituloValor);

    const buttons = document.createElement("button");
    buttons.classList.add("finish-todo");
    buttons.innerHTML = `<i class=" fa-solid fa-check"></i> `;
    todo.appendChild(buttons);
    
    const editButtons = document.createElement("button");
    editButtons.classList.add("edit-todo");
    editButtons.innerHTML = `<i class=" fa-solid fa-pen"></i> `;
    todo.appendChild(editButtons);

    const deleteButtons = document.createElement("button");
    deleteButtons.classList.add("remove-todo");
    deleteButtons.innerHTML = `<i class=" fa-solid fa-xmark"></i> `;
    todo.appendChild(deleteButtons);

     //funçôes localStorage

    if(done){
        todo.classList.add("done");
    }

    if(save){
        savelocalStorage({text, done})
    }

    todoList.appendChild(todo);

    todoInput.value = '';
    todoInput.focus();
}

const toggleForms = () => {

   todoForm.classList.toggle("hide");
   editForm.classList.toggle("hide");
   todoList.classList.toggle("hide");

}

const updateTodo = (text) => {

    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === especialInput){


            todoTitle.innerText = text;

            updateTodosLOcalstorage(especialInput, text);

        }

    })

}


const atualiZando = (text) => {

    const todos = document.querySelectorAll(".todo");


    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3").innerText.toLocaleLowerCase();


        const normalizedSurch =  text.toLocaleLowerCase();

        todo.style.display = "flex";
        
        if(!todoTitle.includes(normalizedSurch)){

            todo.style.display = "none";

        }

    })

}


const transforTodo = (text) => {

    const todos = document.querySelectorAll(".todo");

    switch(text){
        case "all":
            todos.forEach((todo) => (todo.style.display = "flex"));
            break;
        
        case "done":
            todos.forEach((todo) => 
                todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")        
            )
            break;

        case "todo":
            todos.forEach((todo) =>
                !todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")            
            )
            break;
       
    }


}
// Eventos
todoForm.addEventListener("submit", (e) => {

    e.preventDefault();


    const inputValor = todoInput.value;

    if(inputValor){
        inserindoTodo(inputValor);
    }

})

document.addEventListener('click', (e) => {

    const targetele = e.target;
    const parentProximo = targetele.closest("div");
    let title;

    if(parentProximo && parentProximo.querySelector("h3")){

        title = parentProximo.querySelector("h3").innerText;

    }

    if(targetele.classList.contains("finish-todo")){
        
        parentProximo.classList.toggle("done");
        
        uptdateTodosstatusLocalstorage(title);
    }

    if(targetele.classList.contains("edit-todo")){ 

        toggleForms();

        editInput.value = title;
        especialInput = title;

      
   
    }

    if(targetele.classList.contains("remove-todo")){

        parentProximo.remove();

        removendoTodoLocalstorage(title);

    }


})

calcelEditbtn.addEventListener("click", (e) => {

    e.preventDefault();

    toggleForms();

})

editForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const valorinputEdit = editInput.value;

    if(valorinputEdit){

        updateTodo(valorinputEdit);

    }

    toggleForms();
})

surchInput.addEventListener("keyup", (e) => {

    const surchValor = e.target.value;

    atualiZando(surchValor);

})

botaourch.addEventListener("click", (e) => {

    e.preventDefault();

    surchInput.value = '';

    surchInput.dispatchEvent(new Event("keyup"));

})

filterBtn.addEventListener("change", (e) => {

    const filterValor = e.target.value;

    transforTodo(filterValor);
})

//Localstorage
const getlocalStorage = () =>{

    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    return todos;

}

const loadTodos = () => {
    const todos = getlocalStorage();

    todos.forEach((todo) => {
        inserindoTodo(todo.text, todo.done, 0);
    });

}

const savelocalStorage = (todo) => {

    const todos = getlocalStorage();

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos))

}


const removendoTodoLocalstorage = (todoText) => {

    const todos = getlocalStorage();

    const filterTodos = todos.filter((todo) => todo.text !== todoText)

    localStorage.setItem("todos", JSON.stringify(filterTodos));

}

uptdateTodosstatusLocalstorage = (todoText) => {

    const todos = getlocalStorage();

    todos.map((todo) => 
        todo.text === todoText ? (todo.done = !todo.done) : null
    );

    localStorage.setItem("todos", JSON.stringify(todos));
}

updateTodosLOcalstorage = (todoOldtext, todoNewText) => {
    const todos = getlocalStorage();

    todos.map((todo) => 
        todo.text === todoOldtext ? (todo.text = todoNewText) : null
    );

    localStorage.setItem("todos", JSON.stringify(todos));
    
}
loadTodos();