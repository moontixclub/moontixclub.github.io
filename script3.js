function startFakeLogin() {
    const usernameInput = document.getElementById('username');
    const errorBox = document.getElementById('error-box');
    const username = usernameInput.value.trim();

    // Правило: от 3 до 16 символов, только английские буквы, цифры и _ (как в Minecraft)
    const mcRegex = /^[a-zA-Z0-9_]{3,16}$/;

    if (!username) {
        errorBox.textContent = "Никнейм не может быть пустым!";
        errorBox.style.display = "block";
        return;
    }

    if (!mcRegex.test(username)) {
        errorBox.textContent = "Неверный ник! Допустимо: 3-16 символов (A-Z, 0-9, _)";
        errorBox.style.display = "block";
        return;
    }

    // Если всё правильно — прячем ошибку
    errorBox.style.display = "none";

    // Сохраняем ник в память браузера (localStorage), чтобы сайт "знал", кто вошел
    localStorage.setItem('moontix_user', username);

    // Перенаправляем на главную страницу
    window.location.href = "index.html";
}
