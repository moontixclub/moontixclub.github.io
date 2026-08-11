// Автоматически подставляем ник игрока при загрузке страницы поддержки
document.addEventListener("DOMContentLoaded", () => {
    const loggedUser = localStorage.getItem('moontix_user');
    const nickInput = document.getElementById('support-username');
    if (loggedUser && nickInput) {
        nickInput.value = loggedUser;
    }
});

// СОХРАНЕНИЕ ВСЕХ ЗАПРОСОВ И ПЕРЕХОД В ПАНЕЛЬ УПРАВЛЕНИЯ
function sendSupportTicket(event) {
    event.preventDefault(); // Защита от перезагрузки страницы

    const submitBtn = document.querySelector('.support-btn');

    // Собираем данные из полей формы
    const username = document.getElementById('support-username').value.trim();
    const category = document.getElementById('support-category').value;
    const message = document.getElementById('support-message').value.trim();

    // Красивый перевод категорий
    const categoriesRu = {
        'donate': '💰 Донат / Оплата',
        'auth': '🔐 Авторизация / Пароль',
        'bug': '🐛 Баг / Ошибка',
        'player': '🚫 Жалоба на игрока',
        'other': '❓ Другой вопрос'
    };

    // Получаем текущую дату и время обращения
    const currentDateTime = new Date().toLocaleString('ru-RU');

    // Создаем объект нового тикета
    const newTicket = {
        date: currentDateTime,
        username: username,
        category: categoriesRu[category] || category,
        message: message
    };

    // Достаем из памяти старые запросы (если они были), либо создаем пустой массив
    let allTickets = JSON.parse(localStorage.getItem('moontix_tickets')) || [];
    
    // Добавляем наш новый тикет в начало списка
    allTickets.unshift(newTicket);

    // Сохраняем обновленный массив обратно в память браузера
    localStorage.setItem('moontix_tickets', JSON.stringify(allTickets));

    // Эффект загрузки на кнопке перед переходом
    submitBtn.disabled = true;
    submitBtn.textContent = "Отправка...";

    setTimeout(() => {
        // Перенаправляем на страницу, где отображаются все запросы
        window.location.href = "index.html";
    }, 400);
}