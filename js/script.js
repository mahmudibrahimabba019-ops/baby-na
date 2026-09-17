document.addEventListener('DOMContentLoaded', () => {
    const surpriseSection = document.querySelector('#final-surprise');
    const surpriseButton = document.querySelector('.surprise-button');
    const finalMessage = document.querySelector('#final-message');

    if (!surpriseSection || !surpriseButton || !finalMessage) {
        return;
    }

    surpriseButton.setAttribute('aria-expanded', 'false');

    surpriseButton.addEventListener('click', () => {
        const alreadyRevealed = finalMessage.classList.contains('is-revealed');

        if (alreadyRevealed) {
            return;
        }

        finalMessage.classList.add('is-revealed');
        surpriseButton.setAttribute('aria-expanded', 'true');
        surpriseButton.disabled = true;
        createHeartBurst(surpriseSection);

        window.setTimeout(() => {
            finalMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 180);
    });
});

function createHeartBurst(container) {
    const heartCount = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 5 : 14;

    for (let index = 0; index < heartCount; index += 1) {
        const heart = document.createElement('span');
        const angle = (index / heartCount) * Math.PI * 2;
        const distance = 90 + Math.random() * 90;
        const horizontalDistance = Math.cos(angle) * distance;
        const verticalDistance = Math.sin(angle) * distance;

        heart.className = 'floating-heart';
        heart.setAttribute('aria-hidden', 'true');
        heart.textContent = '❤';
        heart.style.setProperty('--heart-x', `${horizontalDistance}px`);
        heart.style.setProperty('--heart-y', `${verticalDistance}px`);
        heart.style.setProperty('--heart-delay', `${index * 35}ms`);
        heart.style.setProperty('--heart-size', `${0.65 + Math.random() * 0.45}rem`);
        container.appendChild(heart);

        window.setTimeout(() => {
            heart.remove();
        }, 1800 + index * 35);
    }
}
