const form = document.querySelector('#signup-form');

form.addEventListener('submit', (evt) => {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const confirmPassword = document.querySelector('#confirm-password').value;

    const errorMessage = document.querySelector('#error-message');

    if (username == '' || password == '' || confirmPassword == '') {
        errorMessage.textContent = 'You must fill all the fields before submit!';
        errorMessage.style.display = 'block';
        evt.preventDefault();
        return false;
    }

    if (!(username.length >= 3 && username.length <= 20)) {
        errorMessage.textContent = 'Your username must have between 3 and 20 characters!';
        errorMessage.style.display = 'block';
        evt.preventDefault();
        return false;
    }

    if (!(password == confirmPassword)) {
        errorMessage.textContent = 'The passwords don\'t match!';
        errorMessage.style.display = 'block';
        evt.preventDefault();
        return false;
    } 

    return true;

});


