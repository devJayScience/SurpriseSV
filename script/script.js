const heartContainer = document.getElementById('heart-container');
const scoreElement = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
let score = 0;
const targetScore = 10;
let gameActive = true;

function createHeart() {
    if (!gameActive) return;
    const heartWrapper = document.createElement('div');
    heartWrapper.classList.add('heart-wrapper');
    const heartInner = document.createElement('div');
    heartInner.classList.add('heart-inner');
    heartWrapper.appendChild(heartInner);

    heartWrapper.style.left = Math.random() * 95 + '%';
    const randomSize = Math.random() * (1.5 - 0.8) + 0.8;
    heartInner.style.fontSize = (24 * randomSize) + 'px';
    const duration = Math.random() * (5 - 3) + 3;
    heartWrapper.style.animationDuration = duration + 's';

    heartWrapper.addEventListener('click', () => catchHeart(heartWrapper));
    heartContainer.appendChild(heartWrapper);

    setTimeout(() => {
        if (heartWrapper.parentElement) heartWrapper.remove();
    }, duration * 1000);
}

function catchHeart(heart) {
    if (!gameActive) return;
    score++;
    updateUI();
    heart.style.transform = 'scale(1.5)';
    heart.style.opacity = '0';
    setTimeout(() => heart.remove(), 200);
    if (score >= targetScore) winGame();
}

function updateUI() {
    scoreElement.textContent = score;
    progressBar.style.width = (score / targetScore) * 100 + '%';
}

function winGame() {
    gameActive = false;
    setTimeout(() => {
        heartContainer.innerHTML = '';
        const gameUI = document.querySelector('.game-container');
        gameUI.classList.add('won');

        let clickCount = 0;
        let siScale = 1;

        const messages = [
            "¿Quieres ser mi San Valentín? 🥺👉👈",
            "¿Cómo que no? ¡Mira mi carita! 😡",
            "¡No te daré otra opción! 🐱💢",
            "Me estás rompiendo el corazón... 😭",
            "¡Di que sí por favor! 💔",
            "¿Estás segura? Mira que soy edición limitada... 💎",
            "¡Mis abogados se enterarán de este rechazo! ⚖️",
            "¡Incluso mi perro dice que digas que sí! 🐶",
            "¿Sabías que decir 'Sí' te hace 100% más feliz? 🍎",
            "¡Voy a llamar a la policía del amor! 🚓❤️",
            "¡Tengo 1000 de aura y me estás rechazando! 📉",
            "¡Si me dices que no, me voy a vivir a Minecraft solo! 🧱",
            "Mi corazón es frágil, trátalo con cariño... 🥺",
            "¡Acepta o te envío un virus de fotos mías! 💻",
            "No acepto un 'No', soy ingeniero, busco soluciones. ⚙️",
            "¡Acepta o le digo a tus papás! 🙊",
            "¡Me voy a poner a llorar en la biblioteca si no aceptas! 🏛️",
            "¡Soy el último romántico, no me extingas! 🦖",
            "¡Acepta ya o el botón 'No' se irá a Marte! 🚀",
            "¡Última oportunidad antes de que me ponga MUY tite! 😿",
            "Ya no tienes escapatoria... ¡DI QUE SÍ! 🏹❤️"
        ];

        // Adjusted paths for static HTML at root
        const gifs = ['media/winning-image.png', 'media/ANGRY.gif', 'media/CATANGRY.gif', 'media/CRYING.gif', 'media/TITE.gif'];
        // GIFs para la rotación (excluyendo la imagen inicial)
        const rotationGifs = ['media/ANGRY.gif', 'media/CATANGRY.gif', 'media/CRYING.gif', 'media/TITE.gif'];

        // Inyectar estructura final (Mantiene winning-image.png como inicial)
        gameUI.innerHTML = `
            <img id="main-image" src="${gifs[0]}" alt="Ositos" style="width: 50%; max-height: 35vh; object-fit: contain; display: block; margin: 0 auto; transition: all 0.3s;">
            <h1 id="main-title" style="font-size: 2.2rem; margin: 20px 0; color: #e91e63;">${messages[0]}</h1>
            <p id="main-subtitle" style="font-size: 1.2rem; pointer-events: none;">Prometo hacerte muy feliz ❤️</p>
            <div id="btn-wrapper" style="display: flex; gap: 15px; justify-content: center; margin-top: 20px; align-items: center; width: 100%;">
                <button id="btn-si" class="btn-si">Sí 🥰</button>
                <button id="btn-no" class="btn-no">No 🙄</button>
            </div>
        `;

        const btnSi = document.getElementById('btn-si');
        const btnNo = document.getElementById('btn-no');
        const mainImage = document.getElementById('main-image');
        const mainTitle = document.getElementById('main-title');

        // Confeti / Fuegos Artificiales
        const createFirework = (x, y) => {
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff4d79', '#ffeb3b', '#76ff03'];
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.classList.add('firework-particle');
                document.body.appendChild(particle);

                const color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.backgroundColor = color;
                particle.style.boxShadow = `0 0 10px 2px ${color}`; // Intense colored glow
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';

                const angle = Math.random() * Math.PI * 2;
                const velocity = Math.random() * 150 + 80; // Faster and further
                const tx = Math.cos(angle) * velocity + 'px';
                const ty = Math.sin(angle) * velocity + 'px';

                particle.style.setProperty('--tx', tx);
                particle.style.setProperty('--ty', ty);

                particle.style.animation = 'explode 1.5s ease-out forwards'; // Slightly longer duration

                setTimeout(() => particle.remove(), 1500);
            }
        };

        const launchFireworks = () => {
            const interval = setInterval(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createFirework(x, y);
            }, 200); // More frequent explosions (wait, higher interval = less frequent. let's keep 100 or 200) -> 200 is slower but bigger explosions might be better. Stick to rapid fire? user said "intense". let's do 100.

            // Adjust loop for intensity
            for (let j = 0; j < 3; j++) { // Launch multiple at once initially for impact
                setTimeout(() => {
                    createFirework(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
                }, j * 300);
            }


            // Detener fuegos después de 3 segundos
            setTimeout(() => clearInterval(interval), 3000);
        };

        btnSi.addEventListener('click', () => {
            // Restore Image and Text
            mainImage.src = 'media/winning-image.png';
            mainTitle.textContent = "¡Sabía que sí querías! ❤️";
            mainTitle.style.fontSize = '3rem'; // Make it pop

            // Hide buttons to enjoy the show
            document.getElementById('btn-wrapper').style.display = 'none';
            btnNo.style.display = 'none'; // Also hide the runaway button!
            document.getElementById('main-subtitle').textContent = "¡Te amo mucho! 🎆";

            launchFireworks();

            // Redirect after 3.5 seconds
            setTimeout(() => {
                window.location.href = 'sorpresa.html';
            }, 3500);
        });

        const handleNoInteraction = (e) => {
            if (e) e.preventDefault();
            clickCount++;

            // Actualizar Imagen (Usando solo los GIFs de rotación)
            // (clickCount - 1) para empezar desde el índice 0 de rotationGifs
            mainImage.src = rotationGifs[(clickCount - 1) % rotationGifs.length];
            mainTitle.textContent = messages[Math.min(clickCount, messages.length - 1)];

            moveButton();
        };

        const moveButton = () => {
            if (btnNo.parentElement !== document.body) {
                document.body.appendChild(btnNo);
            }
            const padding = 50;
            const maxX = window.innerWidth - btnNo.offsetWidth - padding;
            const maxY = window.innerHeight - btnNo.offsetHeight - padding;

            btnNo.style.position = 'fixed';
            btnNo.style.left = Math.max(padding, Math.random() * maxX) + 'px';
            btnNo.style.top = Math.max(padding, Math.random() * maxY) + 'px';
            btnNo.style.zIndex = '10000';
        };

        // Activamos la reacción al pasar el mouse
        btnNo.addEventListener('mouseover', handleNoInteraction);
        btnNo.addEventListener('click', handleNoInteraction);

    }, 500);
}

setInterval(createHeart, 300);
