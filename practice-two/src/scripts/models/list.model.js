import storage from "../services/localStorage";

class ListModel {
    constructor() {
        this.init();
    }

    init = () => {
        this.tasks = storage.getTasks();
        this.lastTaskId = this.tasks.length > 0 ? Math.max(...this.tasks.map(task => task.id)) + 1 : 0;
    }

    addTask = (task) => {
        const newTask = { id: this.lastTaskId++, content: task };
        this.tasks.unshift(newTask);
        storage.saveTasks(this.tasks);
    }

    removeTaskByIndex = (taskIndex) => {
        this.tasks.splice(taskIndex, 1);
        storage.saveTasks(this.tasks);
    }

    editTask = (taskIndex, editedTask) => {
        if (taskIndex >= 0 && taskIndex < this.tasks.length) {
            this.tasks[taskIndex].content = editedTask;
            storage.saveTasks(this.tasks);
        }
    }
    
}

export default ListModel;
