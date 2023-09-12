document.addEventListener("DOMContentLoaded", function () {
    const taskFilterItems = document.querySelectorAll(".task-filter-item");
    const notificationDialog = document.getElementById("notification-dialog");
  
    taskFilterItems.forEach((item) => {
      item.addEventListener("click", function (event) {
        event.preventDefault();
  
        const selectedAction = item.querySelector("a").getAttribute("data-action");
        const notificationContent = document.querySelector(".notification-content");
        switch (selectedAction) {
          case "all":
            notificationContent.textContent = "Your action has been executed! The All tasks are showing.";
            break;
          case "active":
            notificationContent.textContent = "Your action has been executed! The Active tasks are showing.";
            break;
          case "completed":
            notificationContent.textContent = "Your action has been executed! The Completed tasks are showing.";
            break;
          default:
            notificationContent.textContent = "Your action has been executed!";
        }
  
        notificationDialog.style.display = "block";
  
        setTimeout(function () {
          notificationDialog.style.display = "none";
        }, 2000);
      });
    });
  });
  