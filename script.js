const toDoContainer = document.querySelector(".list-container-tasks")


const addTaskBtn = document.querySelector(".addTaskBtn")
const addTaskText = document.querySelector(".addTaskText")

const tasks = document.querySelector(".task-1 p")

let taskID = 2; 

const addNewTask = function(){
        const text = addTaskText.value;
        if(text === "") return 
        toDoContainer.insertAdjacentHTML('afterbegin', 
            `<div class="toDoTask task-${taskID}">
                <button class="toDoTaskButtonDone task-${taskID}">Done</button>
                <span class="task-${taskID}">${addTaskText.value}</span>
                <button class="toDoTaskButtonDelete task-${taskID}">Delete</button>
                <hr>
                </div>`
        )
        addTaskText.value = "";
        taskID ++;
    }

addTaskBtn.addEventListener('click', addNewTask)

document.addEventListener('keypress', function(event){
    if(event.key !== "Enter") return
    addNewTask();
})


const toDoTaskButtonDone = function(row){

    const element = document.querySelector(`span.${row.classList[1]}`)
    element.classList.toggle("crossed-text")
    row.textContent === "Done" ? row.textContent = "Undone" : row.textContent = "Done"
}


const toDoTaskButtonDelete = function(row){
    const element = document.querySelector(`.toDoTask.${row}`)
    element.remove()
}


toDoContainer.addEventListener('click', function(event){
    if(event.target.tagName !== "BUTTON") return
    event.target.classList[0] === "toDoTaskButtonDone" && toDoTaskButtonDone(event.target)
    event.target.classList[0] === "toDoTaskButtonDelete" && toDoTaskButtonDelete(event.target.classList[1])
})

