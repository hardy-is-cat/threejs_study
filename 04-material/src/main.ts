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
    const vertices = [-1, 1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      // vertices 배열을 3개씩 나눠 좌표로 취급함
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    // LineBasicMaterial
    // const material = new THREE.LineBasicMaterial({ color: 0xffff00 });
    // LineDashedMaterial
    const material = new THREE.LineDashedMaterial({
      color: 0xffff00,
      dashSize: 0.2,
      gapSize: 0.1,
      scale: 1,
    });

    // Line -> 주어진 좌표를 모두 잇는 선을 그림
    // LineLoop -> 주어진 좌표의 첫 점과 끝점까지 잇는 선을 그림
    // LineSegments -> 주어진 좌표를 2개씩 나눠 잇는 선을 그림
    const line = new THREE.LineSegments(geometry, material);
    line.computeLineDistances();
    this.scene.add(line);

    const gui = new GUI();
    gui.add(material, "dashSize");
    gui.add(material, "gapSize");
    gui.add(material, "scale");
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
