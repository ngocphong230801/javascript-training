/**
 * Validate a form by checking its input fields for correctness.
 * @param {HTMLElement} formElement - The HTML form element to validate.
 * @returns {boolean} - True if the form is valid, otherwise false.
 */
export const validateForm = (formElement) => {
    // Flag to track overall form validity.
    let isValid = true;

    // Find all input fields within the form.
    const formInputs = formElement.querySelectorAll(".form-input");
    
    // Iterate over each input field for validation.
    formInputs.forEach((input) => {
        // Get the error element associated with the input.
        const errorElement = input.nextElementSibling;
        
        // Get the name, value, and trimmed value of the input.
        const fieldName = input.getAttribute("name");
        const inputValue = input.value.trim();

        // Validate based on input value.
        if (inputValue === "") {
            errorElement.textContent = `Please enter your ${fieldName}`;
            errorElement.style.display = "block";
            isValid = false;
        } else if (fieldName === "date") {
            // Validate date input using a regular expression pattern.
            const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
            if (!datePattern.test(inputValue)) {
                errorElement.textContent = "Please enter a valid date (dd/MM/yyyy)";
                errorElement.style.display = "block";
                isValid = false;
            } else {
                errorElement.textContent = "";
                errorElement.style.display = "none";
            }
        } else {
            // Reset error element for other input fields.
            errorElement.textContent = "";
            errorElement.style.display = "none";
        }
    });

    // Return the overall validity of the form.
    return isValid;
};
