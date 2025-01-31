document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll(".upd_fix_con"); 
    const editButtons = document.querySelectorAll(".edt"); 

    // Initially hide all forms
    forms.forEach(form => {
        form.style.display = "none";
    });

    editButtons.forEach((editButton, index) => {
        editButton.addEventListener('click', () => {
            forms[index].style.display = "flex";
        });
    });
});
