import storage from "../services/localStorage";

class ListModel {
    constructor() {
        this.init();
        this.notificationVisible = false;
        this.notificationMessage = "";
    }

    init = () => {
        this.tasks = storage.getTasks();
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


}

export default ListModel;
