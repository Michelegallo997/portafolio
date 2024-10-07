const div = document.querySelector(".text");
const image = document.querySelector(".nube");

const secondDiv = document.querySelector(".text2");
const secondImage = document.querySelector(".nube2");

const thirdDiv = document.querySelector(".text3");
const thirdImage = document.querySelector(".nube3");

const audio = document.getElementById('typewriterSound');

const firstText = "Oh wow... ";
const secondText = "it's been a while since someone visited this place!";
const thirdText = "Come with me, I'll show you the spot!!";
const fourthText = "This is the person you're looking for. I know what you're thinking: what a silly face.";
const fifthText = "If this is their avatar, I don't even want to imagine them in person.";
const sixthText = "Well, putting aside his ugly head, he's done some incredible work!";
const seventhText = "Here below you can see his work. If I were you, I'd definitely hire him!";

let hasExecutedSection1 = false;
let hasExecutedSection2 = false;
let hasExecutedSection3 = false;

// Deshabilitar el scroll temporalmente
function disableScroll() {
    document.body.style.overflow = 'hidden';
}

// Habilitar el scroll nuevamente
function enableScroll() {
    document.body.style.overflow = 'auto';
}

// Función para reproducir el audio una sola vez
function playAudioOnce() {
    audio.currentTime = 0;
    audio.play();
}

// Función para el efecto de escritura
function textTypingEffect(element, text, i = 0, callback = null) {
    if (i === 0) {
        element.textContent = "";
        element.style.opacity = 1;
    }

    if (i < text.length) {
        element.textContent += text[i];
        setTimeout(() => textTypingEffect(element, text, i + 1, callback), 50);
    } else {
        if (callback) {
            setTimeout(callback, 500);
        }
    }
}

// Función para mostrar texto e imagen con el audio y flecha solo si no es el último texto
function showTextAndPlayAudio(element, text1, text2, text3, imageElement, addArrowAfterText1 = true) {
    imageElement.style.opacity = 1;
    playAudioOnce();
    textTypingEffect(element, text1, 0, () => {
        if (addArrowAfterText1) {  // Solo muestra la flecha después del primer texto
            addNextArrow(element, () => {
                playAudioOnce();
                textTypingEffect(element, text2, 0, () => {
                    if (text3) {
                        addNextArrow(element, () => {
                            playAudioOnce();
                            textTypingEffect(element, text3, 0, enableScroll);
                        });
                    } else {
                        enableScroll();
                    }
                });
            });
        } else {
            textTypingEffect(element, text2, 0, () => {
                if (text3) {
                    textTypingEffect(element, text3, 0, enableScroll);
                } else {
                    enableScroll();
                }
            });
        }
    });
}

// Función para agregar flecha de siguiente
function addNextArrow(element, callback) {
    const arrow = document.createElement("span");
    arrow.textContent = " > ";
    arrow.style.cursor = "pointer";
    arrow.className = "next-arrow";
    element.appendChild(arrow);

    arrow.addEventListener("click", () => {
        playAudioOnce();
        element.removeChild(arrow);
        callback();
    });
}

// Mostrar la primera sección
function showFirstSectionText() {
    if (!hasExecutedSection1) {
        hasExecutedSection1 = true;
        showTextAndPlayAudio(div, firstText, secondText, thirdText, image, true); // Con flecha después del primer texto
    }
}

// Mostrar la segunda sección (con flecha después del primer texto)
function showSecondSectionText() {
    if (!hasExecutedSection2) {
        hasExecutedSection2 = true;
        showTextAndPlayAudio(secondDiv, fourthText, fifthText, "", secondImage, true); // Con flecha después del primer texto
    }
}

// Mostrar la tercera sección (con flecha después del primer texto)
function showThirdSectionText() {
    if (!hasExecutedSection3) {
        hasExecutedSection3 = true;
        showTextAndPlayAudio(thirdDiv, sixthText, seventhText, "", thirdImage, true); // Con flecha después del primer texto
    }
}

// Ocultar mensajes de las secciones previas
function hideAndDisableMessages(scrollPosition) {
    const triggerPointSection2 = document.querySelector(".section2").offsetTop - 200;
    const triggerPointSection3 = document.querySelector(".section3").offsetTop - 200;

    // Ocultar la imagen y el texto de la sección 1 cuando llegamos a la sección 2
    if (scrollPosition >= triggerPointSection2 && hasExecutedSection1) {
        image.style.display = "none";
        div.style.display = "none";
    }

    // Ocultar la imagen y el texto de la sección 2 cuando llegamos a la sección 3
    if (scrollPosition >= triggerPointSection3 && hasExecutedSection2) {
        secondImage.style.display = "none";
        secondDiv.style.display = "none";
    }

    // Ocultar la imagen y el texto de la sección 3 cuando llegamos a la siguiente sección (si la hubiera)
    const nextTriggerPoint = document.querySelector(".section4")?.offsetTop - 200;
    if (scrollPosition >= nextTriggerPoint && hasExecutedSection3) {
        thirdImage.style.display = "none";
        thirdDiv.style.display = "none";
    }
}

// Estilos iniciales para ocultar las imágenes y el texto
image.style.opacity = 0;
div.style.opacity = 0;
secondImage.style.opacity = 0;
secondDiv.style.opacity = 0;
thirdImage.style.opacity = 0;
thirdDiv.style.opacity = 0;

// Iniciar la función cuando la página se haya cargado completamente
window.onload = function () {
    disableScroll();
    setTimeout(() => {
        showFirstSectionText();
    }, 3000);
};

// Evento de scroll para controlar secciones
window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;
    const triggerPointSection2 = document.querySelector(".section2").offsetTop - 100;
    const triggerPointSection3 = document.querySelector(".section3").offsetTop - 100;

    if (scrollPosition >= triggerPointSection2 && !hasExecutedSection2) {
        disableScroll();
        showSecondSectionText();
    }

    if (scrollPosition >= triggerPointSection3 && !hasExecutedSection3) {
        disableScroll();
        showThirdSectionText();
    }

    hideAndDisableMessages(scrollPosition);
});
