import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

// *** PRIMERA ESCENA (PRIMER MODELO) ***

const camera1 = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera1.position.z = 53;

const scene1 = new THREE.Scene();
let bee;
let mixer;
const loader = new GLTFLoader();
loader.load('waterbear_astronaut.glb',
    function (gltf) {
        bee = gltf.scene;
        bee.position.x = 1;
        bee.position.y = -3.5;
        bee.rotation.y = 0;
        scene1.add(bee);

        mixer = new THREE.AnimationMixer(bee);
        mixer.clipAction(gltf.animations[0]).play();
        modelMove();
    },
    function (xhr) {},
    function (error) {}
);
const renderer1 = new THREE.WebGLRenderer({ alpha: true });
renderer1.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer1.domElement);

// Luz para el primer modelo
const ambientLight1 = new THREE.AmbientLight(0xffffff, 1.3);
scene1.add(ambientLight1);

const topLight1 = new THREE.DirectionalLight(0xffffff, 1);
topLight1.position.set(500, 500, 500);
scene1.add(topLight1);

const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer1.render(scene1, camera1);
    if (mixer) mixer.update(0.02);
};
reRender3D();

// Movimiento del primer modelo
let arrPositionModel = [
    {
        id: 'banner',
        position: { x: 1, y: -3, z: 0 },
        rotation: { x: 0, y: 0, z: 0 }
    },
    {
        id: "intro",
        position: { x: 5, y: -3, z: -5 },
        rotation: { x: 0.5, y: -0.5, z: 0 },
    },
    {
        id: "description",
        position: { x: 1, y: -2, z: -5 },
        rotation: { x: 0.7, y: -0.5, z: 0 },
    },
    {
        id: "corrusel",
        position: { x: 0.8, y: -1, z: -90 },
        rotation: { x: 0.3, y: -0.5, z: 0 },
    },
];
const modelMove = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });
    let position_active = arrPositionModel.findIndex(
        (val) => val.id == currentSection
    );
    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];
        gsap.to(bee.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: 3,
            ease: "power1.out"
        });
        gsap.to(bee.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: 3,
            ease: "power1.out"
        });
    }
};

window.addEventListener('scroll', () => {
    if (bee) {
        modelMove();
    }
});

// Ajustar el tamaño del modelo y la cámara en pantallas pequeñas
const adjustForSmallScreens = () => {
    if (window.innerWidth <= 425) {
        // Si la pantalla es menor o igual a 425px, mantén la configuración
        camera1.fov = 23;  
        camera1.position.z = 63;
    } else {
        // Restablecer los valores normales para pantallas más grandes
        camera1.fov = 10;
        camera1.position.z = 53;
    }

    camera1.updateProjectionMatrix();
    renderer1.setSize(window.innerWidth, window.innerHeight);
};

// Evitar que se modifique en resoluciones menores a 425px
window.addEventListener('resize', () => {
    if (window.innerWidth >= 425) {
        adjustForSmallScreens();
    }
});

// Llamada inicial para ajustar según el tamaño actual
adjustForSmallScreens();




// *** SEGUNDA ESCENA (SEGUNDO MODELO) ***

const secondCamera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
secondCamera.position.set(10, 10, 200); // Ajuste de la cámara más lejana

const scene2 = new THREE.Scene();
let secondModel;
let secondMixer;
const secondLoader = new GLTFLoader();
secondLoader.load('meteorite.glb',  // Cambia la ruta a tu segundo modelo (meteorito)
    function (gltf) {
        secondModel = gltf.scene;
        secondModel.position.x = -12;
        secondModel.position.y = -0;
        secondModel.rotation.y = 0;
        scene2.add(secondModel);

        secondMixer = new THREE.AnimationMixer(secondModel);
        secondMixer.clipAction(gltf.animations[0]).play();
        moveSecondModel();
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% cargado');
    },
    function (error) {
        console.error('Error al cargar el modelo meteorite.glb', error);
    }
);

// Renderizar el segundo modelo con rotación constante
const secondRenderer = new THREE.WebGLRenderer({ alpha: true });
secondRenderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D1').appendChild(secondRenderer.domElement);

// Luz para el segundo modelo
const ambientLight2 = new THREE.AmbientLight(0xffffff, 1.3);
scene2.add(ambientLight2);

const topLight2 = new THREE.DirectionalLight(0xffffff, 1);
topLight2.position.set(500, 500, 500);
scene2.add(topLight2);

// Función para la rotación constante del segundo modelo (meteorito)
const rotateSecondModel = () => {
    if (secondModel) {
        secondModel.rotation.x += 0.01;  // Ajusta la velocidad de rotación en el eje X
        secondModel.rotation.y += 0.01;  // Ajusta la velocidad de rotación en el eje Y
    }
};

// Re-renderizado del segundo modelo con rotación
const reRenderSecondModel = () => {
    requestAnimationFrame(reRenderSecondModel);
    secondRenderer.render(scene2, secondCamera);
    if (secondMixer) secondMixer.update(0.02);

    rotateSecondModel();  // Aplicar la rotación constante
};
reRenderSecondModel();

// Movimiento del segundo modelo


const moveSecondModel = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });
    let positionActive = secondModelPositions.findIndex(
        (val) => val.id === currentSection
    );
    if (positionActive >= 0) {
        let newCoordinates = secondModelPositions[positionActive];
        gsap.to(secondModel.position, {
            x: newCoordinates.position.x,
            y: newCoordinates.position.y,
            z: newCoordinates.position.z,
            duration: 3,
            ease: "power1.out"
        });
        gsap.to(secondModel.rotation, {
            x: newCoordinates.rotation.x,
            y: newCoordinates.rotation.y,
            z: newCoordinates.rotation.z,
            duration: 3,
            ease: "power1.out"
        });
    }
};

window.addEventListener('scroll', () => {
    if (secondModel) {
        moveSecondModel();
    }
});
window.addEventListener('resize', () => {
    secondRenderer.setSize(window.innerWidth, window.innerHeight);
    secondCamera.aspect = window.innerWidth / window.innerHeight;
    secondCamera.updateProjectionMatrix();
});


// *** AJUSTES PARA DISPOSITIVOS MÓVILES Y CAMBIO DE ORIENTACIÓN ***

// Función para ajustar el modelo 3D en dispositivos móviles cuando cambia la orientación
const adjustForOrientation = () => {
    const isLandscape = window.matchMedia("(orientation: landscape)").matches; // Detectar si está en modo horizontal
    const isMobile = window.innerWidth <= 768; // Consideramos que es móvil si el ancho es menor o igual a 768px

    if (isMobile && isLandscape) {
        // Si el dispositivo es móvil y está en modo horizontal
        camera1.fov = 30;  // Ajustamos el campo de visión (fov) para vista horizontal
        camera1.position.z = 55;  // Ajustamos la cámara más lejana
    } else if (isMobile && !isLandscape) {
        // Si el dispositivo es móvil y está en modo vertical
        camera1.fov = 16;  
        camera1.position.z = 63;  // Ajuste moderado para vista vertical
    } else {
        // Para dispositivos que no son móviles o resoluciones más grandes
        camera1.fov = 10; // Campo de visión original para pantallas grandes
        camera1.position.z = 53; // Posición original de la cámara
    }

    camera1.updateProjectionMatrix();
    renderer1.setSize(window.innerWidth, window.innerHeight);
};

// Evento para detectar cambios de orientación (horizontal/vertical)
window.addEventListener('resize', () => {
    adjustForOrientation();
});

// Llamada inicial para asegurarse de que el ajuste se aplique según la orientación actual
adjustForOrientation();

