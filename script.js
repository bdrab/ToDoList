const toDoContainer = document.querySelector(".list-container-tasks")
const addTaskBtn = document.querySelector(".addTaskBtn")
const addTaskText = document.querySelector(".addTaskText")
const tasks = document.querySelector(".task-1 p")
const tasksSelect = document.querySelector("#tasks")

class Task{
    constructor(taskID, taskText, taskState="todo"){
        this.taskID = taskID
        this.taskText = taskText
        this.taskstate = taskState
    }
}


class App{
    tasksArray = []
    constructor(){
        addTaskBtn.addEventListener('click', this.addNewTask.bind(this))
        document.addEventListener('keypress', this.useEnter.bind(this))
        tasksSelect.addEventListener('change', this.displayNewOrder)
        toDoContainer.addEventListener('click', this.manageTask.bind(this))
        this.openTaskLocalStorage()
        console.log(this.tasksArray)
    }

    manageTask(event){
        if(event.target.tagName !== "BUTTON") return
        event.target.classList[0] === "toDoTaskButtonDone" && this.toDoTaskButtonDone(event.target)
        event.target.classList[0] === "toDoTaskButtonDelete" && this.toDoTaskButtonDelete(event.target.classList[1])
    }

    toDoTaskButtonDone(row){
        const element = document.querySelector(`.taskText .${row.classList[1]}`)
        element.classList.toggle("crossed-text")
        row.textContent === "Done" ? row.textContent = "Undone" : row.textContent = "Done"
    }

    toDoTaskButtonDelete(row){
        const element = document.querySelector(`.toDoTask.${row}`)
        element.remove()
    }

    displayNewOrder(event){
        console.log("do nothing");
    }

    useEnter(event){
        if(event.key !== "Enter") return
        this.addNewTask();
    }

    displayTask(task){
        toDoContainer.insertAdjacentHTML('afterbegin', 
        `<div class="toDoTask task-${task.taskID}">
            <div class="toDoTaskRow">
                <div class="taskBTNs">
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                    <button class="toDoTaskButtonDone task-${task.taskID}">Done</button>
                </div>
                <div class="taskText"> 
                    <div class="taskText task-${task.taskID}">${task.taskText}</div>
                </div>
                <div class="taskBTNs">
                    <button class="toDoTaskButtonDelete task-${task.taskID}">Delete</button>
                </div>
            </div>
            <hr>
            </div>`
        )
    }

    addNewTask(){
        const text = addTaskText.value;
        if(text === "") return
        const idTask = (new Date).getTime()
        const newTask = new Task(idTask, text)
        this.tasksArray.unshift(newTask) 
        this.displayTask(newTask)
        addTaskText.value = "";
        this.saveTaskToLocalStorage(this.tasksArray)
    }

    saveTaskToLocalStorage(tasks){
        console.log(tasks)
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    openTaskLocalStorage(){
        this.tasksArray = JSON.parse(localStorage.getItem('tasks')) || []
        if (!this.tasksArray) return 
        this.tasksArray.reverse().forEach(e => this.displayTask(e))
    }


}


const app = new App()
