import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

class App {
  private domApp: Element;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera?: THREE.PerspectiveCamera;

  constructor() {
    console.log("Hello three.js");

    this.domApp = document.querySelector("#app")!;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.domApp.appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();

    this.setupCamera();
    this.setupLight();
    this.setupModels();
    this.setupEvents();
  }

  private setupCamera() {
    const domApp = this.domApp;
    const width = domApp.clientWidth;
    const height = domApp.clientHeight;

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    this.camera.position.y = 10;
    this.camera.position.z = 10;

    new OrbitControls(this.camera, this.domApp as HTMLElement);
  }

  private setupLight() {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);
  }

  private makeRandomColorMaterial() {
    const colors = [
      "#fcba03",
      "#ff852e",
      "#a664e8",
      "#6471e8",
      "#4de3a0",
      "#94e65a",
      "#f573c3",
    ];
    const randomNum = Math.floor(Math.random() * colors.length);
    return new THREE.MeshPhongMaterial({ color: colors[randomNum] });
  }

  private setupModels() {
    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);

    const material = new THREE.MeshPhongMaterial();

    const ground = new THREE.PlaneGeometry(15, 15);
    const groundMesh = new THREE.Mesh(ground, this.makeRandomColorMaterial());
    groundMesh.rotation.x = THREE.MathUtils.degToRad(-90);
    this.scene.add(groundMesh);

    const bigSphere = new THREE.SphereGeometry(3);
    const bigSphereMesh = new THREE.Mesh(
      bigSphere,
      this.makeRandomColorMaterial()
    );
    this.scene.add(bigSphereMesh);

    for (let i = 0; i < 8; i++) {
      const torusPivot = new THREE.Object3D();
      const torus = new THREE.TorusGeometry(0.8, 0.3);
      const torusMesh = new THREE.Mesh(torus, this.makeRandomColorMaterial());
      torusPivot.add(torusMesh);
      torusMesh.position.x = 6;
      torusPivot.position.y = 1.5;
      torusPivot.rotation.y = THREE.MathUtils.degToRad(-45 * i);
      bigSphereMesh.add(torusPivot);
    }

    const smallSpherePivot = new THREE.Object3D();
    smallSpherePivot.name = "smallSpherePivot";
    const smallSphere = new THREE.SphereGeometry(0.5);
    const smallSphereMesh = new THREE.Mesh(
      smallSphere,
      this.makeRandomColorMaterial()
    );
    smallSphereMesh.position.x = 6;
    smallSphereMesh.position.y = 1.5;
    smallSpherePivot.add(smallSphereMesh);
    bigSphereMesh.add(smallSpherePivot);
  }

  private setupEvents() {
    window.onresize = this.resize.bind(this);
    this.resize();
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  private resize() {
    const domApp = this.domApp;
    const width = domApp.clientWidth;
    const height = domApp.clientHeight;

    const camera = this.camera;
    if (camera) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    this.renderer.setSize(width, height);
  }

  private update(time: number) {
    time *= 0.001; // ms -> s

    const smallSpherePivot = this.scene.getObjectByName("smallSpherePivot");
    if (smallSpherePivot) {
      smallSpherePivot.rotation.y = time;
      // Euler를 이용한 rotation
      // const euler = new THREE.Euler(0, time, 0);
      // smallSpherePivot.quaternion.setFromEuler(euler);
    }
  }

  private render(time: number) {
    this.update(time);
    this.renderer.render(this.scene, this.camera!);
  }
}

new App();
