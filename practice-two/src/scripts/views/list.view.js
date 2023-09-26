import { keys } from "../constants";
import { toggleDisplay } from "../helpers/display-elements";

class ListView {
    constructor() {
        this.taskList = querySelector(".list-task");
        this.taskInput = getElementById("task-input");

        this.init();
    }

    init = () => {
        this.taskInput.addEventListener("keyup", this.handleTaskInput);

    }
    
    handleTaskInput = (event) => {
        if (event.key === keys.Enter) {
            const newTask = event.target.value.trim();
            if (newTask !== "") {
                event.target.value = "";
                this.onTaskAdded(newTask);

        }
    };

    handleDeleteTask = (event) => {
        const clickedElement = event.target;

        if (clickedElement.classList.contains("close-task")) {
            const taskIndex = clickedElement.parentElement.dataset.index;

            toggleDisplay("overlay", true);
            this.showConfirmDialog(taskIndex);
        }
    };

    showConfirmDialog = (taskIndex) => {
        this.taskIndexToDelete = taskIndex;
        toggleDisplay("confirm-dialog", true);
    };

    handleCancelDelete = () => {
        toggleDisplay("overlay", false);
        toggleDisplay("confirm-dialog", false);
        delete this.taskIndexToDelete;
    };

    handleConfirmDelete = () => {
        if (this.taskIndexToDelete !== undefined) {
            this.onTaskRemoved(this.taskIndexToDelete);
            toggleDisplay("overlay", false);
            toggleDisplay("confirm-dialog", false);
            delete this.taskIndexToDelete;
        }
    };

    handleContentDataDoubleClick = (event) => {
        const clickedElement = event.target;

        if (clickedElement.classList.contains("content-data")) {
            if (!clickedElement.querySelector("input")) {
                const taskContentElement =
                    clickedElement.querySelector(".task-content");
                const taskContent = taskContentElement.textContent;
                this.showEditInput(taskContent, taskContentElement);
            }
        }
    };

    showEditInput = (initialValue, taskContentElement) => {
        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = initialValue;

        inputElement.classList.add("input-edit");
        if (taskContentElement) {
            taskContentElement.textContent = "";
            taskContentElement.appendChild(inputElement);

            inputElement.addEventListener("blur", () => {
                this.closeEditInput(inputElement);
            });

            inputElement.addEventListener("keyup", (event) => {
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
    };

    closeEditInput = (inputElement) => {
        if (inputElement) {
            const parentElement = inputElement.parentElement;
            if (parentElement) {
                parentElement.textContent = inputElement.value;
            }
        }
    };

    handleContentDataClick = (event) => {
        const clickedElement = event.target;

        if (clickedElement.classList.contains("task-icon")) {
            const taskDataId = clickedElement.parentElement.dataset.id;
            const currentStatus = clickedElement.parentElement.dataset.checked;

            if (taskDataId && currentStatus) {
                const newStatus =
                    currentStatus === "true" ? "unactive" : "active";

                clickedElement.classList.toggle("clicked");
                const checkmark =
                    clickedElement.parentElement.querySelector(".checkmark");
                const taskContentElement =
                    clickedElement.parentElement.querySelector(".task-content");

                console.log(currentStatus == "active");
                if (checkmark && taskContentElement) {
                    if (newStatus === "active") {
                        taskContentElement.style.textDecoration =
                            "line-through";
                        checkmark.style.display = "inline-block";
                        this.onToggleCompleted(taskDataId, "active");
                        this.showNotification(
                            "Your action has been executed! A task was checked done successfully."
                        );
                    } else {
                        taskContentElement.style.textDecoration = "none";
                        checkmark.style.display = "none";
                        this.onToggleCompleted(taskDataId, "unactive");
                        this.showNotification(
                            "Your action has been executed! A task was unchecked done successfully."
                        );
                    }
                }
            }
        }
    };

    showFilterNotification = (filterType) => {
        let message = "";
        switch (filterType) {
            case "all":
                message = "all tasks.";
                this.notificationDialog.classList.add("action-mode");
                break;
            case "active":
                message = "active tasks.";
                this.notificationDialog.classList.add("action-mode");
                break;
            case "completed":
                message = "completed tasks.";
                this.notificationDialog.classList.add("action-mode");
                break;
            default:
                message = " all tasks.";
                this.notificationDialog.classList.add("action-mode");
                break;
        }
        this.showNotification(
            `Your action has been executed! The ${message}are showing.`,
            "filter"
        );
    };

    setTaskAddedHandler = (callback) => {
        this.onTaskAdded = callback;

}

export default ListView;
