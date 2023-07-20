class ValidationForm {
    constructor(){
        this.validationForm = document.querySelector(".validation-form");
        this.overlay = document.getElementById("overlay");

        document.getElementById("create").addEventListener("click", this.showValidationForm);
        document.getElementById("cancel").addEventListener("click", this.hideValidationForm);
        this.overlay.addEventListener("click", this.hideValidationForm.bind(this));
    };

    showValidationForm = () => {
       this.validationForm.style.display =  "block";
       this.overlay.style.display = "block";
    };
    
    hideValidationForm =() => {
       this.validationForm.style.display = "none";
       this.overlay.style.display = "none";
    };
}

const handleCreate = new ValidationForm();
