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

export const isValidDate = (dateString) => {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!pattern.test(dateString)) {
        return false;
    }
    const date = new Date(dateString);
    const isValidDate = !isNaN(date.getTime());
    return isValidDate;

};
