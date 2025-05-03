document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('date1');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    dateInput.addEventListener('input', function () {
        if (this.value) {
            this.classList.add('has-value'); 
        } else {
            this.classList.remove('has-value'); 
        }
    });
});