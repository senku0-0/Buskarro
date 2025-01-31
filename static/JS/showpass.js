document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.querySelector('#password');
    const confirmPasswordInput = document.querySelector('#confirmPassword');
    const showPasswordToggle = document.querySelector('#showPasswordToggle');

    // Toggle password visibility
    showPasswordToggle.addEventListener('change', () => {
        const type = showPasswordToggle.checked ? 'text' : 'password';
        passwordInput.type = type;
        confirmPasswordInput.type = type;
    });
});