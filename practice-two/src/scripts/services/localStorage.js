const storage = {
    getTasks: () => {
        try {
            const tasksJSON = localStorage.getItem('tasks');
            return tasksJSON ? JSON.parse(tasksJSON) : [];
        } catch (error) {
            console.error('Error while getting tasks:', error);
            return [];
        }
    },

    saveTasks: (tasks) => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Error while saving tasks:', error);
        }
    }
};

export default storage;
