// =======================================================
// 1. КОНФИГУРАЦИЯ КОМАНДЫ И ИХ ПАРОЛЕЙ
// =======================================================
const STAFF_LIST = {
    admins: [
        "MotaMatvey"
    ],
    moderators: [
    ],
    passwords: {
        "MotaMatvey": "rgnadmin123", // Ваш секретный пароль
    }
};

// Функция для проверки роли игрока
function getPlayerRole(username) {
    if (!username) return "player";
    if (STAFF_LIST.admins.includes(username)) return "admin";
    if (STAFF_LIST.moderators.includes(username)) return "mod";
    return "player";
}

// =======================================================
// 2. ДИНАМИЧЕСКИЙ ПОКАЗ СТРОКИ ПАРОЛЯ
// =======================================================
function checkNicknameForStaff() {
    const usernameInput = document.getElementById('username');
    const passwordGroup = document.getElementById('password-group');
    
    if (!usernameInput || !passwordGroup) return;

    const username = usernameInput.value.trim();
    const userRole = getPlayerRole(username);

    // Если введен ник админа или модератора — плавно показываем строку пароля
    if (userRole === "admin" || userRole === "mod") {
        passwordGroup.style.display = "flex";
    } else {
        passwordGroup.style.display = "none";
        document.getElementById('password').value = ""; // Очищаем поле, если ник стерли
    }
}

// =======================================================
// 3. ФУНКЦИЯ ВХОДА С ПРОВЕРКОЙ СТРОКИ ПАРОЛЯ
// =======================================================
function startFakeLogin() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorBox = document.getElementById('error-box');
    
    if (!usernameInput) return;

    const username = usernameInput.value.trim();
    const mcRegex = /^[a-zA-Z0-9_]{3,16}$/;

    if (!username) {
        showLoginError("Никнейм не может быть пустым!");
        return;
    }

    if (!mcRegex.test(username)) {
        showLoginError("Неверный ник! Допустимо: 3-16 символов (A-Z, 0-9, _)");
        return;
    }

    const userRole = getPlayerRole(username);

    // Если это админ или модер — проверяем строку пароля
    if (userRole === "admin" || userRole === "mod") {
        const enteredPassword = passwordInput.value;
        const correctPassword = STAFF_LIST.passwords[username];

        if (!enteredPassword) {
            showLoginError("Пожалуйста, введите пароль от аккаунта персонала!");
            return;
        }

        if (enteredPassword !== correctPassword) {
            showLoginError("Неверный пароль доступа для администрации!");
            return;
        }
    }

    // Если проверка пройдена 성공적으로
    if (errorBox) errorBox.style.display = "none";
    localStorage.setItem('moontix_user', username);
    window.location.href = "index.html";
}

function showLoginError(text) {
    const errorBox = document.getElementById('error-box');
    if (errorBox) {
        errorBox.textContent = text;
        errorBox.style.display = "block";
    }
}

// =======================================================
// 4. АВТОМАТИЧЕСКАЯ НАСТРОЙКА РАНГА В ПРОФИЛЕ
// =======================================================
document.addEventListener("DOMContentLoaded", () => {
    const loggedUser = localStorage.getItem('moontix_user');
    if (!loggedUser) return;

    const userRole = getPlayerRole(loggedUser);
    const existingRankBadge = document.querySelector('.player-rank');
    const playerNameElement = document.getElementById('player-name') || document.querySelector('.profile-sidebar h2');

    if (userRole === "admin" || userRole === "mod") {
        if (existingRankBadge) {
            updateRankStyles(existingRankBadge, userRole);
        } else if (playerNameElement) {
            const newRankBadge = document.createElement('span');
            newRankBadge.className = 'player-rank';
            updateRankStyles(newRankBadge, userRole);
            playerNameElement.after(newRankBadge);
        }
    }
});

function updateRankStyles(badgeElement, role) {
    if (role === "admin") {
        badgeElement.textContent = "Администратор";
        badgeElement.style.background = "linear-gradient(135deg, #ef4444, #b91c1c)";
        badgeElement.style.boxShadow = "0 0 12px rgba(239, 68, 68, 0.5)";
        badgeElement.style.color = "#ffffff";
    } else if (role === "mod") {
        badgeElement.textContent = "Модератор";
        badgeElement.style.background = "linear-gradient(135deg, #3b82f6, #1d4ed8)";
        badgeElement.style.boxShadow = "0 0 12px rgba(59, 130, 246, 0.5)";
        badgeElement.style.color = "#ffffff";
    }
}