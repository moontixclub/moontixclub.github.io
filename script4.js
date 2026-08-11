document.addEventListener("DOMContentLoaded", () => {
    // Получаем сохраненный ник из памяти браузера
    const loggedUser = localStorage.getItem('moontix_user');
    const authZone = document.getElementById('auth-zone');

    // Если игрок авторизован и контейнер в nav баре найден
    if (loggedUser && authZone) {
        // Добавили класс btnlogin1, чтобы ник выглядел как аккуратная тонкая кнопка
        authZone.innerHTML = `
            <div class="user-profile-nav">
                <a href="profile.html" class="btnlogin1" style="margin-left: 25 !important;">
                    <span class="user-name">${loggedUser}</span>
                </a>
            </div>
        `;
    }
});

// Функция для выхода из профиля
function logoutPlayer() {
    localStorage.removeItem('moontix_user'); // Стираем ник
    window.location.reload(); // Перезагружаем страницу, чтобы вернуть кнопку Логин
}
