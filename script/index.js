// CONFIGURACIÓN DE PRUEBA: 7 de Febrero 2026, 22:35:00 Hora Perú (UTC-5)
const fechaObjetivo = new Date("2026-02-08T00:00:00-05:00").getTime();

const interval = setInterval(() => {
    const ahora = new Date().getTime();
    const distancia = fechaObjetivo - ahora;

    // 1. PRIMERO VERIFICAMOS SI EL TIEMPO TERMINÓ
    if (distancia <= 0) {
        clearInterval(interval);

        // Verificamos que los elementos existan antes de tocarlos
        const timerElement = document.getElementById("timer");
        const teaserElement = document.getElementById("teaser");
        const unlockZone = document.getElementById("unlock-zone");

        if (timerElement) timerElement.style.display = "none";
        if (teaserElement) teaserElement.innerHTML = "Baby, ya llegó la hora... <br> Hoy te voy a ver.";
        if (unlockZone) unlockZone.classList.remove("hidden");

        console.log("¡Tiempo cumplido! Acceso desbloqueado.");
        return; // Salimos de la función para no calcular números negativos
    }

    // 2. SI NO HA TERMINADO, CALCULAMOS Y ACTUALIZAMOS EL DOM
    const d = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const h = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distancia % (1000 * 60)) / 1000);

    // Actualización segura del DOM
    if (document.getElementById("days")) {
        document.getElementById("days").innerText = d.toString().padStart(2, '0');
        document.getElementById("hours").innerText = h.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = m.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = s.toString().padStart(2, '0');
    }
}, 1000);

/**
 * Lógica del Modal Personalizado
 */
function abrirModal() {
    const modal = document.getElementById("modal-benito");
    if (modal) modal.classList.remove("hidden");
}

function cerrarModal() {
    const modal = document.getElementById("modal-benito");
    if (modal) modal.classList.add("hidden");
}

function entrarAlJuego() {
    const ahora = new Date().getTime();
    if (ahora >= fechaObjetivo) {
        window.location.href = "juego.html";
    } else {
        abrirModal();
    }
}

// Cerrar al hacer clic fuera
window.onclick = function (event) {
    const modal = document.getElementById("modal-benito");
    if (event.target == modal) {
        cerrarModal();
    }
}