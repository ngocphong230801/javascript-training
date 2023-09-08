class ListController {
  constructor(listModel, listView) {
      this.listModel = listModel;
      this.listView = listView;

      this.listView.setTaskAddedHandler(this.handleTaskAdded);

      this.init();
  }

  init = () => {
    this.listView.renderTasks(this.listModel.tasks);
  };

  handleTaskAdded = (task) => {
      this.listModel.addTask(task);
      this.listView.renderTasks(this.listModel.tasks);
  }
}

export default ListController;
