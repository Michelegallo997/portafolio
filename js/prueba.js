// Escribe un código que verifique si un número es positivo, negativo o cero, usando if-else.
// let numero= prompt("por favor ingrese un numero");
// numero= Number(numero)
// if(numero>=0){
//     console.log("este numero es positivo")
// }
// else{
//     console.log("este numero es negatiovo")
// }



// Crea un código que verifique si un número es par o impar.
// let numuroP= prompt("coloca un numero para verificar si es par: ");
// let numero1= Number(numuroP);

// if (numero1 % 2===0){
//     console.log("este numero es par")
// }else{
//     console.log("este numero es inpar")
// }

// ejercicios for:
// for (let i = 1; i <= 5; i++) {
//     console.log(i);
//   }

// Haz un bucle for que imprima los números del 10 al 1 (en orden descendente).
// for (let i =10; i>=1; i--){
//     console.log(i);
// }

// Crea un bucle for que imprima la tabla de multiplicar del 7.


// for (let i = 1; i <= 10; i++) {
//     console.log("5 * " + i + " = " + (5 * i));
// }
// for(let i=1; i<=10; i++){
//     console.log("la tabla de multiplicas del 3 es 3 * "+i+"=" + (3*i));
// }
//  let number= prompt("ingresa el numero para ver su tabla de multiplicar")
// let numero= Number(number);
// for (let i=1; i<=10; i++){
   
//     console.log("la tabla del numero"+ numero + "es asi" + i +"*" +numero+ "es igual a =" +(i*numero))
// }


// ejercicos con while
// let contador = 1;

// while (contador <= 5) {
//   console.log(contador);
//   contador++;
// }

// let contador2=1;
// while(contador2<=10){
//     console.log(contador2);
//     contador2++;
// }

// Escribe un programa que use while para sumar números del 1 al 100 y muestre el resultado
// let numero=1
// let suma=1
// while(numero<= 99){
//     console.log("la suma de "+ numero+"+"+suma+ "es igual a =" + (numero + suma));
//     numero++;
    
// }

// let numero=1;
// let suma=0;
// while(numero<=100){
//     suma+= numero;
//     numero++;
// }
// console.log("sumar números del 1 al 100 da como resultado= "+ suma);
// Do-While
// El bucle do-while ejecuta el bloque de código al menos una vez y luego sigue ejecutándose mientras la condición sea verdadera.


// let numero = 1;

// do {
//   console.log(numero);
//   numero++;
// } while (numero <= 5);

// Escribe un programa que use do-while para pedir al usuario
//  que ingrese un número positivo. Si el número es negativo, vuelve a pedirlo hasta que sea positivo.

// let number
// do{
//     let numero= prompt("ingrese un mumero +");
//     number= Number(numero);
//     if(number>0){
//         console.log("el numero que ingresaste es +");
//         number=true
//     }
//     else{
//         console.log("ingresa otro num");
//         number=false
//     }
    
// }while (number===false);

// let number;
// do {
//     let numero = prompt("Por favor, ingrese un número positivo:");
//     number = Number(numero);

//     if (number > 0) {
//         console.log("El número que ingresaste es positivo.");
//     } else {
//         console.log("El número es negativo o cero. Por favor, ingresa otro número.");
//     }
// } while (number <= 0);

// El switch evalúa una expresión y ejecuta el código que corresponde a su valor. 
// Es útil cuando tienes varias opciones que considerar.

// let dia = 2;

// switch (dia) {
//   case 1:
//     console.log("Lunes");
//     break;
//   case 2:
//     console.log("Martes");
//     break;
//   case 3:
//     console.log("Miércoles");
//     break;
//   default:
//     console.log("Día no válido");
// }

// let mes=4;
// switch(mes){
// case 1:
//     console.log("enero");
//     break;
// case 2:
//     console.log("febrero");
// break;
// case 3:
//     console.log("marzo");
//     break;
// case 4:
//     console.log("abril");
//     break;
// case 5:
//     console.log("mayo");
//     break;
// default:
//     console.log("meses no validos");
//     break;
// }
// Escribe un switch que reciba una calificación (A, B, C, D, F) e imprima el comentario correspondiente (A = Excelente, B = Bien, etc.).
// let calificacion = prompt("Ingrese una calificación (A, B, C, D, F):");

// switch (calificacion.toUpperCase()) { // Aseguramos que la entrada sea mayúscula
//     case 'A':
//         console.log("Excelente");
//         break;
//     case 'B':
//         console.log("Bien");
//         break;
//     case 'C':
//         console.log("Suficiente");
//         break;
//     case 'D':
//         console.log("Deficiente");
//         break;
//     case 'F':
//         console.log("Reprobado");
//         break;
//     default:
//         console.log("Calificación no válida");
// }
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 13;

const scene = new THREE.Scene();
let bee;
let mixer;
const loader = new GLTFLoader();
loader.load('waterbear_astronaut.glb',
    function (gltf) {
        bee = gltf.scene;
        scene.add(bee);

        mixer = new THREE.AnimationMixer(bee);
        mixer.clipAction(gltf.animations[0]).play();
        modelMove();
    },
    function (xhr) {},
    function (error) {}
);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);


const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if(mixer) mixer.update(0.02);
};
reRender3D();



function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

const button = document.querySelector('button');
button.addEventListener('click', toggleMenu);


