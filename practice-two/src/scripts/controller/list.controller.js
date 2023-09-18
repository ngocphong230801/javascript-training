import { querySelectorAll } from "../helpers/dom-elements";

class ListController {
  constructor(listModel, listView) {
    this.listModel = listModel;
    this.listView = listView;

    this.listView.setTaskAddedHandler(this.handleTaskAdded);
    this.listView.setTaskRemovedHandler(this.handleTaskRemoved);
    this.listView.setTaskEditedHandler(this.handleTaskEdited);
    this.listView.setTaskFilter(this.handleFilterTask);
    this.listView.setToggleCompleted(this.handleToggleCompleted);
    this.listView.setCheckAllToggleTask(this.handleCheckAllToggleTask);
    this.listView.setClearAllCompleted(this.handleClearAllCompleted);

    this.init();
  }

  init = () => {
    this.listView.renderTasks(this.listModel.tasks, this.listModel.tasks);

    this.handleReloadWindows();
  };

  handleReloadWindows = () => {
    const status = window.location.hash;
    let elements = querySelectorAll('.task-filter-item > a')

    elements.forEach(function(element) {
      element.classList.remove('active-btn')
    })

    const handleActiveElement = (elements, action) => {
      elements.forEach(function(element) {
        if(element.dataset.action === action) {
          element.classList.add('active-btn')
        }
      })
     } 
    
    switch(status) {
        case '#all' : {
            console.log(this)
            this.handleFilterTask('all');
            handleActiveElement(elements, 'all')
            break;
        }
        case '#active' : {
            this.handleFilterTask('active');
            handleActiveElement(elements, 'active')
            break;
        }
        case '#completed' : {
            this.handleFilterTask('completed');
            handleActiveElement(elements, 'completed')
            break;
        }
        default : {
            this.handleFilterTask('all');
            break;
        }
    }
    
}

  showNotification = (message) => {
    this.listModel.notificationVisible = true;
    this.listModel.notificationMessage = message;
    this.listView.showNotification(message);
  }

  hideNotification = () => {
    this.listModel.notificationVisible = false;
    this.listView.hideNotification();
  }

  handleClearAllCompleted = () => {
    this.listModel.clearCompleted();
    this.listView.renderTasks(this.listModel.tasks, this.listModel.tasks);
  }

  handleFilterTask = (actionFilter) => {
    this.listModel.filterTask(actionFilter, this.listView.renderTasks);
  }

  handleCheckAllToggleTask = () => {
    this.listModel.checkAllToggleTask();

    // Check the current filter status to determine which tasks to render
    const currentFilter = window.location.hash.substring(1); // Remove the '#' from the hash

    if (currentFilter === 'active') {
        const activeTasks = this.listModel.tasks.filter(task => !task.isCompleted);
        this.listView.renderTasks(activeTasks, this.listModel.tasks);
    } else if (currentFilter === 'completed') {
        const completedTasks = this.listModel.tasks.filter(task => task.isCompleted);
        this.listView.renderTasks(completedTasks, this.listModel.tasks);
    } else {
        this.listView.renderTasks(this.listModel.tasks, this.listModel.tasks);
    }

    if (this.listModel.notificationVisible) {
        this.hideNotification();
    } else {
        if (currentFilter === 'active') {
            this.showNotification("Your action has been executed! All completed tasks are checked.");
        } else {
            this.showNotification("Your action has been executed! All of the tasks are unchecked as completed.");
        }
    }
  }



  handleToggleCompleted = (id, type) => {
    this.listModel.toggleTask(id, type, this.listView.renderTasks);
  }

  handleTaskAdded = (task) => {
    this.listModel.addTask(task);
    const currentFilter = window.location.hash.substring(1);

    if (currentFilter === 'active') {
        const activeTasks = this.listModel.tasks.filter(task => !task.isCompleted);
        this.listView.renderTasks(activeTasks, this.listModel.tasks);
    } else if (currentFilter === 'completed') {
        const completedTasks = this.listModel.tasks.filter(task => task.isCompleted);
        this.listView.renderTasks(completedTasks, this.listModel.tasks);
    } else {
        this.listView.renderTasks(this.listModel.tasks, this.listModel.tasks);
    }
    this.showNotification("Your action has been executed! A task was added successfully.");
  }


  handleTaskEdited = (taskIndex, editedTask) => {
    this.listModel.editTask(taskIndex, editedTask);
    this.listView.renderTasks(this.listModel.tasks, this.listModel.tasks);
    this.showNotification("Your action has been executed! A task was updated successfully.");
  }

  handleHideNotification = () => {
    this.hideNotification();
  }

  handleTaskRemoved = (taskIndex) => {
    this.listModel.removeTaskByIndex(taskIndex);
    this.listView.renderTasks(this.listModel.tasks, this.listModel.tasks);
    this.showNotification("Your action has been executed! A task was deleted successfully.");
  }
}

export default ListController;
