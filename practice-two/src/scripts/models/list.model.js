import storage from "../services/localStorage";

class ListModel {
    constructor() {
        this.init();
        this.notificationVisible = false;
        this.notificationMessage = "";
    }

    init = () => {
        this.tasks = storage.getTasks();
        this.lastTaskId =
            this.tasks.length > 0
                ? Math.max(...this.tasks.map((task) => task.id)) + 1
                : 0;
    };

    addTask = (task) => {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const formattedHours = (hours % 24) || 24;
    
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        const formattedTime = `${formattedHours}:${minutes}:${seconds.toString().padStart(2, '0')}, ${currentTime.toLocaleDateString(
            "en-US",
            { year: "numeric", month: "short", day: "numeric" }
        )}`;
        
        const newTask = {
            id: this.lastTaskId++,
            content: task,
            createdAt: formattedTime,
            updatedAt: formattedTime,
            isCompleted: false,
        };
        this.tasks.unshift(newTask);
        storage.saveTasks(this.tasks);
    };

    
    checkAllToggleTask() {
        const checkTaskNotCompleted = this.tasks.find((t) => !t.isCompleted);

        if (checkTaskNotCompleted) {
            this.tasks.forEach((task) => (task.isCompleted = true));
        } else {
            this.tasks.forEach((task) => (task.isCompleted = false));
        }
        storage.saveTasks(this.tasks);
    }

    clearCompleted = () => {
        this.tasks = this.tasks.filter((task) => !task.isCompleted);
        storage.saveTasks(this.tasks);
    };
    filterTask = (actionFilter, renderTasks) => {
        let taskFilters = null;

        switch (actionFilter) {
            case "all": {
                taskFilters = this.tasks;
                break;
            }

            case "active": {
                taskFilters = this.tasks.filter((task) => !task.isCompleted);
                break;
            }

            case "completed": {
                taskFilters = this.tasks.filter((task) => task.isCompleted);
                break;
            }

            default: {
                taskFilters = this.tasks;
                break;
            }
        }
        renderTasks(taskFilters, this.tasks);
    };

    toggleTask = (id, type, renderTasks) => {
        if (type === "active") {
            this.tasks.forEach((task) => {
                if (task.id == id) {
                    task.isCompleted = true;
                }
            });
        } else {
            this.tasks.forEach((task) => {
                if (task.id == id) {
                    task.isCompleted = false;
                }
            });
        }

        if (window.location.hash === "#completed") {
            this.filterTask("completed", renderTasks);
        } else if (window.location.hash === "#active") {
            this.filterTask("active", renderTasks);
        } else {
            renderTasks(this.tasks, this.tasks);
        }
        storage.saveTasks(this.tasks);
    };

    removeTaskByIndex = (taskIndex) => {
        this.tasks.splice(taskIndex, 1);
        storage.saveTasks(this.tasks);
    };
    editTask = (taskIndex, editedTask) => {
        if (taskIndex >= 0 && taskIndex < this.tasks.length) {
            const currentTime = new Date();
            const hours = currentTime.getHours();
            const formattedHours = (hours % 24) || 24;
            const minutes = currentTime.getMinutes();
            const seconds = currentTime.getSeconds();
    
            const formattedTime = `${formattedHours}:${minutes}:${seconds.toString().padStart(2, '0')}, ${currentTime.toLocaleDateString(
                "en-US",
                { year: "numeric", month: "short", day: "numeric" }
            )}`;
            
            this.tasks[taskIndex].content = editedTask;
            this.tasks[taskIndex].updatedAt = formattedTime;
            storage.saveTasks(this.tasks);
        }
    };
}

export default ListModel;
