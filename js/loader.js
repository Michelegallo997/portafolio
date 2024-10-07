// Loader
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

window.addEventListener("load", function() {
    // Selecciona el contenedor del loader
    const loaderContainer = document.querySelector(".loader-container");
    // Añade una transición para un desvanecimiento suave
    loaderContainer.style.transition = "opacity 4s ease";
    // Desvanece el loader
    loaderContainer.style.opacity = "0";
    // Elimina el loader del DOM después de la transición
    setTimeout(() => {
        loaderContainer.style.display = "none";
    }, 3500); // Ajusta el tiempo para coincidir con la duración de la transición
});

// Control de volumen
const backgroundMusic = document.getElementById("background-music");
const volumeToggle = document.getElementById("volume-toggle");
const volumeIcon = document.getElementById("volume-icon");

// Reproducción automática cuando el usuario interactúa por primera vez
document.addEventListener("click", function () {
    backgroundMusic.volume = 0.2;
    backgroundMusic.play();
});

// Verificar que la música esté lista antes de reproducir
backgroundMusic.addEventListener('canplaythrough', function() {
    backgroundMusic.play();
}, false);

// Alternar el volumen al hacer clic en el icono
volumeToggle.addEventListener("click", function () {
    if (backgroundMusic.muted) {
        backgroundMusic.muted = false;
        volumeIcon.classList.replace("fa-volume-off", "fa-volume-up");
    } else {
        backgroundMusic.muted = true;
        volumeIcon.classList.replace("fa-volume-up", "fa-volume-off");
    }
});

document.getElementById('refresh-button').addEventListener('click', function() {
    location.reload(); // Refresca la página
});





// Seleccionar elementos relevantes del carrusel
const carouselTrack = document.querySelector('.carousel-track');
const cards = Array.from(carouselTrack.children);
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');

// Función para mover el carrusel a la izquierda
function moveToPrev() {
    const lastCard = cards.pop(); // Elimina la última tarjeta del array
    cards.unshift(lastCard); // Inserta la última tarjeta al inicio del array
    carouselTrack.insertBefore(lastCard, carouselTrack.firstChild); // Mueve la tarjeta al frente visualmente
}

// Función para mover el carrusel a la derecha
function moveToNext() {
    const firstCard = cards.shift(); // Elimina la primera tarjeta del array
    cards.push(firstCard); // Añade la primera tarjeta al final del array
    carouselTrack.appendChild(firstCard); // Mueve la tarjeta al final visualmente
}

// Eventos de click para las flechas
prevButton.addEventListener('click', moveToPrev);
nextButton.addEventListener('click', moveToNext);


const menuButton = document.querySelector('button[aria-controls="mobile-menu"]');
const mobileMenu = document.getElementById('mobile-menu');

// Agregar un evento al hacer clic en el botón
menuButton.addEventListener('click', () => {
  // Alternar la clase 'hidden' para mostrar u ocultar el menú
  mobileMenu.classList.toggle('hidden');
});