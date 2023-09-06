import { keys } from "../constants";
import { getElementById, querySelector } from "../helpers/dom-elements";
import { toggleDisplay } from "../helpers/display-elements";

class ListView {
    constructor() {
        this.taskList = querySelector(".list-task");
        this.taskInput = getElementById("task-input");
        this.confirmDialog = getElementById('confirm-dialog');
        this.confirmYesBtn = getElementById('confirm-yes');
        this.confirmCancelBtn = getElementById('confirm-cancel');
        this.overlay = getElementById("overlay")
        this.init();
    }

    init = () => {
        this.taskInput.addEventListener("keyup", this.handleTaskInput);
        this.taskList.addEventListener('click', this.handleDeleteTask);
        this.confirmYesBtn.addEventListener('click', this.handleConfirmDelete);
        this.confirmCancelBtn.addEventListener('click', this.handleCancelDelete);
        this.taskList.addEventListener('dblclick', this.handleContentDataDoubleClick);
    }

    renderTasks = (tasks) => {
        this.taskList.innerHTML = tasks.map((task, index) => 
        `<li data-index="${index}" class="content-data">
            <i class="fa-regular fa-circle fa-xs"></i>
            <p class="task-content">${task.content}</p>
            <i class="fa-solid fa-xmark close-task"></i>
        </li>`).join("");

        if (tasks.length === 0) {
            querySelector('.content-action').style.display = 'none';
        } else {
            querySelector('.content-action').style.display = 'flex';
        }
    }

    handleTaskInput = (event) => {
        if (event.key === keys.Enter) {
            const newTask = event.target.value.trim();
            if (newTask !== "") {
                event.target.value = "";
                this.onTaskAdded(newTask);
            }     
        }
    }

    handleDeleteTask = (event) => {
        const clickedElement = event.target;

        if (clickedElement.classList.contains('close-task')) {
            const taskIndex = clickedElement.parentElement.dataset.index;

            toggleDisplay('overlay', true);
            this.showConfirmDialog(taskIndex);
        }
    }

    showConfirmDialog = (taskIndex) => {
        this.taskIndexToDelete = taskIndex;
        toggleDisplay('confirm-dialog', true); 
    }

    handleCancelDelete = () => {
        toggleDisplay('overlay', false);
        toggleDisplay('confirm-dialog', false);
        delete this.taskIndexToDelete;
    }

    handleConfirmDelete = () => {
        if (this.taskIndexToDelete !== undefined) {
            this.onTaskRemoved(this.taskIndexToDelete);
            toggleDisplay('overlay', false);
            toggleDisplay('confirm-dialog', false);
            delete this.taskIndexToDelete;
        }
    }

    handleContentDataDoubleClick = (event) => {
        const clickedElement = event.target;
    
        if (clickedElement.classList.contains('content-data')) {
            if (!clickedElement.querySelector('input')) {
                const taskContentElement = clickedElement.querySelector('.task-content');
                const taskContent = taskContentElement.textContent;
    
                this.showEditInput(taskContent, taskContentElement);
            }
        }
    }
    
    showEditInput = (initialValue, taskContentElement) => {
        const inputElement = createElement('input');
        inputElement.type = 'text';
        inputElement.value = initialValue;
    
        inputElement.classList.add('input-edit');
        if (taskContentElement) {
            taskContentElement.textContent = '';
            taskContentElement.appendChild(inputElement);
    
            inputElement.addEventListener('blur', () => {
                this.closeEditInput(inputElement);
            });
    
            inputElement.addEventListener('keyup', (event) => {
                if (event.key === keys.Enter) {
                    const editedTask = event.target.value;
                    this.onTaskEdited(this.taskIndexToEdit, editedTask);
                    this.closeEditInput(inputElement);
                }
            });
    
            inputElement.focus();
    
            const taskIndex = taskContentElement.parentElement.dataset.index;
            this.taskIndexToEdit = taskIndex;
        }
    }
    
    
    closeEditInput = (inputElement) => {
        if (inputElement) {
            const parentElement = inputElement.parentElement;
            if (parentElement) {
                parentElement.textContent = inputElement.value;
            }
        }
    }
    
    setTaskAddedHandler = (callback) => {
        this.onTaskAdded = callback;
    }

    setTaskRemovedHandler = (callback) => {
        this.onTaskRemoved = callback;
    }

    setTaskEditedHandler = (callback) => {
        this.onTaskEdited = callback;
    }
}

export default ListView;
