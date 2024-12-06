function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username] && users[username].password === password) {
        alert('Вход выполнен успешно!');
        localStorage.setItem('authToken', btoa(username)); 
        window.location.href = 'Pages/MainPage.html'; 
        return true;
    } else {
        alert('Неверное имя пользователя или пароль!');
        return false;
    }
}

document.getElementById('loginButton').addEventListener('click', () => {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    if (username && password) {
        loginUser(username, password);
    } else {
        alert('Заполните все поля!');
    }
});
