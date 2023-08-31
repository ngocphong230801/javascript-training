const storage = {
    getTasks: () => {
        const tasksJSON = localStorage.getItem('tasks');
        return tasksJSON ? JSON.parse(tasksJSON) : [];
    },

    saveTasks: (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
};

export default storage;
