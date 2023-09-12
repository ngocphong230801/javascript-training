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
  };

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
    this.listView.renderTasks(this.listModel.tasks, this.listModel.tasks);
    if (this.listModel.notificationVisible) {
      this.hideNotification();
    } else {
      this.showNotification("Your action has been executed! All of the tasks are checked as completed.");
    }
  }

  handleToggleCompleted = (id, type) => {
    this.listModel.toggleTask(id, type);
    this.listView.renderTasks(this.listModel.tasks, this.listModel.tasks);
  }

  handleTaskAdded = (task) => {
    this.listModel.addTask(task);
    this.listView.renderTasks(this.listModel.tasks, this.listModel.tasks);
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
