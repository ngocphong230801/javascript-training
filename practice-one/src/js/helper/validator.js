export const validateForm = (formElement) => {
    let isValid = true;
    const formInputs = formElement.querySelectorAll(".form-input");
    formInputs.forEach((input) => {
        const errorElement = input.nextElementSibling;
        if (input.value.trim() === "") {
            const fieldName = input.getAttribute("name");
            errorElement.textContent = `Please enter your ${fieldName}`;
            errorElement.style.display = "block";
            isValid = false;
        } else {
            errorElement.textContent = "";
            errorElement.style.display = "none";
        }
    });
    return isValid;
};