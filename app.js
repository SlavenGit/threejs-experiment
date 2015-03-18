var scene, camera, renderer, stats;
var geometry, material, sphereGeo, sphereMat, sphere, box, plane;

init();
animate();

function statsHelper(mode) {
    stats = new Stats();
    stats.setMode(mode);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);
}

function cameraHelper() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
}

function axisHelper() {
    var axis = new THREE.AxisHelper(20);
    scene.add(axis);
}

function lightHelper() {
    var bulb = sphereFactory(0.5);
    bulb.position.set(-10, 25, 15);
    scene.add(bulb);
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-10, 25, 15);
    spotLight.castShadow = true;
    scene.add(spotLight);

    return spotLight;
}

function rendererHelper() {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function sphereFactory(r, h, w) {
    r = r || 15;
    h = h || 8;
    w = w || 8;
    sphereGeo = new THREE.SphereGeometry(r, h, w);
    sphereMat = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: true});

    return new THREE.Mesh(sphereGeo, sphereMat);
}

function boxFactory(x) {
// create a cube
    var cubeGeometry = new THREE.BoxGeometry(x, x, x);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // position the cube
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;

    return cube;
}

function planeFactory() {
    var planeGeometry = new THREE.PlaneBufferGeometry(60, 20);
    var planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    return plane;
}

function init() {

    //Bootstrap scene
    scene = new THREE.Scene();
    cameraHelper();
    var light = lightHelper();
    axisHelper();
    statsHelper(0);

    //Create objects
    sphere = sphereFactory();
    plane = planeFactory();
    box = boxFactory(5);

    //Add objects to scene
    scene.add(light);
    scene.add(plane);
    scene.add(box);
    scene.add(sphere);

    rendererHelper();
}

function animate() {

    requestAnimationFrame(animate);

    stats.begin();

    sphere.rotation.y += 0.001;
    renderer.render(scene, camera);

    stats.end();
}