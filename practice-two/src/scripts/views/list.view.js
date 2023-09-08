import { keys } from "../constants";
import { getElementById,querySelector } from "../helpers/dom-elements";

class ListView {
    constructor() {
        this.taskList = querySelector(".list-task");
        this.taskInput = getElementById("task-input");
        this.init();
    }

    init = () => {
        this.taskInput.addEventListener("keyup", this.handleTaskInput);
    }

    renderTasks = (tasks) => {
        this.taskList.innerHTML = tasks.map(task => 
        `<li data-id="${task.id}" class="content-data">
            <i class="fa-regular fa-circle fa-xs"></i>
            <p class="task-content">${task.content}</p>
            <i class="fa-solid fa-xmark close-task"></i>    
        </li>`).join("");
    }

    handleTaskInput = (event) => {
        if (event.key === keys.Enter) {
            const newTask = event.target.value;
            event.target.value = "";
            this.onTaskAdded(newTask);
        }
    }

    setTaskAddedHandler = (callback) => {
        this.onTaskAdded = callback;
    }
}

export default ListView;
