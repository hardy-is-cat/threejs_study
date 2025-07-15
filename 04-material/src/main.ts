import { OrbitControls, RGBELoader } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

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
    this.camera.position.z = 4;

    new OrbitControls(this.camera, domApp as HTMLElement);
  }

  private setupLight() {
    // 디렉셔널 라이트
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(1, 2, 1);
    this.scene.add(light);
  }

  private setupModels() {
    const textureLoader = new THREE.TextureLoader();
    const toonTexture = textureLoader.load("./toon.jpg");
    toonTexture.minFilter = THREE.NearestFilter;
    toonTexture.magFilter = THREE.NearestFilter;

    const material = new THREE.MeshToonMaterial({
      // MeshToonMaterial: 카툰랜더링, 젤다의 전설 랜더링이랑 비슷
      gradientMap: toonTexture,
    });

    const geomCylinder = new THREE.CylinderGeometry(0.6, 0.9, 1.2, 64, 1);
    const cylinder = new THREE.Mesh(geomCylinder, material);
    cylinder.position.x = -1;
    this.scene.add(cylinder);

    const geoTorusknot = new THREE.TorusKnotGeometry(0.4, 0.18, 128, 64);
    const torusknot = new THREE.Mesh(geoTorusknot, material);
    torusknot.position.x = 1;
    this.scene.add(torusknot);
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
