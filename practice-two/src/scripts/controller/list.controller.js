class ListController {
  constructor(listModel, listView) {
      this.listModel = listModel;
      this.listView = listView;

      this.listView.setTaskAddedHandler(this.handleTaskAdded);
      this.listView.setTaskRemovedHandler(this.handleTaskRemoved);

      this.init();
  }

  init = () => {
      this.listView.renderTasks(this.listModel.tasks);
  };

  handleTaskAdded = (task) => {
      this.listModel.addTask(task);
      this.listView.renderTasks(this.listModel.tasks);
  }

  handleTaskRemoved = (taskIndex) => {
    this.listModel.removeTaskByIndex(taskIndex);
    this.listView.renderTasks(this.listModel.tasks);
  }
  
}

export default ListController;
