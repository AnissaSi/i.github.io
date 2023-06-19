import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/DRACOLoader.js';
import * as THREE from 'https://unpkg.com/three@0.120.1/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.120.1/examples/jsm/loaders/GLTFLoader.js';

const sceneContainer = document.getElementById('scene-container');
const loader = new GLTFLoader();

// Verwenden Sie DRACOLoader zum Dekodieren der komprimierten Mesh-Daten
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('draco/');
loader.setDRACOLoader(dracoLoader);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: sceneContainer });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;

// Set background image
const textureLoader = new THREE.TextureLoader();
const backgroundImage = textureLoader.load('Bilder/pexels-miguel-á-padriñán-19670 (1).jpg', () => {
  backgroundImage.minFilter = THREE.LinearFilter; // Set minFilter to prevent image blurring
  renderScene(); // Call the renderScene function after the image is loaded
});
scene.background = backgroundImage;


// Lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

let rings;
loader.load('ringeBlender.glb', function (glb) {
  rings = glb.scene;
  scene.add(rings);
  rings.getObjectByName("Circle").material = new THREE.MeshPhysicalMaterial({ color: "#FFD700" });
  rings.getObjectByName("Circle001").material = new THREE.MeshPhysicalMaterial({ color: "#FFD700" });
  rings.getObjectByName("Circle002").material = new THREE.MeshPhysicalMaterial({ color: "#FFD700" });
  rings.getObjectByName("Circle003").material = new THREE.MeshPhysicalMaterial({ color: "#FFD700" });
  rings.remove(rings.getObjectByName("pexels-miguel-á-padriñán-19670_(1)"));
  
  rings.position.set(0, -6, -15);
  rings.scale.set(1, 1, 1);

  // Platzieren Sie das Objekt an der gewünschten Position
  rings.position.set(0, -18 * scaleFactor, -25 * scaleFactor);



  animate();
 
});

// Bewegen Sie die Ringe über die Maussteuerung -----------------------------------

let mouseX;
let leftMouseDown = false;

sceneContainer.addEventListener('mousemove', (event) => {
  if (!leftMouseDown) {
    return;
  }
  event.preventDefault();

  const rotX = event.clientX - mouseX;
  mouseX = event.clientX;

  const rotationSpeed = 0.1 * (sizes.width / window.innerWidth); // Anpassung der Rotationsgeschwindigkeit basierend auf der Fensterbreite
  rings.rotation.y += rotX * rotationSpeed;
});

sceneContainer.addEventListener('mousedown', (event) => {
  event.preventDefault();
  leftMouseDown = true;
  mouseX = event.clientX;
});

sceneContainer.addEventListener('mouseup', (event) => {
  event.preventDefault();
  leftMouseDown = false;
  mouseX = event.clientX;
});

//------------------------------------------------------------------------------

function renderScene() {
  requestAnimationFrame(renderScene);
  renderer.render(scene, camera);
}

function onWindowResize() {
  // Aktualisiere die Größe des Renderers
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  renderer.setSize(sizes.width, sizes.height);
  
  // Aktualisiere die Kameraparameter
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize);

// ...



renderScene();





