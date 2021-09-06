const maritalStatusFieldContainer = document.querySelector(".marital-status-container");
const formElementNode = document.querySelector("#employee-form");
const resetLink = document.querySelector(".reset-link");
let isFieldFocussed = false;

attachOnTextChangeHandlers();
maritalStatusFieldContainer.addEventListener("change", toggleSpouseNameFieldEditability);
formElementNode.addEventListener("submit", (e) => {
    e.preventDefault();
    isFieldFocussed = false;
    verifyFields();
});
resetLink.addEventListener("click", resetForm);

function attachOnTextChangeHandlers() {
    const textInputNodesList = document.querySelectorAll("input[type='text'], textarea");

    textInputNodesList.forEach((textInputNode) => {
        textInputNode.addEventListener("input", () => {
            toggleTextInputLabelStyle(textInputNode);
        })
    })
}

function toggleTextInputLabelStyle (inputNode) {
    const labelNode = document.querySelector(`label[for=${inputNode.id}]`);

    if (inputNode.value !== "") {
        labelNode.classList.add("value-filled");
    } else {
        labelNode.classList.remove("value-filled");
    }
}

function toggleSpouseNameFieldEditability(e) {
    const spouseNameField = document.querySelector("#spouse-name");
    const spouseNameFieldLabel = document.querySelector("label[for='spouse-name']");

    if (e.target.id === "status-married") {
        spouseNameField.disabled = false;
        spouseNameFieldLabel.classList.remove("disabled-field-label");
    } else {
        spouseNameField.value = "";
        spouseNameField.disabled = true;
        spouseNameFieldLabel.classList.add("disabled-field-label");
        spouseNameFieldLabel.classList.remove("value-filled");
    }
}

function verifyFields() {
    const firstNameFieldNode = document.querySelector("#first-name");
    const firstNameFieldError = document.querySelector("#first-name-error");
    const lastNameFieldNode = document.querySelector("#last-name");
    const lastNameFieldError = document.querySelector("#last-name-error");
    const tncCheckboxField = document.querySelector("#tnc-checkbox");
    const tncCheckboxFieldError = document.querySelector("#tnc-error");

    validateNameFields("First Name", firstNameFieldNode, firstNameFieldError);
    validateNameFields("Last Name", lastNameFieldNode, lastNameFieldError);
    validateGenderAndSpouseFields();

    if (!tncCheckboxField.checked) {
        tncCheckboxFieldError.innerHTML = "You must agree with the TnC"
        if (!isFieldFocussed) {
            tncCheckboxField.focus();
        }
        isFieldFocussed = true;
    } else {
        tncCheckboxFieldError.innerHTML = "";
    }
}

function validateGenderAndSpouseFields() {
    const genderMaleFieldNode = document.querySelector("#gender-male");
    const genderFemaleFieldNode = document.querySelector("#gender-female");
    const genderFieldError = document.querySelector("#gender-error");
    const isMarried = document.querySelector("#status-married").checked;
    const spouseNameFieldNode = document.querySelector("#spouse-name");
    const spouseNameFieldError = document.querySelector("#spouse-name-error");

    if (!genderMaleFieldNode.checked && !genderFemaleFieldNode.checked) {
        genderFieldError.innerHTML = "Gender is required";
        if (!isFieldFocussed) {
            genderMaleFieldNode.focus();
        }
        isFieldFocussed = true;
    } else {
        genderFieldError.innerHTML = "";
    }

    if (isMarried) {
        validateNameFields("Spouse Name", spouseNameFieldNode, spouseNameFieldError);
    } else {
        spouseNameFieldError.innerHTML = "";
    }
}

function validateNameFields(fieldName, fieldNode, errorNode) {
    if (fieldNode.value === "") {
        errorNode.innerHTML = `${fieldName} is required`;
        if (!isFieldFocussed) {
            fieldNode.focus();
        }
        isFieldFocussed = true;
    } else if (fieldNode.value !== fieldNode.value.trim()) {
        errorNode.innerHTML = `${fieldName} must not contain extra whitespaces`;
        if (!isFieldFocussed) {
            fieldNode.focus();
        }
        isFieldFocussed = true;
    } else {
        errorNode.innerHTML = ""
    }
}

function resetForm() {
    const textInputNodesList = document.querySelectorAll("input[type='text'], textarea");
    const firstNameFieldError = document.querySelector("#first-name-error");
    const lastNameFieldError = document.querySelector("#last-name-error");
    const genderFieldError = document.querySelector("#gender-error");
    const spouseNameFieldError = document.querySelector("#spouse-name-error");
    const spouseNameField = document.querySelector("#spouse-name");
    const spouseNameFieldLabel = document.querySelector("label[for='spouse-name']");
    const tncCheckboxFieldError = document.querySelector("#tnc-error");

    textInputNodesList.forEach((textInputNode) => {
        const labelNode = document.querySelector(`label[for=${textInputNode.id}]`);
        labelNode.classList.remove("value-filled");
    })
    firstNameFieldError.innerHTML = "";
    lastNameFieldError.innerHTML = "";
    genderFieldError.innerHTML = "";
    spouseNameFieldError.innerHTML = "";
    spouseNameField.disabled = false;
    spouseNameFieldLabel.classList.remove("disabled-field-label");
    tncCheckboxFieldError.innerHTML = "";
}
