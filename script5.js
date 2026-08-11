        document.addEventListener("DOMContentLoaded", () => {
            const loggedUser = localStorage.getItem('moontix_user');
            
            // Если пользователь не залогинен, не пускаем его в кабинет и кидаем на страницу входа
            if (!loggedUser) {
                window.location.href = "login.html";
                return;
            }

            // Меняем имя на странице на реальный ник игрока
            document.getElementById('player-name').textContent = loggedUser;

            // Магия: автоматически качаем красивую иконку лица по нику игрока!
            document.getElementById('player-avatar').src = `https://mc-heads.net{loggedUser}/120`;
        });