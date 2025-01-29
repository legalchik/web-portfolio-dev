// Создание сцены, камеры и рендерера
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // Прозрачный фон

// Добавим освещение
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 25).normalize();
scene.add(light);

// Создаем плавающие 3D-фигуры
const geometry = new THREE.IcosahedronGeometry(1, 0); // Икосаэдр
const material = new THREE.MeshPhongMaterial({
    color: window.materialPrimaryColor,
    // shininess: 50,
    flatShading: true,
    // transparent: true,
    opacity: .88,
    wireframe: true,
});

const shapes = [];
for (let i = 0; i < 16; i++) {
    const shape = new THREE.Mesh(geometry, material);
    shape.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
    );
    shape.scale.setScalar(Math.random() * 1 + 0.5);
    shapes.push(shape);
    scene.add(shape);
}

// Частицы
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 4999;

const posArray = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00ff88,
    transparent: true,
    opacity: .48,
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Позиция камеры
camera.position.z = 14;

// Анимация
function animate() {
    requestAnimationFrame(animate);
    // Вращение фигур
    shapes.forEach((shape) => {
        shape.rotation.x += 0.005;
        shape.rotation.y += 0.005;
    });

    if (!window.particlesAnimate) {
        particlesMesh.material.opacity = .001;
    } else {
        particlesMesh.material.opacity = .48;
        // Вращение частиц
        particlesMesh.rotation.x += 0.001;
        particlesMesh.rotation.y += 0.001;
    }
    renderer.render(scene, camera);
}

animate();

// Реакция на движение мыши
document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

    camera.position.x = mouseX * 5;
    camera.position.y = mouseY * 5;
    camera.lookAt(scene.position);
});

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const scrollThreshold = 100;
    const maxScroll = 1000; // Максимальное значение прокрутки для полного изменения цвета

    // Интерполяция цвета
    const t = Math.min(scrollY / maxScroll, 1); // Ограничиваем t в диапазоне [0, 1]
    const startColor = new THREE.Color(window.materialPrimaryColor);
    const endColor = new THREE.Color(window.materialSecondaryColor);

    shapes.forEach((shape) => {
        shape.material.color.lerpColors(startColor, endColor, t);
        shape.rotation.x += .00007*scrollY;
    });

    const scrollIndicator = document.querySelector('.scroll-indicator');
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollTop = window.scrollY;
    const progress = (scrollTop / scrollHeight) * 100;
    scrollIndicator.style.width = `${progress}%`;
});

