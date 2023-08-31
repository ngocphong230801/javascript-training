import storage from "../services/localStorage";

class ListModel {
    constructor() {
        this.init();
    }

    init = () => {
        this.tasks = storage.getTasks();
        this.lastTaskId = 0;
    }

    addTask = (task) => {
        const newTask = { id: this.lastTaskId++, content: task };
        this.tasks.unshift(newTask);
        storage.saveTasks(this.tasks);
    }
}

export default ListModel;
