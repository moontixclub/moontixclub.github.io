const container = document.getElementById('rainContainer');
const dropCount = 100; // Количество капель

for (let i = 0; i < dropCount; i++) {
    const drop = document.createElement('div');
    drop.classList.add('drop');

    // Случайная позиция по горизонтали
    drop.style.left = Math.random() * 100 + '%';

    // Случайная скорость падения
    drop.style.animationDuration = (Math.random() * 1 + 0.5) + 's';

    // Случайная задержка начала анимации
    drop.style.animationDelay = (Math.random() * 2) + 's';

    container.appendChild(drop);
}
