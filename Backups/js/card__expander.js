(function () {
    const expandButtons = [...document.querySelectorAll('.expand-btn')];
    const closeButtons = [...document.querySelectorAll('.close-btn')];
    let currentlyExpandedCard = null;

    function expandCard(card) {
        if (currentlyExpandedCard && currentlyExpandedCard !== card) {
            // Colapsar la tarjeta actualmente expandida
            currentlyExpandedCard.classList.remove('expanded');
        }
        card.classList.add('expanded');
        currentlyExpandedCard = card;
    }

    function collapseCard(card) {
        card.classList.remove('expanded');
        currentlyExpandedCard = null;
    }

    expandButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();  // Evita que el enlace realice su acción por defecto
            const card = button.closest('.card');  // Encuentra la tarjeta más cercana al botón
            expandCard(card);  // Expande la tarjeta
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();  // Evita que el enlace realice su acción por defecto
            const card = button.closest('.card');  // Encuentra la tarjeta más cercana al botón
            collapseCard(card);  // Colapsa la tarjeta
        });
    });
})();
