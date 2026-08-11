let currentMode = 'login'; // По умолчанию режим входа

// Функция переключения между Входом и Регистрацией
function switchAuthMode(mode) {
    currentMode = mode;
    const nameGroup = document.getElementById('name-group');
    const authTitle = document.getElementById('auth-title');
    const authSubtitle = document.getElementById('auth-subtitle');
    const submitBtn = document.getElementById('submit-auth-btn');
    const errorBox = document.getElementById('error-box');

    if (errorBox) errorBox.style.display = 'none';

    // Сбрасываем активные классы переключателей
    document.getElementById('toggle-login-btn').classList.remove('active');
    document.getElementById('toggle-reg-btn').classList.remove('active');

    if (mode === 'register') {
        document.getElementById('toggle-reg-btn').classList.add('active');
        authTitle.textContent = "Регистрация по Email";
        authSubtitle.textContent = "Создайте аккаунт без привязки к игре Minecraft";
        submitBtn.textContent = "Создать аккаунт";
        nameGroup.style.display = 'flex'; // Показываем поле ввода имени
        document.getElementById('user-name').required = true;
    } else {
        document.getElementById('toggle-login-btn').classList.add('active');
        authTitle.textContent = "Авторизация по Email";
        authSubtitle.textContent = "Введите вашу почту и пароль для входа на платформу Moontix";
        submitBtn.textContent = "Войти в аккаунт";
        nameGroup.style.display = 'none'; // Скрываем поле ввода имени
        document.getElementById('user-name').required = false;
    }
}

// Обработка отправки формы
function handleEmailAuth(event) {
    event.preventDefault();
    const errorBox = document.getElementById('error-box');
    
    const email = document.getElementById('user-email').value.trim();
    const password = document.getElementById('user-password').value;
    const name = document.getElementById('user-name').value.trim();
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        showAuthError("Неверный формат почты!");
        return;
    }

    if (password.length < 4) {
        showAuthError("Пароль должен быть не менее 4 символов!");
        return;
    }

    // РЕЖИМ РЕГИСТРАЦИИ
    if (currentMode === 'register') {
        if (!name) {
            showAuthError("Пожалуйста, введите ваше имя!");
            return;
        }

        let usersDb = JSON.parse(localStorage.getItem('moontix_email_users')) || {};
        
        if (usersDb[email]) {
            showAuthError("Пользователь с такой почтой уже зарегистрирован!");
            return;
        }

        // Сохраняем нового обычного пользователя
        usersDb[email] = { name: name, password: password };
        localStorage.setItem('moontix_email_users', JSON.stringify(usersDb));

        // Авторизуем
        localStorage.setItem('moontix_user', name);
        localStorage.setItem('moontix_email', email);
        localStorage.setItem('moontix_is_mc_player', 'false'); // Пометка, что это не игрок MC
        
        if (errorBox) errorBox.style.display = 'none';
        window.location.href = "profile.html";
    } 
    // РЕЖИМ ВХОДА
    else {
        const usersDb = JSON.parse(localStorage.getItem('moontix_email_users')) || {};
        const registeredUser = usersDb[email];

        if (!registeredUser || registeredUser.password !== password) {
            showAuthError("Неверная почта или пароль!");
            return;
        }

        // Авторизуем
        localStorage.setItem('moontix_user', registeredUser.name);
        localStorage.setItem('moontix_email', email);
        localStorage.setItem('moontix_is_mc_player', 'false');

        if (errorBox) errorBox.style.display = 'none';
        window.location.href = "profile.html";
    }
}

// Показ ошибок в красивом блоке
function showAuthError(text) {
    const errorBox = document.getElementById('error-box');
    if (errorBox) {
        errorBox.textContent = text;
        errorBox.style.display = "block";
    }
}
