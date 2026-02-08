// 1. Base de datos (datos cargados desde JSON)
let contentData = {};

// 2. Función para ensanchar card (Corregida)
function openDetails(category, element) {
    // Si la card ya está abierta, la cerramos
    if (element.classList.contains('active-card')) {
        element.classList.remove('active-card');
        const overlay = element.querySelector('.card-description-overlay');
        if (overlay) overlay.remove();
        return;
    }

    // Cerrar cualquier otra card expandida antes
    document.querySelectorAll('.active-card').forEach(card => {
        card.classList.remove('active-card');
        const oldOverlay = card.querySelector('.card-description-overlay');
        if (oldOverlay) oldOverlay.remove();
    });

    // Activar expansión
    element.classList.add('active-card');

    // Inyectar el overlay de descripción
    // Asegurarse de que contentData tenga datos, si no usar un fallback temporal o mensaje de carga
    const data = contentData[category];
    const phraseContent = data ? data.phrase : "Cargando información...";

    // Si no hay datos aún, quizás queramos reintentar o simplemente mostrar lo que hay.
    // El fetch debería ser rápido, pero por si acaso.

    const overlay = document.createElement('div');
    overlay.className = 'card-description-overlay';
    overlay.innerHTML = `
        <div class="phrase-text">"${phraseContent}"</div>
        <div class="status-tag">Original de SKYflix</div>
    `;
    element.appendChild(overlay);

    // Scroll suave para centrar
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

// 3. Función para cerrar (opcional para uso futuro)
function closePanel() {
    document.querySelectorAll('.active-card').forEach(card => {
        card.classList.remove('active-card');
        const overlay = card.querySelector('.card-description-overlay');
        if (overlay) overlay.remove();
    });
}

// 4. Efecto de fondo sólido en Navbar al hacer scroll
// Navbar Dinámico
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    nav.style.backgroundColor = window.scrollY > 50 ? '#141414' : 'transparent';
});

// 5. Función de Flechas CORREGIDA (Mueve las 6 sagas)
function scrollRow(arrow, direction) {
    // Buscamos el contenedor 'row-content' y luego la lista 'row-posters'
    const rowContent = arrow.closest('.row-content');
    const list = rowContent.querySelector('.row-posters');

    // Desplazamiento basado en el 70% del ancho de la pantalla
    const scrollAmount = window.innerWidth * 0.7;

    if (direction === 'left') {
        list.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        list.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// Render dynamic sections from window.sectionsData
function renderSections() {
    const container = document.getElementById('sections-container');
    if (!container || !window.sectionsData) return;

    window.sectionsData.forEach(section => {
        const sectionEl = document.createElement('section');
        sectionEl.className = 'row';
        sectionEl.id = section.id;

        let cardsHtml = '';
        section.cards.forEach(card => {
            const isTop10Class = section.isTop10 ? 'top-card' : '';
            const rankHtml = (section.isTop10 && card.rank) ? `<div class="rank-number">${card.rank}</div>` : '';
            const infoHtml = (!section.isTop10 && card.info) ? `<div class="card-info">${card.info}</div>` : '';

            // Note: We use onclick="openDetails..." which matches the original logic.
            // openDetails is defined in global scope so it should work.
            // However, inline onclick handlers in created HTML strings are not ideal but match the legacy code style.

            cardsHtml += `
                <div class="poster-card ${isTop10Class}" onclick="openDetails('${card.key}', this)">
                    ${rankHtml}
                    <img src="${card.img}" alt="${card.alt}">
                    ${infoHtml}
                </div>
            `;
        });

        sectionEl.innerHTML = `
            <h2 class="row-title">${section.title}</h2>
            <div class="row-content">
                <span class="slider-arrow left" onclick="scrollRow(this, 'left')"><i class="fas fa-chevron-left"></i></span>
                <div class="row-posters">
                    ${cardsHtml}
                </div>
                <span class="slider-arrow right" onclick="scrollRow(this, 'right')"><i class="fas fa-chevron-right"></i></span>
            </div>
        `;

        container.appendChild(sectionEl);
    });
}

// Esperamos a que todo el HTML cargue correctamente
document.addEventListener('DOMContentLoaded', () => {

    // Load data from global variable instead of fetch
    if (window.sagasData) {
        contentData = window.sagasData;
        console.log("Datos cargados correctamente:", contentData);
    } else {
        console.error("No se encontraron datos en window.sagasData");
    }

    // Render sections
    renderSections();

    // Lógica del video y botón
    const video = document.getElementById('videoBackground');
    const btnPlay = document.getElementById('btnReproducir');

    if (btnPlay && video) {
        btnPlay.addEventListener('click', function () {
            if (video.muted) {
                // Quitamos el silencio y forzamos volumen
                video.muted = false;
                video.volume = 1.0;

                // Reiniciamos o aseguramos que esté en play
                video.play().catch(error => console.log("Error de audio:", error));

                this.innerHTML = '<i class="fas fa-volume-up"></i> Sonido Activo';
                this.style.backgroundColor = "white"; // Cambio visual
                this.style.color = "black";
            } else {
                video.muted = true;
                this.innerHTML = '<i class="fas fa-play"></i> Reproducir';
                this.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                this.style.color = "white";
            }
        });
    }
});