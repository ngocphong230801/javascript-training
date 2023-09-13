import { keys } from "../constants";
import { getElementById, querySelector, querySelectorAll } from "../helpers/dom-elements";
import { toggleDisplay } from "../helpers/display-elements";

class ListView {
    constructor() {
        this.taskList = querySelector(".list-task");
        this.taskInput = getElementById("task-input");
        this.confirmDialog = getElementById('confirm-dialog');
        this.confirmYesBtn = getElementById('confirm-yes');
        this.confirmCancelBtn = getElementById('confirm-cancel');
        this.overlay = getElementById("overlay");
        this.filter = querySelectorAll('.task-filter-item > a');
        this.totalItem = querySelector('.total-item')
        this.checkAllToggleItems = querySelector('.check-all')
        this.clearAllComplete = querySelector('.clear-completed');
        this.loadingElement = querySelector(".app__loading");
        this.notificationDialog = getElementById('notification-dialog');
        this.notificationContent = querySelector('.notification-content');
        this.closeNotificationBtn = getElementById('close-notification');
        this.taskStatusMap = new Map()
        window.addEventListener("load", async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            this.loadingElement.style.display = "none";
        });

        this.filter.forEach((elementFilter) => {
            elementFilter.addEventListener('click', () => this.handleFilerTask(elementFilter));
        });
        this.init();
    }

    init = () => {
        this.taskInput.addEventListener("keyup", this.handleTaskInput);
        this.taskList.addEventListener('click', this.handleDeleteTask);
        this.confirmYesBtn.addEventListener('click', this.handleConfirmDelete);
        this.confirmCancelBtn.addEventListener('click', this.handleCancelDelete);
        this.taskList.addEventListener('dblclick', this.handleContentDataDoubleClick);
        this.taskList.addEventListener('click', this.handleContentDataClick);
        this.checkAllToggleItems.addEventListener('click', this.handleToggleAllItems);
        this.clearAllComplete.addEventListener('click', this.handleClearAllComplete);
        this.closeNotificationBtn.addEventListener('click', this.handleCloseNotification);
        this.filter.forEach((elementFilter) => {
            elementFilter.addEventListener('click', () => this.handleFilerTask(elementFilter));
        })

    }

    renderTasks = (tasks, allTask) => {
        const countNoChecked = allTask.filter(i => !i.isCompleted).length;
        this.totalItem.innerHTML = `${countNoChecked} item left`
        
        this.taskList.innerHTML = tasks.map((task, index) => 
        `<li data-index="${index}" data-id="${task.id}" data-checked="${task.isCompleted ? "true": "false"}" class="content-data">
            <i class="fa-regular fa-circle fa-sm task-icon ${task.isCompleted ? " clicked" : ""}" ></i>
            <p class="task-content" style="${task.isCompleted ? "text-decoration: line-through;" : "text-decoration: none;"}">${task.content}</p>
            <i class="fa-solid fa-check checkmark fa-2xs" style="${task.isCompleted ? "display: inline-block;" : "display: none;"}"></i>
            <p class="task-timestamp">Update at: ${task.updatedAt} - Create at: ${task.createdAt}</p>
            <i class="fa-solid fa-xmark close-task"></i>
         </li>`).join("");
    
        if (allTask.length === 0) {
            querySelector('.content-action').style.display = 'none';
        } else {
            querySelector('.content-action').style.display = 'flex';
        }
        const hasCompletedTasks = allTask.some(task => task.isCompleted);
        
        if (hasCompletedTasks) {
            querySelector('.clear-completed').style.display = 'block';
        } else {
            querySelector('.clear-completed').style.display = 'none';
        }

        if (this.notificationVisible) {
            this.showNotification(this.notificationMessage);
        }

    }

    showNotification = (message) => {
        this.notificationContent.textContent = message;
        toggleDisplay('notification-dialog', true);

        setTimeout(() => {
            this.hideNotification();
        }, 3000); 
    }

    hideNotification = () => {
        toggleDisplay('notification-dialog', false);
    }

    handleCloseNotification = () => {
        this.hideNotification();
    }


    handleToggleAllItems = () => {
        this.onSetCheckAllToggleTask()
    }

    handleClearAllComplete  = (e) => {
        e.preventDefault();
        this.onClearAllComplete()
    }

    handleFilerTask(elementFilter) {
        const dataFilter = elementFilter.getAttribute('data-action');
        this.onTaskFilter(dataFilter);
        this.showFilterNotification(dataFilter);
        this.filter.forEach((element) => {
            element.classList.remove('active-btn')
        });
        elementFilter.classList.add('active-btn');
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
        const inputElement = document.createElement('input');
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

    handleContentDataClick = (event) => {
        const clickedElement = event.target;

        if (clickedElement.classList.contains('task-icon')) {
            const taskDataId = clickedElement.parentElement.dataset.id;
            const currentStatus = clickedElement.parentElement.dataset.checked;

            if (taskDataId && currentStatus) {
                const newStatus = currentStatus === 'true' ? 'unactive' : 'active';

                clickedElement.classList.toggle('clicked');
                const checkmark = clickedElement.parentElement.querySelector('.checkmark');
                const taskContentElement = clickedElement.parentElement.querySelector('.task-content');

               
                console.log(currentStatus == 'active')
                if (checkmark && taskContentElement) {
                    if (newStatus === 'active') {
                        taskContentElement.style.textDecoration = 'line-through';
                        checkmark.style.display = 'inline-block';
                        this.onToggleCompleted(taskDataId, 'active');
                        this.showNotification("Your action has been executed! A task was checked done successfully.");
                    } else {
                        taskContentElement.style.textDecoration = 'none';
                        checkmark.style.display = 'none';
                        this.onToggleCompleted(taskDataId, 'unactive');
                        this.showNotification("Your action has been executed! A task was unchecked done successfully.");
                    }
                }
            }
        }
    }

    showFilterNotification = (filterType) => {
        let message = "";
        switch (filterType) {
            case 'all':
                message = "all tasks.";
                this.notificationDialog.classList.add('action-mode');
                break;
            case 'active':
                message = "active tasks.";
                this.notificationDialog.classList.add('action-mode');
                break;
            case 'completed':
                message = "completed tasks.";
                this.notificationDialog.classList.add('action-mode');
                break;
            default:
                message = " all tasks.";
                this.notificationDialog.classList.add('action-mode');
                break;
        }
        this.showNotification(`Your action has been executed! The ${message}are showing.`);
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

    setToggleCompleted = (callback) => {
        this.onToggleCompleted = callback;
    }

    setTaskFilter = (callback) => {
        this.onTaskFilter = callback;
    }

    setCheckAllToggleTask = (callback) => {
        this.onSetCheckAllToggleTask = callback;
    }

    setClearAllCompleted = (callback) => { 
        this.onClearAllComplete = callback;
    }
}

export default ListView;
