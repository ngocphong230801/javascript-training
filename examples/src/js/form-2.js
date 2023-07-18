// Function to validate the form
function validateForm(event) {
    event.preventDefault(); // Prevent form submission
  
    // Clear previous errors
    clearErrors();
  
    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
  
    // Validate name
    if (name === "") {
      displayError("name", "Name is required");
      return;
    }
  
    // Validate email
    if (email === "") {
      displayError("email", "Email is required");
      return;
    }
  
    if (!isValidEmail(email)) {
      displayError("email", "Invalid email format");
      return;
    }
  
    // Save form data to local storage
    saveFormData(name, email); 
  
    // Add form data to the table
    addToTable(name, email);
  
    // Clear the form
    document.getElementById("myForm").reset();
}
  
  // Function to display an error message
function displayError(field, message) {
    const errorElement = document.getElementById(`${field}Error`);
    errorElement.textContent = message;
}
  
  // Function to clear error messages
function clearErrors() {
    const errorElements = document.querySelectorAll(".error");
    errorElements.forEach(function (element) {
      element.textContent = "";
    });
}
  
  // Function to check if an email is valid
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
  

  // Function to save form data to local storage
function saveFormData(name, email) {
    const formData = {
      name: name,
      email: email,
    };
  
    let existingData = localStorage.getItem("formData");
    existingData = existingData ? JSON.parse(existingData) : [];
  
    existingData.push(formData);
    localStorage.setItem("formData", JSON.stringify(existingData));
}
  
  // Function to add form data to the table
function addToTable(name, email) {
    const tableBody = document.querySelector("#dataTable tbody");
  
    const row = document.createElement("tr");
  
    const nameCell = document.createElement("td");
    nameCell.textContent = name;
  
    const emailCell = document.createElement("td");
    emailCell.textContent = email;
  
    row.appendChild(nameCell);
    row.appendChild(emailCell);
  
    tableBody.appendChild(row);
}
  
  // Function to load data from local storage and populate the table
function loadDataFromStorage() {
    const existingData = localStorage.getItem("formData");
  
    if (existingData) {
      const formDataArray = JSON.parse(existingData);
  
      formDataArray.forEach(function (formData) {
        addToTable(formData.name, formData.email);
      });
    }
}
  
  // Event listener for form submission
document.getElementById("myForm").addEventListener("submit", validateForm);
  
  // Call the function to load data when the page is loaded
document.addEventListener("DOMContentLoaded", loadDataFromStorage);
