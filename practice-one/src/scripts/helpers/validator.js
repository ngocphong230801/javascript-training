export const validateForm = (formElement) => {
    let isValid = true;
    const formInputs = formElement.querySelectorAll(".form-input");
    
    formInputs.forEach((input) => {
        const errorElement = input.nextElementSibling;
        const fieldName = input.getAttribute("name");
        const inputValue = input.value.trim();

        if (inputValue === "") {
            errorElement.textContent = `Please enter your ${fieldName}`;
            errorElement.style.display = "block";
            isValid = false;
        } else if (fieldName === "date") {
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
            errorElement.textContent = "";
            errorElement.style.display = "none";
        }
    });

    return isValid;
};
