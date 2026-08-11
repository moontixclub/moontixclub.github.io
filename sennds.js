document.addEventListener("DOMContentLoaded", () => {
    const loggedUser = localStorage.getItem('moontix_user');
    const container = document.getElementById('notifications-container');

    // Если игрок вообще не залогинен — отправляем на вход
    if (!loggedUser) {
        window.location.href = "login.html";
        return;
    }

    // Достаем все тикеты сервера из памяти
    const allTickets = JSON.parse(localStorage.getItem('moontix_tickets')) || [];

    // Фильтруем тикеты: оставляем только те, которые создал этот конкретный игрок
    const myTickets = allTickets.filter(ticket => ticket.username === loggedUser);

    if (myTickets.length === 0) {
        container.innerHTML = `<p class="no-notifications">У вас пока нет отправленных обращений в поддержку.</p>`;
        return;
    }

    let notificationsHTML = "";

    // Перебираем тикеты игрока и строим карточки уведомлений
    myTickets.forEach(ticket => {
        // Проверяем, ответил ли админ
        const hasReply = ticket.reply !== null && ticket.reply !== undefined && ticket.reply.trim() !== "";
        
        notificationsHTML += `
            <div class="notification-item ${hasReply ? 'status-answered' : 'status-waiting'}">
                <div class="notification-header">
                    <span class="notification-date">${ticket.date}</span>
                    <span class="notification-badge">${hasReply ? 'Получен ответ' : 'В обработке'}</span>
                </div>
                
                <div class="notification-body">
                    <div class="player-question">
                        <strong>Ваш вопрос (${ticket.category}):</strong>
                        <p>${ticket.message}</p>
                    </div>
                    
                    <div class="admin-answer">
                        <strong>Ответ Администрации:</strong>
                        <p>${hasReply ? ticket.reply : 'Администратор рассматривает ваше обращение. Пожалуйста, ожидайте.'}</p>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = notificationsHTML;
});