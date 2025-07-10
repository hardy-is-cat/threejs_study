import { OrbitControls } from "three/examples/jsm/Addons.js";
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
    this.camera.position.z = 2;

    new OrbitControls(this.camera, domApp as HTMLElement);
  }

  private setupLight() {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);
  }

  private setupModels() {
    const geometry = new THREE.SphereGeometry();
    geometry.deleteAttribute("uv");

    const circle = new THREE.TextureLoader().load("./circle.png");

    const material = new THREE.PointsMaterial({
      color: 0xff9900,
      size: 10,
      // sizeAttenuation -> 카메라의 거리에 따라 포인트 크기가 다르게 보이게 하는 속성
      sizeAttenuation: true,
      map: circle,
      // 텍스처에 표현된 픽셀의 알파값이 0.5보다 클 때만 표시되게 함
      alphaTest: 0.9,
    });
    const points = new THREE.Points(geometry, material);
    this.scene.add(points);

    const gui = new GUI();
    gui.add(material, "size", 0.01, 10, 0.01);
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
