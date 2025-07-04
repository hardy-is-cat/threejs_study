import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils.js";

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
    this.camera.position.z = 10;

    new OrbitControls(this.camera, this.domApp as HTMLElement);
  }

  private setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);
  }

  private setupModels() {
    const material = new THREE.MeshStandardMaterial();

    const geomParent = new THREE.BoxGeometry(2, 2, 2);
    const parent = new THREE.Mesh(geomParent, material);

    const geomChild = new THREE.BoxGeometry(1, 1, 1);
    const child = new THREE.Mesh(geomChild, material);

    child.position.x = 3;
    child.rotation.y = THREE.MathUtils.degToRad(45);

    parent.position.y = 2;
    parent.rotation.y = THREE.MathUtils.degToRad(45);
    // parent.scale.set(2, 2, 2);

    parent.add(child);

    this.scene.add(parent);

    const axesOfScene = new THREE.AxesHelper(10);
    this.scene.add(axesOfScene);
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
  }

  private render(time: number) {
    this.update(time);
    this.renderer.render(this.scene, this.camera!);
  }
}

new App();
