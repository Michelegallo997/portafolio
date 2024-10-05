// Escucha el evento 'load' que se dispara cuando toda la página se ha cargado
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};
const backgroundMusic = document.getElementById("background-music");
backgroundMusic.volume = 0.2;
// Reproducir la música
backgroundMusic.play();

// Pausar la música
backgroundMusic.pause();

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
    },3500); // Ajusta el tiempo para coincidir con la duración de la transición
});
