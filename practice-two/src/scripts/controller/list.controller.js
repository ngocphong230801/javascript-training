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
      this.listView.renderTasks(this.listModel.tasks);
  };

  handleClearAllCompleted = () => {
    this.listModel.clearCompleted();
    this.listView.renderTasks(this.listModel.tasks);
  }

  handleFilterTask = (actionFilter)  =>{
    this.listModel.filterTask(actionFilter,this.listView.renderTasks)
  } 

  handleCheckAllToggleTask = () => {
    this.listModel.checkAllToggleTask();
    this.listView.renderTasks(this.listModel.tasks);
  }

  handleToggleCompleted = (id, type) => {
    this.listModel.toggleTask(id, type)
    this.listView.renderTasks(this.listModel.tasks);
  }

  handleTaskAdded = (task) => {
      this.listModel.addTask(task);
      this.listView.renderTasks(this.listModel.tasks);
  }

  handleTaskRemoved = (taskIndex) => {
    this.listModel.removeTaskByIndex(taskIndex);
    this.listView.renderTasks(this.listModel.tasks);
  }
  
  handleTaskEdited = (taskIndex, editedTask) => {
    this.listModel.editTask(taskIndex, editedTask);
    this.listView.renderTasks(this.listModel.tasks);
  }
}

export default ListController;
