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

// Reproducción automática al cargar
backgroundMusic.volume = 0.3;
backgroundMusic.play();

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
