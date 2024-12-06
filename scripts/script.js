function isUserAuthenticated() {
    const token = localStorage.getItem('authToken');
    
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1])); 
            const currentTime = Math.floor(Date.now() / 1000); 
            return payload.exp > currentTime; 
        } catch (error) {
            console.error('Ошибка при проверке токена:', error);
            return false;
        }
    } else {
        return false; 
    }
}

if (isUserAuthenticated()) {
    console.log('Пользователь авторизован');
} else {
    console.log('Пользователь не авторизован');
}
function registerUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
        alert('Пользователь с таким именем уже существует!');
        return false;
    }

    users[username] = {
        password: password
    };
    localStorage.setItem('users', JSON.stringify(users));
    alert('Регистрация прошла успешно!');
    window.location.href = 'Pages/MainPage.html'; 
    return true;
}

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

document.getElementById('registerButton').addEventListener('click', () => {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    registerUser(username, password);
});

document.getElementById('loginButton').addEventListener('click', () => {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    loginUser(username, password);
});
